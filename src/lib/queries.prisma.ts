//import { PrismaClient } from "@prisma/client";
import { prisma } from "./newclient.prisma";

export async function verifyCredentials(
  username: string,
  password: string
) {
    const user = await prisma.accounts_user.findFirst({
      where: { username, password },
    });
    return user
}
