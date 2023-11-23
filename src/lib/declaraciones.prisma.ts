import { PrismaClient } from "@prisma/client";
import axios from "axios";

export async function getAllDeclaraciones() {
  const prisma = new PrismaClient();
  try {
    const declaraciones = await prisma.bf_data_process_declaraciones.findMany({
      include: {
        bf_data_process_personasjuridicas: true,
        bf_data_process_beneficiariosfinales: true,
      },
    });
    if (!declaraciones) {
      return [];
    }
    const cleanDeclaraciones = declaraciones.map((declaracion) => {
      const personas_juridicas =
        declaracion.bf_data_process_personasjuridicas.map(
          (persona_juridica) => {
            return {
              ...persona_juridica,
              id: `${persona_juridica.id}`,
              declaracion_id: `${persona_juridica.declaracion_id}`,
            };
          }
        );
      const beneficiarios_finales =
        declaracion.bf_data_process_beneficiariosfinales.map(
          (beneficiario_final) => {
            return {
              ...beneficiario_final,
              id: `${beneficiario_final.id}`,
              declaracion_id: `${beneficiario_final.declaracion_id}`,
            };
          }
        );
      return {
        ...declaracion,
        id: `${declaracion.id}`,
        banco_id: `${declaracion.banco_id}`,
        bf_data_process_personasjuridicas: personas_juridicas,
        bf_data_process_beneficiariosfinales: beneficiarios_finales,
      };
    });
    return cleanDeclaraciones;
  } catch (error) {
    console.error("Error al obtener las declaraciones:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllDeclaracionesClientSide() {
  try {
    const config = {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    };
    const { data } = await axios.get("api/declaraciones", config);
    return data.declaraciones;
  } catch (error) {
    console.error("Error al obtener las declaraciones:", error);
    throw error;
  }
}
