import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { verifyCredentials } from "@/lib/queries.prisma";

export async function POST(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const aa = cookies.delete('auth')

    // if (!auth) {
    //   return new Response(JSON.stringify({ error: "no token" }), {
    //     status: 401,
    //   });
    // }
    // const user = await verify(`${auth?.value}`, "secret") as any
    // const token = jwt.sign(
    //   {
    //     username: user.username,
    //     password: user.password,
    //   },
    //   "secret",
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    const token = '1';

    const serializedToken = serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    // const cookieStore = cookies();
    // cookieStore.set("auth", serializedToken);

    const res = new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Set-Cookie": `auth=${serializedToken}` },
    });
    return res;

  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
  // return res.redirect(307, "/home");
}
