import { NextRequest } from "next/server";
import { getDeclaracionesByCorrelativos } from "@/lib/pjuridica.prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { correlativos_declaracion } = body;
    const declaraciones = await getDeclaracionesByCorrelativos(
      correlativos_declaracion
    );
    return Response.json({ declaraciones });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
