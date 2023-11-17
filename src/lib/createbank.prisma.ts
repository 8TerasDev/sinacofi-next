import { prisma } from "./newclient.prisma";

export type CreateBankProps = {
  nombre: string,
  codigo: string,
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 2000);
});

export const createBank = async ( data: CreateBankProps) => {
  try {
    const newBank = await promise;

    //const newBank = await prisma.banks.create({ data });
    return newBank
  }
  catch(err){
    return err;
  }
  // finally {
  //   await prisma.$disconnect();
  // }
}