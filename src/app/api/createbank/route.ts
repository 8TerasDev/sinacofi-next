import { getBanks } from "@/lib/banks/getBanks.prisma";
import { CreateBankProps, createBank } from "@/lib/createbank.prisma";
import { getBankByCode } from "@/lib/banks/getBankByCode.prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, validateAdminPermission } from "@/lib/security";
import { processError } from "@/lib/error";

export const POST = async (req: NextRequest, res: NextResponse) => {

  try {
    const user = getSessionUser(req)
    validateAdminPermission(user)
    const data: CreateBankProps = await req.json();
    (data as any).status = 'ACTIVE'
    const bank = await getBankByCode(data.codigo)
    if (bank != undefined) {
      throw new Error('Codigo banco registrado')
    }
    await createBank(data);
    const banks = await getBanks();
    return Response.json(banks)
  }
  catch (err: any) {
    return processError('No se ha podido crear el banco')
  }
}
