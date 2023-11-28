import { prisma } from "../newclient.prisma";

export const updateInfoBankById = async (data: any) => {
  try{
    await prisma.bf_data_process_bancos.update({
      where: {
        id: BigInt(data.id)
      },
      data,
    })
  }
  catch(err){
    throw err
  }
}