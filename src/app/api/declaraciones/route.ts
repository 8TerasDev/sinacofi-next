export const dynamic = 'force-dynamic' // defaults to force-static

import { NextRequest } from "next/server";
import { getAllDeclaraciones } from "@/lib/declaraciones.prisma";

export async function GET(req: NextRequest) {

  try {

    const declaraciones = await getAllDeclaraciones();

    return Response.json({ declaraciones });
  } catch (error: any) {

    return Response.json({ error: error?.message }, {
      status: 500,
    });
  }
}
