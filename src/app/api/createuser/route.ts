import { NextRequest } from "next/server";
import { CreateUserProps, createUser } from "@/lib/createuser.prisma";
import { getUsers } from "@/lib/users/getusers.prisma";

// to GET users --> await prisma.empleado.findMany()

export const POST = async ( req: NextRequest) => {
  try {
    const data: CreateUserProps = await req.json()
    const newUser = await createUser(data);
    //const newUserString = JSON.stringify(newUser);
    //return Response.json(newUserString)
    const newUsers = await getUsers();
    const newUsersString = JSON.stringify(newUsers);
    return Response.json(newUsersString)
  }
  catch(err){
    return Response.json(err)
  }
};