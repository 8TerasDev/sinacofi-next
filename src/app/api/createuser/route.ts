import { NextRequest } from "next/server";
import { CreateUserProps, createUser } from "@/lib/createuser.prisma";
import { getUsers } from "@/lib/users/getusers.prisma";
import { encryptPassword } from "@/lib/backend.utils";

export const POST = async (req: NextRequest) => {
  try {
    const data: CreateUserProps = await req.json();
    data.password = await encryptPassword(data.password);
    const newUser = await createUser(data);
    const newUsers = await getUsers();
    const newUsersString = JSON.stringify(newUsers);
    return Response.json(newUsersString);
  } catch (err) {
    return Response.json(err);
  }
};
