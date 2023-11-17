import { PFinales } from "@/application";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

export async function getAllPFinales(
  correlativo_declaracion: string
): Promise<PFinales[] | any> {
  return await prisma.p_finales.findMany({
    where: {
      correlativo_declaracion,
    },
  });
}

const API_URL_PJ = "/api/pjuridica";
const API_URL_PF = "/api/pfinales";

export async function fetchDeclaraciones() {
  try {
    const { data } = await axios.get(API_URL_PJ);
    const declaraciones = data.declaraciones;
    return declaraciones;
  } catch (error) {
    console.error("Hubo un error al obtener las declaraciones:", error);
    return [];
  }
}

export async function fetchDeclaracionesByDates(
  startDate: Date,
  endDate: Date
) {
  try {
    const url = `${API_URL_PJ}?startdate=${encodeURIComponent(
      `${startDate}`
    )}&enddate=${encodeURIComponent(`${endDate}`)}`;
    const { data } = await axios.get(url);
    const declaraciones = data.declaraciones;
    return declaraciones;
  } catch (error) {
    console.error("Hubo un error al obtener las declaraciones:", error);
    return [];
  }
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
    console.error("Error al obtener los correlativos únicos:", error);
    throw error;
  }
}
function transformArray(arrayOfObjects: any) {
  return arrayOfObjects.map((item: any) => item.correlativo_declaracion);
}
export async function getDelcaracionesByRutBeneficiario(
  rut_beneficiario: string
) {
  try {
    // Realiza una solicitud POST al endpoint de la API con el correlativo de declaración como cuerpo
    const response = await axios.post(API_URL_PF, { rut_beneficiario });
    // Retorna la respuesta de la API
    return transformArray(response.data.declaraciones);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error(
      "Error al llamar al endpoint para deshabilitar p_juridicas:",
      error
    );
    throw error;
  }
}
