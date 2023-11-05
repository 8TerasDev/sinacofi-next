import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { verifyCredentials } from "@/lib/queries.prisma";

export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const auth = cookies.get("auth")

    if (!auth) {
      return new Response(JSON.stringify({ error: "no token" }), {
        status: 401,
      });
    }

    const user = await verify(`${auth?.value}`, "secret")
    return new Response(JSON.stringify({ user }))
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
  // return res.redirect(307, "/home");
}
