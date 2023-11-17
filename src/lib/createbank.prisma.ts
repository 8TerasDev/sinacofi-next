import { prisma } from "./newclient.prisma";

export type CreateBankProps = {
  nombre: string,
  codigo: string,
}

export const createBank = async ( data: CreateBankProps) => {
  try {
    const newBank = await prisma.bf_data_process_bank.create({data});
    return newBank
  }
  catch(err){
    return err;
  }
  // finally {
  //   await prisma.$disconnect();
  // }
}