import { NextRequest } from "next/server";
import { CreateUserProps, createUser } from "@/lib/createuser.prisma";

// to GET users --> await prisma.empleado.findMany()

export const POST = async ( req: NextRequest) => {

  try {
    const data: CreateUserProps = await req.json()
    const newUser = await createUser(data);
    const newUserString = JSON.stringify(newUser);

    return new Response(
      JSON.stringify( { message: `${ newUserString }` } ), 
      { status: 200 }
    )

  }
  catch(err){
    return new Response(JSON.stringify( 'error' ), {
      status: 500,
    });
  }
};