export const dynamic = 'force-dynamic' // defaults to force-static

import { NextRequest } from "next/server";
import { findDeclaracionById } from "@/lib/declaraciones.prisma";
import { getSessionUser } from "@/lib/security";
import { processError } from "@/lib/error";

type GetParam = { params: { id: string } }

export async function GET(req: NextRequest, { params }: GetParam) {

    try {
        getSessionUser(req)
        const data = await findDeclaracionById(params.id);
        return Response.json(data);
    } catch (error: any) {
        return processError(error, 'No se ha podido obtener las declaracion')
    }
}

