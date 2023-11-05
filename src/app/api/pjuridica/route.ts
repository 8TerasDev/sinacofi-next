import { NextRequest } from "next/server";
import { getUniqueCorrelativoDeclaracionWithData } from "@/lib/pjuridica.prisma";

export async function GET(req: NextRequest) {
  try {
    const declaraciones = await getUniqueCorrelativoDeclaracionWithData();
    return Response.json({ declaraciones });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
