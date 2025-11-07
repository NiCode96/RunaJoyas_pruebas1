'use client'
// src/app/(public)/layout.jsx
import NavBarFemenino from '@/Componentes/NavBarFemenino'
import Footer from '@/Componentes/Footer'
import BotonWhatsapp from '@/Componentes/BotonWhatsapp'
import CarritoProvider from "@/ContextosGlobales/CarritoContext";
import ToasterClient from "@/Componentes/ToasterClient";
import ObjetoPagarProvider from "@/ContextosGlobales/ObjetoPagarContext";

export default function PublicLayout({ children }) {
    return (
<ObjetoPagarProvider>
    <CarritoProvider>
        <div>
            <ToasterClient />
            <NavBarFemenino />
            <main>{children}</main>
            <Footer id="footer" />
            <BotonWhatsapp />
        </div>
    </CarritoProvider>
</ObjetoPagarProvider>
    )
}