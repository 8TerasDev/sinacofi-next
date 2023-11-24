export const dynamic = 'force-dynamic' // defaults to force-static

import { NextRequest } from "next/server";
import { disableDeclaracion, getAllDeclaraciones } from "@/lib/declaraciones.prisma";
import { getSessionUser } from "@/lib/security";
import { processError } from "@/lib/error";

export async function GET(req: NextRequest) {

  try {
    getSessionUser(req)
    const declaraciones = await getAllDeclaraciones();

    return Response.json({ declaraciones });
  } catch (error: any) {
    return processError(error)
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const actualizadas = await disableDeclaracion(id);
    return Response.json({ actualizadas });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
