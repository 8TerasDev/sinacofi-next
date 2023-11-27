import { NextRequest } from "next/server";
import { CreateUserProps, createUser } from "@/lib/createuser.prisma";
import { getUsers } from "@/lib/users/getusers.prisma";
import { encryptPassword } from "@/lib/backend.utils";
import { getSessionUser, validateAdminPermission } from "@/lib/security";
import { processError } from "@/lib/error";

export const POST = async (req: NextRequest) => {
  try {
    const user = getSessionUser(req)
    validateAdminPermission(user)
    const data: CreateUserProps = await req.json();
    (data as any).status = 'ACTIVE'
    data.password = await encryptPassword(data.password);
    await createUser(data);
    const newUsers = await getUsers();
    return Response.json(newUsers);
  } catch (err: any) {
    return processError('No se ha podido crear el usuario')
  }
};
