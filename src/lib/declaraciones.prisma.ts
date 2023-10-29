import { PrismaClient } from "@prisma/client";

export async function getAllDeclaraciones() {
  const prisma = new PrismaClient();
  try {
    const declaraciones = await prisma.declaracion.findMany({
      include: {
        beneficiarios_finales: true, // incluye todos los beneficiarios finales relacionados
        control_efectivo: true, // incluye todos los controles efectivos relacionados
        persona_juridica: {
          // incluye la persona jurídica relacionada
          include: {
            empleados: true, // incluye todos los empleados relacionados con la persona jurídica
            representante_legal: true, // incluye todos los representantes legales relacionados con la persona jurídica
          },
        },
      },
    });
    if (!declaraciones) {
      return [];
    }
    return declaraciones;
  } catch (error) {
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function findDeclaracionByFolio(folio: string) {
  const prisma = new PrismaClient();
  try {
    const declaracion = await prisma.declaracion.findFirst({
      where: {
        folio: folio,
      },
      include: {
        persona_juridica: {
          select: {
            nombre: true, // only select the 'nombre' field from the empresa model
          },
        },
      },
    });
    if (!declaracion) {
      return null;
    }
    return declaracion;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function findDeclaracionByPersonaJuridica(rut_empresa: string) {
  const prisma = new PrismaClient();
  try {
    const declaracion = await prisma.persona_juridica.findMany({
      where: {
        rut: rut_empresa,
      },
      include: {
        declaraciones: true,
      },
    });
    if (!declaracion) {
      return null;
    }
    return declaracion;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function findDeclaracionByBeneficiarioOControlEfectivo(
  folio: string
) {
  const prisma = new PrismaClient();
  try {
    const declaracion = await prisma.declaracion.findFirst({
      where: { folio: folio, is_active: true },
    });
    if (!declaracion) {
      return null;
    }
    return declaracion;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
