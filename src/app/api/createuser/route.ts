import { NextRequest } from "next/server";
import { CreateUserProps, createUser } from "@/lib/createuser.prisma";

// to GET users --> await prisma.empleado.findMany()

export const POST = async ( req: NextRequest) => {
  try {
    const data: CreateUserProps = await req.json()
    const newUser = await createUser(data);
    const newUserString = JSON.stringify(newUser);
    return Response.json(newUserString)
  }
  catch(err){
    return Response.json(err)
  }
};