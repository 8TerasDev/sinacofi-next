import { NextRequest } from "next/server";
import { SignUpProps, signUp } from "@/lib/signup.prisma";

// to GET users --> await prisma.empleado.findMany()

export const POST = async ( req: NextRequest) => {

  try {
    const data: SignUpProps = await req.json()
    const newUser = await signUp(data);
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