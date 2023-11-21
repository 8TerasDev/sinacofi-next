import { prisma } from "../newclient.prisma";

export const getBanks = async () => {
  const banks = await prisma.bf_data_process_bancos.findMany();
  //return banks;
  return banks.map((bank) => {
    return {...bank, id: bank.id.toString() as any } 
  })
}