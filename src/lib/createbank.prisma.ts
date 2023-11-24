import { prisma } from "./newclient.prisma";

export type CreateBankProps = {
  nombre: string,
  codigo: string,
  created_at: Date,
}

export const createBank = async (data: CreateBankProps) => {
  try {

    (data as any).deleted = false
    const newBank = await prisma.bf_data_process_bancos.create({ data });
    return newBank
  }
  catch (err) {
    throw err;
  }
}

