export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { getUsers } from "@/lib/users/getusers.prisma";
import { getSessionUser, validateAdminPermission } from "@/lib/security";
import { processError } from "@/lib/error";

export const GET = async (req: NextRequest) => {
  try {
    const user = getSessionUser(req)
    validateAdminPermission(user)
    const users = await getUsers();
    return Response.json(users)
  }
  catch (err) {
    return processError(err, 'No se ha podido obtener los usuarios')
  }
};
