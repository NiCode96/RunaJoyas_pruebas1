// TypeScript
// archivo: `frontend/src/middleware.ts`
import { clerkMiddleware, clerkClient, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

// Matcher que detecta cualquier ruta dentro de /dashboard (incluye layout y subrutas)
// Usamos la sintaxis Next.js '/dashboard/:path*' que coincide con /dashboard y todas sus subrutas
const isProtectedRoute = createRouteMatcher(['/dashboard/:path*'])

const ALLOWED_EMAIL = 'tm.nicolasmachuca@gmail.com'

export default clerkMiddleware(async (auth, req: NextRequest) => {
    const pathname = req.nextUrl.pathname

    // LOG temporales para depuración (quitar en producción)
    try {
        // No usar JSON.stringify en Request circular
        console.log('[middleware] method=', req.method, 'pathname=', pathname)
    } catch (e) {
        // ignore
    }

    // Evitar procesar rutas públicas que podrían crear bucles
    const PUBLIC_ROUTES = new Set(['/no-access', '/sign-in', '/sign-out', '/'])
    if (PUBLIC_ROUTES.has(pathname)) {
        console.log('[middleware] skipping public route', pathname)
        return NextResponse.next()
    }

    // Si no es una ruta protegida, seguir
    if (!isProtectedRoute(req)) {
        console.log('[middleware] not a protected route', pathname)
        return NextResponse.next()
    }

    const authResult = await auth()
    const userId = (authResult as any).userId
    const isSignedIn = Boolean(
        (authResult as any).sessionId ||
        userId ||
        (authResult as any).isAuthenticated ||
        (authResult as any).isSignedIn
    )

    if (!isSignedIn) {
        console.log('[middleware] not signed in — redirecting to /no-access', pathname)
        const url = new URL('/no-access', req.url)
        return NextResponse.redirect(url)
    }

    try {
        // clerkClient puede ser exportado como función o como cliente directo según versión.
        // Soportamos ambos: si es función la invocamos, si no, la usamos directamente.
        let client: any = clerkClient as any
        if (typeof clerkClient === 'function') {
            client = await (clerkClient as any)()
        }

        const user = await client.users.getUser(userId)
        const primaryEmail = user.emailAddresses?.find((e: any) => e.id === user.primaryEmailAddressId) ||
            user.emailAddresses?.[0]
        const email = primaryEmail?.emailAddress?.toLowerCase() || ''

        console.log('[middleware] userId=', userId, 'email=', email)

        if (email !== ALLOWED_EMAIL.toLowerCase()) {
            console.log('[middleware] email not allowed — redirecting to /no-access', email)
            const url = new URL('/no-access', req.url)
            return NextResponse.redirect(url)
        }

        console.log('[middleware] allowed user — continuing', email)
    } catch (err) {
        console.log('[middleware] error resolving user, redirecting to /no-access', err)
        const url = new URL('/no-access', req.url)
        return NextResponse.redirect(url)
    }

})

export const config = {
    matcher: [
        // Ejecutar middleware solo para las rutas del dashboard y sus subrutas
        '/dashboard/:path*'
    ],
}
