import { PFinales } from "@/application";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPFinales(
  correlativo_declaracion: string
): Promise<PFinales[] | any> {
  return await prisma.p_finales.findMany({
    where: {
      correlativo_declaracion,
    },
  });
}
