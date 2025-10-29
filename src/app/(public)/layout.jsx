'use client'
// src/app/(public)/layout.jsx
import NavBarFemenino from '@/Componentes/NavBarFemenino'
import Footer from '@/Componentes/Footer'
import BotonWhatsapp from '@/Componentes/BotonWhatsapp'

export default function PublicLayout({ children }) {
    return (
<div>
 <NavBarFemenino />
    <main>{children}</main>
    <Footer id="footer" />
    <BotonWhatsapp />
</div>
    )
}