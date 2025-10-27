// TypeScript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)', // protege /dashboard y subrutas
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
    if (isProtectedRoute(req)) {
        const authResult = await auth()
        const isSignedIn = Boolean(
            (authResult as any).sessionId ||
            (authResult as any).userId ||
            (authResult as any).isAuthenticated ||
            (authResult as any).isSignedIn
        )

        if (!isSignedIn) {
            const url = new URL('/sign-in', req.url)
            return NextResponse.redirect(url)
        }
    }
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
