import { PrismaClient } from "@prisma/client";
import axios from 'axios'

export async function getAllDeclaraciones() {
  const prisma = new PrismaClient();
  try {
    const declaraciones = await prisma.bf_data_process_declaraciones.findMany({
      include: {
        personas_juridicas: true,
        bf_data_process_beneficiariosfinales: true
      }
    });
    if (!declaraciones) {
      return [];
    }
    const cleanDeclaraciones = declaraciones.map(declaracion => {
      const personas_juridicas = declaracion.personas_juridicas.map(persona_juridica => {
        return {
          ...persona_juridica,
          id: `${persona_juridica.id}`,
          declaracion_id: `${persona_juridica.declaracion_id}`,
        }
      })
      const beneficiarios_finales = declaracion.bf_data_process_beneficiariosfinales.map(beneficiario_final => {
        return {
          ...beneficiario_final,
          id: `${beneficiario_final.id}`,
          declaracion_id: `${beneficiario_final.declaracion_id}`,
        }
      })
      return {
        ...declaracion,
        id: `${declaracion.id}`,
        bank_id: `${declaracion.bank_id}`,
        personas_juridicas: personas_juridicas,
        bf_data_process_beneficiariosfinales: beneficiarios_finales
      }
    })
    return cleanDeclaraciones;
  } catch (error) {
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllDeclaracionesClientSide() {
  try {
    const { data } = await axios.get('api/declaraciones');
    return data.declaraciones;
  } catch (error) {
    console.error('Error al obtener las declaraciones:', error);
    throw error;
  }
}
