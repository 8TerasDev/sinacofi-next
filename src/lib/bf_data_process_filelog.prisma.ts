import { BfDataProcessFilelog } from "@/application";
import { prisma } from "./newclient.prisma";

export async function getAllFileLog(bank_id?: string): Promise<BfDataProcessFilelog[] | any> {
  try {
    if (!bank_id) { return await prisma.bf_data_process_filelog.findMany() }
    return await prisma.bf_data_process_filelog.findMany({
      where: {
        codigo_banco: bank_id,
      },
    });
  } catch (error) {
    return [];
  } finally {
    await prisma.$disconnect();
  }
}