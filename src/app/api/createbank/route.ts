import { CreateBankProps, createBank } from "@/lib/createbank.prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data: CreateBankProps = await req.json();
    const newBank = await createBank(data);
    const newBankString = JSON.stringify(newBank);
    const response = new Response(
      newBankString , { status: 200 }
    )
    return response
  }
  catch(err){
    return err
  }
}