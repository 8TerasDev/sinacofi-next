//import { PrismaClient } from '@prisma/client';
import { prisma } from "./newclient.prisma";

export type SignUpProps = {
  email: string,
  password: string,
  nombre: string,
  telefono: string,
  codigo_banco: string,
  url_profile: string,
}

export const signUp = async (data: SignUpProps ) => {
  //const prisma = new PrismaClient();

  try {
    const newUser = await prisma.empleado.create({ data })
    return newUser;
  }
  catch(err){
    console.log(err)
    return 'error'
  }
  finally {
    await prisma.$disconnect();
  }

}