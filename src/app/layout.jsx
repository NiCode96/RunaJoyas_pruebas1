// src/app/layout.jsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";

export const metadata = {
    title: "RunaJoyas | Joyería moderna con piezas únicas",
    description: "Joyas artesanales y modernas en Chile.",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="es">
            <body className="min-h-screen bg-white">
            {/* Aquí usamos el componente cliente que ya maneja Motion */}
            <AnimatedLayout>{children}</AnimatedLayout>
            </body>
            </html>
        </ClerkProvider>
    );
}