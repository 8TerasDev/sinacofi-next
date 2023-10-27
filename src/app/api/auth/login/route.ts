import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { verifyCredentials } from "@/lib/queries.prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;
    console.log("body", body);

    if (!username || !password || username === "" || password === "") {
      console.log("username vacio");
      return new Response(
        JSON.stringify({ error: "Missing username or password" }),
        {
          status: 400,
        }
      );
    }
    if (!(await verifyCredentials(username, password))) {
      console.log("usuario no existe");
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        {
          status: 400,
        }
      );
    }
    console.log("genero jwt");
    const token = jwt.sign(
      {
        username,
        password,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    console.log("serializo jwt");
    const serializedToken = serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 3600,
    });
    console.log("seteo jwt");
    const cookieStore = cookies();
    cookieStore.set("auth", serializedToken);
    const res = new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Set-Cookie": `token=${token}` },
    });
    console.log("devuelvo jwt");
    return res;
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
  // return res.redirect(307, "/home");
}
