export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { processError } from "@/lib/error";
import { getSessionUser } from "@/lib/security";


export async function GET(req: NextRequest) {
  try {
    const user = getSessionUser(req)
    return Response.json({ user })
  } catch (error: any) {
    return processError(error)
  }
  // return res.redirect(307, "/home");
}
