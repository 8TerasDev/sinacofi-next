import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function GET(request: NextApiRequest) {
  return NextResponse.json({ message: "GET method not allowed" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;
    console.log({ body });

    if (!username || !password || username === "" || password === "") {
      console.log("Missing username or password");
      return new Response(
        JSON.stringify({ error: "Missing username or password" }),
        {
          status: 400,
        }
      );
    }

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
    const serializedToken = serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 3600,
    });
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