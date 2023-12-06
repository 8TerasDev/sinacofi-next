import bcrypt from "bcrypt";
import { logger } from "./logger";

export async function encryptPassword(password: string) {
  try {
    const saltRounds = 10; // Puedes ajustar el número de saltRounds para mayor seguridad
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    logger.error("Error al encriptar la contraseña:", error);
    throw error;
  }
}
export async function verifyPassword(password: string, hash: string) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    logger.error("Error al verificar la contraseña:", error);
    throw error;
  }
}
