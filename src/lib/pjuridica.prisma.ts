import { PJuridicas } from "@/application";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPJuridicas(): Promise<
  PJuridicas[] | any
> {
  return await prisma.p_juridicas.findMany();
}
