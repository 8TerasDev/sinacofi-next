import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookies = request.cookies;
    const auth = cookies.get("auth")

    if (!auth) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    try {
        // const user = await verify(`${auth?.value}`, "secret") as any
    } catch (error) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/home',
}