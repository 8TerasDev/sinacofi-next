import { prisma } from "../newclient.prisma";

export const getBanks = async () => {
  const banks = await prisma.bf_data_process_bancos.findMany();
  return banks.map((bank) => {
    //@ts-ignore
    delete bank.id; 
    return bank 
  })
}