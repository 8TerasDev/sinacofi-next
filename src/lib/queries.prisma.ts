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
    //if (user) return true; // Las credenciales son correctas.

    //return false; // Las credenciales son incorrectas.
  
  // } catch (error) {
  //   return false;
  // } finally {
  //   // await prisma.$disconnect();
  //   // console.timeEnd("verifyCredentials");
  // }
}
