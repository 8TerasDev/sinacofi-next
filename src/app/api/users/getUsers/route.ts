import { NextRequest } from "next/server";
import { getUsers } from "@/lib/users/getusers.prisma";

export const GET = async ( req: NextRequest) => {
  try {
    const users = await getUsers();
    const usersString = JSON.stringify(users);
    return Response.json(usersString)
  }
  catch(err){
    console.log(err)
    return Response.json(err)
  }
};