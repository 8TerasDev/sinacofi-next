export const dynamic = 'force-dynamic'

import { processError } from "@/lib/error";
import {
  getAllPFinales,
  getUniqueCorrelativoDeclaracion,
} from "@/lib/pfinales.prisma";
import { getSessionUser } from "@/lib/security";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    getSessionUser(req)
    const url = req.nextUrl;
    const queryParams = url.searchParams;
    const correlativo_declaracion = queryParams.get("correlativo_declaracion");
    const pfinales = await getAllPFinales(correlativo_declaracion as string);
    return Response.json({ pfinales });
  } catch (error) {
    return processError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rut_beneficiario } = body;
    const declaraciones = await getUniqueCorrelativoDeclaracion(
      rut_beneficiario
    );
    return Response.json({ declaraciones });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
