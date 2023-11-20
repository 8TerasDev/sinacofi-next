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

        // TODO: if isLogged -> go to Home.
        if(auth) return NextResponse.next();
        return NextResponse.redirect(new URL('/', request.url))

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
        '/home',
        '/admin',
        // TODO: Run always middleware
        //'/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}