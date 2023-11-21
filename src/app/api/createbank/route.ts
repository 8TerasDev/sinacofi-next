import { CreateBankProps, createBank } from "@/lib/createbank.prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data: CreateBankProps = await req.json();
    const newBank = await createBank(data);
    const newBankString = JSON.stringify(newBank);
    return Response.json(newBankString)
  }
  catch(err){
    return Response.json(err)
  }
}