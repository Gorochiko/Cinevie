import { NextRequest, NextResponse } from "next/server"
import { auth } from "./lib/auth"
import { se } from "date-fns/locale"

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const session = await auth()
   
    if (session?.user.role) {
        switch (session.user.role) {
            case 'Admin':
                if (pathname.startsWith('/dashboards') || pathname.startsWith('/showtimes') || pathname.startsWith('/films') || pathname.startsWith('/tickets') || pathname.startsWith('/customers') || pathname.startsWith('/foods') || pathname.startsWith('/theaters')) {
                    return NextResponse.next()
                }
                return NextResponse.redirect(new URL('/dashboards', request.url))
            case 'client':
                if (pathname.startsWith('/dashboards') || pathname.startsWith('/showtimes') || pathname.startsWith('/films') || pathname.startsWith('/tickets') || pathname.startsWith('/customers') || pathname.startsWith('/foods') || pathname.startsWith('/theaters')) {
                    return NextResponse.redirect(new URL('/', request.url))
                }
                return NextResponse.next()
            // default:
            //     return NextResponse.redirect(new URL('/', request.url))
        }
    } else {
        if (pathname.startsWith('/dashboards') || pathname.startsWith('/showtimes') || pathname.startsWith('/films') || pathname.startsWith('/tickets') || pathname.startsWith('/customers') || pathname.startsWith('/foods') || pathname.startsWith('/theaters')) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|login|register|movies|[id]|otp|$|[^/]+\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
        '/dashboards/:path*',
        '/showtimes/:path*',
        '/films/:path*',
        '/tickets/:path*',
        '/customers/:path*',
        '/foods/:path*',
        '/theaters/:path*',
        '/',
    ],
};