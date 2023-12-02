export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { getBanks } from "@/lib/banks/getBanks.prisma";
import { getSessionUser, validateAdminPermission } from "@/lib/security";
import { processError } from "@/lib/error";

export const GET = async (req: NextRequest) => {

  try {
    const user = getSessionUser(req)
    validateAdminPermission(user)
    const banks = await getBanks();

    return Response.json(banks);
  }
  catch (err) {
    return processError(err, 'No se ha podido obtener los bancos')
  }
}
