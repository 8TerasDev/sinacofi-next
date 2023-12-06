import { PJuridicas } from "@/application";
//import { PrismaClient } from "@prisma/client";
import { prisma } from "./newclient.prisma";
import { logger } from "./logger";


//const prisma = new PrismaClient();

export async function getAllPJuridicas(): Promise<PJuridicas[] | any> {
  try {
    return await prisma.p_juridicas.findMany({
      where: {
        disabled: false,
      },
    });
  } catch (error) {
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
// Utilizando SRP, separamos la lógica de transformación de fechas
function createUTCDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  millisecond: number
): Date {
  return new Date(
    Date.UTC(year, month, day, hour, minute, second, millisecond)
  );
}

// Otra función siguiendo SRP para obtener los límites de fecha
function getDateBounds(
  startDate: string,
  endDate: string
): { start: Date; end: Date } {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDateDate = createUTCDate(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
    0,
    0,
    0,
    0
  );
  const endDateDate = createUTCDate(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
    23,
    59,
    59,
    999
  );

  return { start: startDateDate, end: endDateDate };
}

export async function getAllPJuridicasByDates(
  startDate: string,
  endDate: string
): Promise<PJuridicas[] | any> {
  try {
    const { start, end } = getDateBounds(startDate, endDate);

    const response = await prisma.p_juridicas.findMany({
      where: {
        disabled: false,
        fechahora_creacion: {
          gte: start,
          lt: end,
        },
      },
      orderBy: {
        fechahora_creacion: "asc",
      },
    });

    return response;
  } catch (error) {
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function disablePJuridicas(
  id: string
): Promise<PJuridicas[] | any> {
  try {
    // Actualiza todos los registros que tengan el correlativo_declaracion proporcionado
    const updateResponse = await prisma.p_juridicas.updateMany({
      where: {
        id: {
          equals: id
        },
      },
      data: {
        disabled: true,
      },
    });

    // updateMany devuelve un objeto con un conteo de cuántos registros fueron actualizados
    return updateResponse;
  } catch (error) {
    // Maneja la excepción si algo sale mal
    logger.error("Error al deshabilitar p_juridicas:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getDeclaracionesByCorrelativos(correlativos: string[]) {
  try {
    const declaraciones = await prisma.p_juridicas.findMany({
      where: {
        correlativo_declaracion: {
          in: correlativos,
        },
      },
    });
    return declaraciones;
  } catch (error) {
    logger.error("Error al obtener las declaraciones:", error);
    throw error;
  }
}
