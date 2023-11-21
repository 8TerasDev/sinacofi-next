import { NextRequest } from "next/server";
import { getBanks } from "@/lib/banks/getBanks.prisma";

export const GET = async (req: NextRequest) => {
  try{
    const banks = await getBanks();
    const stringBanks = JSON.stringify(banks);
    return Response.json(stringBanks);
  }
  catch(err){
    console.log(err)
    return Response.json(err)
  }
}