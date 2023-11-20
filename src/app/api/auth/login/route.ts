import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { verifyCredentials } from "@/lib/queries.prisma";
import { prisma } from "@/lib/newclient.prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await verifyCredentials(username, password);

    if (!user) {
      console.log("usuario no existe");
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        {
          status: 400,
        }
      );
    }

    const token = jwt.sign(
      {
        username,
        password,
        isAdmin: user.is_superuser,
        name: user.last_name,
        lastName: user.last_name,
        email: user.email,
        bank: user.bank_id,
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
      headers: { "Set-Cookie": `auth=${token}` },
    });

    return res;
  } catch (error) {
    console.error("Error al obtener las declaraciones:", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
