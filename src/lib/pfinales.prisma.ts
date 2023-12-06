import { PFinales } from "@/application";
import { prisma } from "./newclient.prisma";
import { logger } from "./logger";

export async function getAllPFinales(
  correlativo_declaracion: string
): Promise<PFinales[] | any> {
  return await prisma.p_finales.findMany({
    where: {
      correlativo_declaracion,
    },
  });
}

export async function getUniqueCorrelativoDeclaracion(
  cni_id_rut_benef_final: string
): Promise<string[] | any> {
  try {
    // Utiliza Prisma para obtener los registros únicos
    const uniqueCorrelativos = await prisma.p_finales.findMany({
      where: {
        cni_id_rut_benef_final: cni_id_rut_benef_final,
      },
      distinct: ["correlativo_declaracion"],
      select: {
        correlativo_declaracion: true, // Solo selecciona la columna correlativo_declaracion
      },
    });

    // Retorna los resultados de la consulta
    return uniqueCorrelativos;
  } catch (error) {
    // Maneja la excepción si algo sale mal
    logger.error("Error al obtener los correlativos únicos:", error);
    throw error;
  }
}
