import { NextRequest } from "next/server";
import { getAllDeclaraciones } from "@/lib/declaraciones.prisma";

export async function GET(req: NextRequest) {
  try {
    const declaraciones = await getAllDeclaraciones();
    return Response.json({ declaraciones });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
