export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { getSessionUser, validateAdminPermission } from "@/lib/security";
import { processError } from "@/lib/error";
import { getUsersSameBank } from "@/lib/users/getuserssamebank.prisma";

export const GET = async (req: NextRequest) => {
  try {
    const user = getSessionUser(req)
    validateAdminPermission(user)
    const users = await getUsersSameBank(user.bankId);
    return Response.json(users)
  }
  catch (err) {
    return processError('No se ha podido obtener los usuarios')
  }
};
