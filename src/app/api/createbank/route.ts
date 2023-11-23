import { getBanks } from "@/lib/banks/getBanks.prisma";
import { CreateBankProps, createBank } from "@/lib/createbank.prisma";
import { getBankByCode } from "@/lib/banks/getBankByCode.prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

  try {

    const data: CreateBankProps = await req.json();

    const bank = await getBankByCode(data.codigo)
    if (bank != undefined) {
      throw new Error('Codigo banco registrado')
    }
    await createBank(data);
    const banks = await getBanks();
    return Response.json(banks)
  }
  catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}
