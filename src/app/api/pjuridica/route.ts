import { NextRequest } from "next/server";
import { getAllPJuridicas } from "@/lib/pjuridica.prisma";

export async function GET(req: NextRequest) {
  try {
    const declaraciones = await getAllPJuridicas();
    return Response.json({ declaraciones });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
