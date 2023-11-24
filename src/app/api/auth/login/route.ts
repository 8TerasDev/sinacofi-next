import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { findByUsername } from "@/lib/queries.prisma";
import { verifyPassword } from "@/lib/backend.utils";
import { getBankById } from "@/lib/banks/getBankById.prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await findByUsername(username);
    const valid = await verifyPassword(password, user?.password || "");
    if (!valid) {
      console.log("contraseña invalida");
      return Response.json(
        { error: "Invalid username or password" },
        {
          status: 400,
        }
      );
    }

    if (!user) {
      console.log("usuario no existe");
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        {
          status: 400,
        }
      );
    }
    const bank: any = user.bank_id ? await getBankById(user.bank_id as unknown as any) : {}
    const token = jwt.sign(
      {
        username,
        password,
        isAdmin: user.is_superuser,
        name: user.last_name,
        lastName: user.last_name,
        email: user.email,
        bank: bank?.nombre,
        bank_code: bank?.code,
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
