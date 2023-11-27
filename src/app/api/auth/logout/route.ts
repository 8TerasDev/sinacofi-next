import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const cookies = await req.cookies;
    await cookies.delete('auth')

    const token = '1';

    const serializedToken = serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    const res = new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Set-Cookie": `auth=${serializedToken}` },
    });
    return res;

  } catch (error) {
    return NextResponse.json({message:'Error'}, { status: 500 })
  }
}
