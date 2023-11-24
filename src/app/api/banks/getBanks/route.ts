export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { getBanks } from "@/lib/banks/getBanks.prisma";

export const GET = async (req: NextRequest) => {

  try {

    const banks = await getBanks();

    return Response.json(banks);
  }
  catch (err) {

    console.log(err)
    return Response.json(err)
  }
}
