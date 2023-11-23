export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import {
  disablePJuridicas,
  getAllPJuridicas,
  getAllPJuridicasByDates,
} from "@/lib/pjuridica.prisma";
import { PJuridicas } from "@/application";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const startDate = url.searchParams.get("startdate");
    const endDate = url.searchParams.get("enddate");

    // Asegúrate de que startDate y endDate estén definidos
    if (startDate && endDate) {
      const declaraciones = await getAllPJuridicasByDates(startDate, endDate);
      return Response.json({ declaraciones });
    }
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
