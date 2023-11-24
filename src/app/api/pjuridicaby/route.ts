export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { getDeclaracionesByCorrelativos } from "@/lib/pjuridica.prisma";
import { getSessionUser } from "@/lib/security";
import { processError } from "@/lib/error";

export async function POST(req: NextRequest) {
  try {
    getSessionUser(req)
    const body = await req.json();
    const { correlativos_declaracion } = body;
    const declaraciones = await getDeclaracionesByCorrelativos(
      correlativos_declaracion
    );
    return Response.json({ declaraciones });
  } catch (error) {
    return processError(error)
  }
}
