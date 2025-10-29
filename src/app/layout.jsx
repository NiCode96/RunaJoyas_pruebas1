// src/app/layout.jsx
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
    title: 'RunaJoyas | Joyería moderna con piezas únicas',
    description: 'Joyas artesanales y modernas en Chile.',
}

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="es">
            <body>{children}</body>
            </html>
        </ClerkProvider>
    )
}