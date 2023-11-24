import { idID } from "@mui/material/locale";
import { prisma } from "./newclient.prisma";

export async function getAllDeclaraciones() {
  const whereCond: any = {
    status: 'ACTIVE'
  }
  try {
    const declaraciones = await prisma.bf_data_process_declaraciones.findMany({
      where: whereCond,
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
