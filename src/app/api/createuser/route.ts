import { NextRequest } from "next/server";
import { CreateUserProps, createUser } from "@/lib/createuser.prisma";
import { getUsers } from "@/lib/users/getusers.prisma";
import { encryptPassword } from "@/lib/backend.utils";

export const POST = async (req: NextRequest) => {
  try {
    const data: CreateUserProps = await req.json();
    data.password = await encryptPassword(data.password);
    await createUser(data);
    const newUsers = await getUsers();
    return Response.json(newUsers);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
