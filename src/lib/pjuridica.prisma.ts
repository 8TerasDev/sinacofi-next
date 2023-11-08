import { PJuridicas } from "@/application";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

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

export async function disablePJuridicas(
  correlativo_declaracion: string
): Promise<PJuridicas[] | any> {
  try {
    // Actualiza todos los registros que tengan el correlativo_declaracion proporcionado
    const updateResponse = await prisma.p_juridicas.updateMany({
      where: {
        correlativo_declaracion: correlativo_declaracion,
      },
      data: {
        disabled: true,
      },
    });

    // updateMany devuelve un objeto con un conteo de cuántos registros fueron actualizados
    return updateResponse;
  } catch (error) {
    // Maneja la excepción si algo sale mal
    console.error("Error al deshabilitar p_juridicas:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

const API_URL_PJ = "/api/pjuridica";
const API_URL_PJ_BY = "/api/pjuridicaby";

export async function disablePJuridicasAxios(correlativo_declaracion: string) {
  try {
    // Realiza una solicitud POST al endpoint de la API con el correlativo de declaración como cuerpo
    const response = await axios.post(API_URL_PJ, { correlativo_declaracion });
    // Retorna la respuesta de la API
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error(
      "Error al llamar al endpoint para deshabilitar p_juridicas:",
      error
    );
    throw error;
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
    console.error("Error al obtener las declaraciones:", error);
    throw error;
  }
}

export async function getDelcaracionesByCorrelativos(
  correlativos_declaracion: string[]
) {
  try {
    console.log("correlativos_declaracion", correlativos_declaracion);
    // Realiza una solicitud POST al endpoint de la API con el correlativo de declaración como cuerpo
    const response = await axios.post(API_URL_PJ_BY, {
      correlativos_declaracion,
    });
    console.log("response", response);
    return response.data.declaraciones;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error(
      "Error al llamar al endpoint para deshabilitar getDelcaracionesByRutBeneficiario:",
      error
    );
    throw error;
  }
}
