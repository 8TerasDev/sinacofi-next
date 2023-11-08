import { getAllPFinales } from "@/lib/pfinales.prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const queryParams = url.searchParams;
    const correlativo_declaracion = queryParams.get("correlativo_declaracion");
    const pfinales = await getAllPFinales(correlativo_declaracion as string);
    return Response.json({ pfinales });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
