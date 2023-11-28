import { prisma } from "../newclient.prisma";

export const updateInfoBankById = async (id:any, data: any) => {
  try{
    await prisma.bf_data_process_bancos.update({
      where: {
        id: BigInt(id)
      },
      data,
    })
  }
  catch(err){
    throw err
  }
}