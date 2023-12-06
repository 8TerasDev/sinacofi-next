import { logger } from "./logger";
import { prisma } from "./newclient.prisma";

export async function findByUsername(username: string) {
  try {
    const user = await prisma.accounts_user.findFirst({
      where: { username },
    });
    if (!user) {
      return null;
    }

    const cleanUser = {
      ...user,
      id: `${user.id}`,
      bank_id: user.bank_id,
    };

    return cleanUser;
  } catch (error) {
    logger.error("Error al verificar credenciales:", error);
    throw error;
  } finally {
  }
}
