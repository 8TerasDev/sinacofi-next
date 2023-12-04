import { prisma } from "../newclient.prisma";

export const updateInfoUserById = async (id:any, newData:any) => {
  
  try{
    await prisma.accounts_user.update({
      where: {
        id: BigInt(id)
      },
      data: {
        ...newData
      }
    })
  }
  catch(err){
    console.log(err)
    throw err
  }
}