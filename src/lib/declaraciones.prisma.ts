import { idID } from "@mui/material/locale";
import { prisma } from "./newclient.prisma";
import { count } from "console";
import { Prisma } from "@prisma/client";

type ViewDeclaration = 'last_update' | 'last_declaration'
export interface FindArgs {
  bankCode: string
  filter?: { [key: string]: string | string[] }
  page?: {
    number?: string,
    size?: string,
  },
  order?: {
    [key: string]: 'asc' | 'desc'
  }
  view?: ViewDeclaration
}

export async function countDeclaraciones(filter: any, view?: ViewDeclaration) {
  const whereStmt = buildWhere(filter || {})
  let query = Prisma.sql`
    select count(d.id) as count from bf_data_process_declaraciones as d
    inner join bf_data_process_personasjuridicas as pj
    on d.id = pj.declaracion_id
  `
  if (view) {
    query = Prisma.join([query, buildView(view)], '')
  }
  query = Prisma.join([
    query,
    Prisma.sql` where d.status = 'ACTIVE' `
  ], '');
  query = Prisma.join([
    query,
    whereStmt || Prisma.sql``,

  ], whereStmt ? " and " : "")
  const res: any = await prisma.$queryRaw(query)
  return parseInt(res[0].count.toString())
}

const buildOrder = (order: { [key: string]: 'asc' | 'desc' }) => {
  const orderBy = []
  if (order['fecha_declaracion']) {
    orderBy.push(order['fecha_declaracion'] == 'asc' ? Prisma.sql` fecha_declaracion asc` : Prisma.sql` fecha_declaracion desc`)
  }
  if (order['fecha_subida']) {
    orderBy.push(order['fecha_subida'] == 'asc' ? Prisma.sql` fecha_subida asc` : Prisma.sql` fecha_subida desc`)
  }
  if (orderBy.length == 0) {
    return undefined
  }
  return Prisma.join([Prisma.sql` order by `, Prisma.join(orderBy)], "")
}

const buildWhere = (filters: { [key: string]: string | string[] }) => {
  const query = []
  if (filters['fecha_declaracion']) {
    const filter_date = filters['fecha_declaracion']
    query.push(Prisma.sql`fecha_declaracion between ${new Date(filter_date[0])} and ${new Date(filter_date[1])}`)
  }
  if (filters['num_declaracion']) {
    query.push(Prisma.sql`num_declaracion = ${filters['num_declaracion']}`)
  }
  if (filters['person_rut']) {
    query.push(Prisma.sql`d.id in (select declaracion_id from bf_data_process_personasjuridicas where rut = ${filters['person_rut']})`)
  }
  if (filters['person_relationship_rut']) {
    query.push(Prisma.sql`d.id in (select declaracion_id from bf_data_process_beneficiariosfinales where identificacion = ${filters['person_relationship_rut']})`)
  }
  if (query.length == 0) {
    return undefined
  }
  return Prisma.join(query, " AND ")
}

const buildView = (view: ViewDeclaration) => {
  if (view === 'last_update') {
    return Prisma.sql` inner join (
      select pj.rut,last_update.last_date, max(d.id) as max_id from
          bf_data_process_declaraciones as d
        inner join bf_data_process_personasjuridicas as pj on d.id  = pj.declaracion_id
        inner join
        (
          select
            pj.rut,
            max(d.fecha_subida) as last_date
          from
            schema1.bf_data_process_declaraciones as d
          inner join
            schema1.bf_data_process_personasjuridicas as pj
          on
            d.id = pj.declaracion_id
          group by pj.rut
        ) as last_update on
        d.fecha_subida = last_update.last_date and pj.rut  = last_update.rut
        group by pj.rut, last_update.last_date
    ) as last_upload
    on
    last_upload.rut = pj.rut and last_upload.last_date = d.fecha_subida and last_upload.max_id = d.id
  `
  }
  if (view == 'last_declaration') {
    return Prisma.sql` inner join (
      select
        pj.rut,
        max(d.fecha_declaracion) as max_declaration
      from
        bf_data_process_declaraciones as d
      inner join
        bf_data_process_personasjuridicas as pj
      on
        d.id = pj.declaracion_id
      group by pj.rut
    ) as last_upload
    on
    last_upload.rut = pj.rut  and last_upload.max_declaration = d.fecha_declaracion
  `
  }
  return Prisma.sql``
}

const buildQuery = ({ bankCode, page, filter, order, view }: FindArgs) => {
  const whereStmt = buildWhere(filter || {})
  const orderStmt = buildOrder(order || {})
  const page_size = parseInt(page?.size ?? '10')
  const page_number = parseInt(page?.number ?? '0')
  const offset = page_number * page_size
  let query = Prisma.sql`
      select
        (d.codigo_banco != ${bankCode} and not exists (
            select
              1
            from
              bf_data_process_declaraciones as d2
            inner join
              bf_data_process_personasjuridicas as pj2
            on d2.id = pj2.declaracion_id
            where pj2.rut  = pj.rut  and d2.id != d.id  and d2.codigo_banco = ${bankCode}
        )) or ${bankCode} = '-1' as has_ofuscate,
        pj.rut,
        d.id,
        d.codigo_banco,
        d.correlativo,
        d.status,
        d.fecha_subida,
        d.num_declaracion,
        d.fecha_declaracion,
        pj.razon_social
      from bf_data_process_declaraciones as d
      inner join bf_data_process_personasjuridicas as pj
      on d.id = pj.declaracion_id
	  `
  if (view) {
    query = Prisma.join([query, buildView(view)], '')
  }
  query = Prisma.join([query, Prisma.sql` where d.status = 'ACTIVE' `], '')
  if (whereStmt) {
    query = Prisma.join([query, Prisma.sql` and `, whereStmt], '')
  }
  if (orderStmt) {
    query = Prisma.join([query, orderStmt], '')
  }
  query = Prisma.join([query, Prisma.sql` limit ${page_size} offset ${offset}`], '')
  return query

}

export async function findDeclaraciones(args: FindArgs) {
  const page_size = parseInt(args?.page?.size ?? '10')
  const page_number = parseInt(args?.page?.number ?? '0')
  let count = 0
  try {
    count = await countDeclaraciones(args?.filter, args?.view)
    const declaraciones: any[] = await prisma.$queryRaw(buildQuery(args))
    return {
      page: {
        number: page_number,
        size: page_size,
        total: count
      },
      items: declaraciones.map((d) => ({ ...d, id: parseInt(d.id.toString()), codigo_banco: d.has_ofuscate ? 'XXXX' : d.codigo_banco }))
    };
  } catch (error) {
    console.error("Error al obtener las declaraciones:", error);
    return {
      page: {
        number: page_number,
        size: page_size,
        total: count
      },
      items: []
    };
  }
}


export async function disableDeclaracion(
  id: number
) {
  try {
    // Actualiza todos los registros que tengan el correlativo_declaracion proporcionado
    const updateResponse = await prisma.bf_data_process_declaraciones.update({
      where: {
        id
      },
      data: {
        status: 'DISABLED',
      },
    });

    // updateMany devuelve un objeto con un conteo de cuántos registros fueron actualizados
    return updateResponse;
  } catch (error) {
    // Maneja la excepción si algo sale mal
    console.error("Error al deshabilitar p_juridicas:", error);
    throw error;
  }
}


export async function findDeclaracionById(id: string) {
  try {

    const declaracion = await prisma.bf_data_process_declaraciones.findFirst({
      select: {
        banco_id: true,
        codigo_banco: true,
        correlativo: true,
        fecha_declaracion: true,
        fecha_subida: true,
        id: true,
        num_declaracion: true,
        status: true,
        bf_data_process_bancos: true,
        bf_data_process_beneficiariosfinales: true,
        bf_data_process_personasjuridicas: true
      },
      where: {
        id: BigInt(id)
      }
    })
    if (!declaracion) {
      return declaracion
    }
    return {
      ...declaracion,
      id: parseInt(declaracion!.id.toString()),
      banco_id: parseInt(declaracion!.banco_id.toString()),
      bf_data_process_beneficiariosfinales: declaracion.bf_data_process_beneficiariosfinales.map(b => ({
        ...b, id: parseInt(b.id.toString()), declaracion_id: parseInt(b.declaracion_id.toString()),
      })),
      bf_data_process_personasjuridicas: declaracion.bf_data_process_personasjuridicas.map(b => ({
        ...b, id: parseInt(b.id.toString()), declaracion_id: parseInt(b.declaracion_id.toString()),
      })),
      bf_data_process_bancos: { ...declaracion.bf_data_process_bancos, id: parseInt(declaracion.bf_data_process_bancos.id.toString()) }
    }
  } catch (error) {
    console.error("Error al obtener las declaraciones:", error);
    return undefined
  }
}
