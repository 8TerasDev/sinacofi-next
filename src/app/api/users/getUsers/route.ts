export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { getUsers } from "@/lib/users/getusers.prisma";

export const GET = async (req: NextRequest) => {
  try {
    const users = await getUsers();
    return Response.json(users)
  }
  catch (err) {
    console.log(err)
    return Response.json(err)
  }
};
