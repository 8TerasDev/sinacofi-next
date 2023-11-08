import { NextRequest } from "next/server";
import { disablePJuridicas, getAllPJuridicas } from "@/lib/pjuridica.prisma";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { correlativo_declaracion } = body;
    const actualizadas = await disablePJuridicas(correlativo_declaracion);
    return Response.json({ actualizadas });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
