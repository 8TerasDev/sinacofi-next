import { prisma } from "../newclient.prisma";

export const updateInfoUserById = async (newData:any) => {
  try{
    await prisma.accounts_user.update({
      where: {
        id: BigInt(newData.id)
      },
      data: {
        ...newData
      }
    })
  }
  catch(err){
    throw err
  }
}