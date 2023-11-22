import { NextRequest } from "next/server";
import { CreateUserProps, createUser } from "@/lib/createuser.prisma";
import { getUsers } from "@/lib/users/getusers.prisma";

export const POST = async ( req: NextRequest) => {
  try {
    const data: CreateUserProps = await req.json()
    const newUser = await createUser(data);
    const newUsers = await getUsers();
    const newUsersString = JSON.stringify(newUsers);
    return Response.json(newUsersString)
  }
  catch(err){
    return Response.json(err)
  }
};