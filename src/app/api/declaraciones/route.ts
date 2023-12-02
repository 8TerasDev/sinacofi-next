export const dynamic = 'force-dynamic' // defaults to force-static

import { NextRequest } from "next/server";
import { FindArgs, disableDeclaracion, findDeclaraciones } from "@/lib/declaraciones.prisma";
import { getSessionUser } from "@/lib/security";
import { processError } from "@/lib/error";
import { getLastDeclaration } from "@/lib/lastdeclaration";

const extractName = (key: string) => {
  const beginIndex = key.indexOf("[")
  const endIndex = key.indexOf("]")
  return key.substring(beginIndex + 1, endIndex)
}

const pushNewValueAndCreateArray = (prev: string[] | string, value: string) => {
  if (Array.isArray(prev)) {
    return [...prev, value]
  } else {
    return [prev, value]
  }
}

const parseQueryArgs = (params: URLSearchParams, bankCode: string | undefined) => {
  const input: FindArgs = {
    bankCode: bankCode ?? '-1'
  }
  const args: any = {}
  const keys = ["page", "filter", "order"]
  for (let entry of params.entries()) {
    const key = keys.find(k => entry[0].toLowerCase().startsWith(k))
    if (key) {
      const name = extractName(entry[0])
      args[key] = { ...(args[key] ?? {}) }
      args[key][name] = args[key][name] ? pushNewValueAndCreateArray(args[key][name], entry[1]) : entry[1]
    }
  }

  return { ...input, ...args }
}

export async function GET(req: NextRequest) {

  try {
    const user = getSessionUser(req)
    const input = parseQueryArgs(req.nextUrl.searchParams, user.bank_code)
    const data = await findDeclaraciones(input);
    const lastDeclarationId = await getLastDeclaration(user?.bank_code);
    data.items = data.items.map((declaracion) => {
      const isSameBank = user?.bank_code === declaracion.codigo_banco;
      const isLastDeclaration = declaracion.id === lastDeclarationId || user.isAdmin;
      return { ...declaracion, isSameBank, isLastDeclaration }
    })
    return Response.json(data);
  } catch (error: any) {
    return processError(error, 'No se ha podido obtener las declaraciones ')
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const actualizadas = await disableDeclaracion(id);
    return Response.json({ actualizadas });
  } catch (error) {
    return processError(error, 'No se ha podido deshabilitar la declaracion')
  }
}
