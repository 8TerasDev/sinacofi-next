//import { PrismaClient } from '@prisma/client';
import { prisma } from "./newclient.prisma";

export type CreateUserProps = {
  name: string,
  lastName: string,
  email: string,
  bankCode: string,
  role: string,
  phone?: string,
  password: string,
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 2000);
});

export const createUser = async (data: CreateUserProps ) => {
  //const prisma = new PrismaClient();

  try {
    const newUser = await promise;
    //const newUser = await prisma.empleado.create({ data })
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