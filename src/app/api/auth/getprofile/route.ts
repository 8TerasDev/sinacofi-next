export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";


export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const auth = cookies.get("auth")

    if (!auth) {
      return new Response(JSON.stringify({ error: "no token" }), {
        status: 401,
      });
    }

    const user = await verify(`${auth?.value}`, "secret")
    return Response.json({ user })
  } catch (error: any) {
    if (error.name && error.name === "TokenExpiredError") {
      return Response.json({ "error": "token expired" }, {
        status: 401,
      });
    }
    return Response.json({ error }, {
      status: 500,
    });
  }
  // return res.redirect(307, "/home");
}
