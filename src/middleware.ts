import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// JWS VERIFY CAN NOT BE USED HERE.

//const whiteListPaths = ['/','/home'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        const cookies = request.cookies;
        const auth = cookies.get("auth");
        //const path = request.nextUrl.pathname;

        const nextPath = `${request.nextUrl.basePath}${request.nextUrl.pathname}`

        // TODO: if isLogged -> go to Home.
        if (auth || !config.matcher.some(m => m.toLowerCase() == nextPath.toLowerCase())) return NextResponse.next();
        if (config.matcher.some(m => m.toLowerCase() == nextPath.toLowerCase())) {
            return NextResponse.redirect(new URL(`${request.nextUrl.basePath}/`, request.url))
        }
        return NextResponse.redirect(new URL(`/`, request.url))

        // if(!whiteListPaths.includes(path) || !auth){
        //     return NextResponse.redirect(new URL('/', request.url))
        // }

    } catch (error) {
        console.log(error)
        //return NextResponse.redirect(new URL('/', request.url))
    }
    //return NextResponse.next()
}

// See "Matching Paths" below to learn more
// TODO
export const config = {
    matcher: [
        `${process.env.BASE_PATH}/home`,
        `${process.env.BASE_PATH}/admin`,
        `${process.env.BASE_PATH}/api/*`,
        // TODO: Run always middleware
        //'/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}
