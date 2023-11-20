//import { PrismaClient } from "@prisma/client";
import { prisma } from "./newclient.prisma";

export async function verifyCredentials(username: string, password: string) {
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
      bank_id: `${user.bank_id}`,
    };

    return cleanUser;
  } catch (error) {
    console.error("Error al verificar credenciales:", error);
    throw error;
  } finally {
  }
}
