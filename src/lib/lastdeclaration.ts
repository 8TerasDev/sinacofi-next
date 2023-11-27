import { processError } from "./error";
import { prisma } from "./newclient.prisma";

export const getLastDeclaration = async (bankId: any) => {
  try{
    const lastDeclaration = await prisma.bf_data_process_declaraciones.findFirst({
      where: {
        codigo_banco: bankId,
        status: 'ACTIVE',
      },
      orderBy: {
        fecha_subida: 'desc'
      }
    })
    return lastDeclaration?.id.toString();
  }
  catch(error){
    return processError(error)
  }
}