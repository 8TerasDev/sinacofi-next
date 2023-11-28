import { prisma } from "../newclient.prisma";

export const updateInfoUserById = async (newData) => {
  try{
    await prisma.accounts_user.update({
      where: {
        id: BigInt(data.id)
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