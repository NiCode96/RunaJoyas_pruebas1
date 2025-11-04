// TypeScript
// archivo: `frontend/src/middleware.ts`
// Temporal: desactivar restricciones para que cualquiera pueda acceder.
// Solo se modificó este archivo según tu petición.

import { NextResponse, type NextRequest } from 'next/server'

// Middleware NO BLOQUEANTE: permite cualquier petición durante el desarrollo.
export default function middleware(_req: NextRequest) {
  // Puedes añadir logs si quieres depurar: console.log('[middleware] allow all', _req.nextUrl.pathname)
  return NextResponse.next()
}

// Opcional: si quieres que el middleware ni siquiera se ejecute, puedes comentar `config` o dejarla vacía.
export const config = {
  // no matcher => middleware se ejecuta para todas las rutas; como devuelve NextResponse.next() no bloquea nada
}
