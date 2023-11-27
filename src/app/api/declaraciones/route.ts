export const dynamic = 'force-dynamic' // defaults to force-static

import { NextRequest } from "next/server";
import { disableDeclaracion, getAllDeclaraciones } from "@/lib/declaraciones.prisma";
import { getSessionUser } from "@/lib/security";
import { processError } from "@/lib/error";
import { getLastDeclaration } from "@/lib/lastdeclaration";

export async function GET(req: NextRequest) {

  try {
    const user = getSessionUser(req)
    const declaracionesWithoutFilterBankCode = await getAllDeclaraciones();
    const lastDeclarationId = await getLastDeclaration(user?.bank_code);
    const declaraciones = declaracionesWithoutFilterBankCode.map(( declaracion ) => {
      const isSameBank = user?.bank_code === declaracion.codigo_banco;
      const bankCode = (isSameBank || user.isAdmin) ? declaracion.codigo_banco : 'XXXX';
      const isLastDeclaration = declaracion.id === lastDeclarationId || user.isAdmin;
      return {...declaracion, codigo_banco: bankCode, isSameBank, isLastDeclaration }
    })
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
