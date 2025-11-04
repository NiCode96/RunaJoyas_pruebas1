"use client";
import React from "react";
import Image from "next/image";

import { Michroma } from "next/font/google";

const michroma = Michroma({
    weight: "400",
    subsets: ["latin"],
});

function Icon({ name, className = "w-6 h-6" }) {
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M13.5 22v-8h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H17V4.2C16.65 4.14 15.73 4 14.67 4 12.47 4 11 5.24 11 8v3H8.5v3H11v8h2.5z"/>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M21 8.5a7 7 0 0 1-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5c.17 0 .34 0 .5.03V12a3 3 0 1 0 3 3V2h3a7 7 0 0 0 2 5.5z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M6.94 8.94H3.88V20h3.06V8.94zM5.41 3.5a1.77 1.77 0 1 0 0 3.54 1.77 1.77 0 0 0 0-3.54zM20.12 20h-3.06v-5.8c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.22 1.5-2.22 3.05V20H9.86V8.94h2.94v1.5h.04c.41-.78 1.43-1.6 2.95-1.6 3.16 0 3.74 2.08 3.74 4.77V20z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path fillRule="evenodd" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.6-3.37-1.19-3.37-1.19-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.61.07-.61 1.02.07 1.56 1.05 1.56 1.05.9 1.54 2.37 1.09 2.95.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.51c.85 0 1.7.11 2.5.32 1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.69.92.69 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10 10 0 0 0 12 2z" clipRule="evenodd"/>
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 3l9 8h-3v10H6V11H3l9-8z"/></svg>
    ),
    envelope: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M4 6h16a2 2 0 0 1 2 2v.2l-10 6.25L2 8.2V8a2 2 0 0 1 2-2zm0 4.3l8 5 8-5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.7z"/></svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.6-.36c1.74.58 3.63.9 5 .9a1.5 1.5 0 0 1 1.5 1.5V21a1.5 1.5 0 0 1-1.5 1.5C12.08 22.5 1.5 11.92 1.5 1.5A1.5 1.5 0 0 1 3 0h3.7A1.5 1.5 0 0 1 8.2 1.5c0 1.36.32 3.26.9 5a1.5 1.5 0 0 1-.37 1.6L6.6 10.8z"/></svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 10.41l3.3 1.9-.75 1.3L11 13V7h2v5.41z"/></svg>
    ),
    truck: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M3 4h11v8h2l3 3v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V4zm13 8V6h2l3 4v2h-5z"/></svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 0 1 6 0v3H9z"/></svg>
    ),
    credit: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M3 5h18a2 2 0 0 1 2 2v2H1V7a2 2 0 0 1 2-2zm-2 6h22v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-6z"/></svg>
    ),
  };
  return icons[name] || null;
}

export default function Footer() {
  return (
    <footer id="footer" className="text-gray-700 bg-white border-t border-gray-200 tracking-[0.01em]">
      {/* REDES SOCIALES */}
      <section className="w-full border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-center gap-6">
          <a
            href="https://www.instagram.com/runajoyas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group inline-flex items-center justify-center p-2 rounded-full transition-all no-underline hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500"
          >
            <span className="sr-only">Instagram</span>
            <div className="rounded-full p-0.5 bg-white">
              <Image src="/insta.png" alt="Instagram Runa Joyas" width={150} height={150}
              className="p-2"
              />
            </div>
          </a>
        </div>
      </section>

      {/* BLOQUE DESCRIPTIVO */}
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-4">
          <div>
            <h3 className="text-gray-900 text-lg font-bold leading-tight">Consulta por tu Joya Favorita</h3>
            <p className="text-gray-600 text-sm mt-1">
              Consulta sobre tus despachos, ¡nos aseguramos de que tu pedido llegue a tus manos!
            </p>
          </div>
          <p className="text-gray-500 text-xs md:col-span-2">
            Síguenos en redes sociales y no te pierdas nuestras promociones y concursos {" "}
            <a href="#" className="no-underline text-gray-700 hover:text-gray-900">Link a red social de preferencia</a>.
          </p>
        </div>
      </section>

      {/* CUERPO PRINCIPAL */}
      <section>
        <div className="max-w-6xl mx-auto text-center md:text-left mt-2 md:mt-3 px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 items-start">
            {/* SOBRE NOSOTROS */}
            <div className="flex flex-col gap-3">
              <h6 className="text-gray-900 uppercase tracking-wide text-sm font-bold mb-0 flex items-center gap-2 leading-tight">
                <Icon name="home" className="w-5 h-5" /> Runa Joyas
              </h6>
              <p className="text-gray-600 leading-relaxed text-sm">
                Desde 1998, Runa Joyas crea piezas artesanales únicas que celebran la cultura andina. Calidad,
                sostenibilidad y diseño auténtico para joyas que conectan generaciones.
              </p>
            </div>

            {/* PRODUCTOS (oculto en móviles y tablets) */}
            <div className="hidden lg:flex flex-col gap-3">
              <h6 className="text-gray-900 uppercase tracking-wide text-sm font-bold mb-0 leading-tight">Productos</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Joyas</li>
                <li>Collares</li>
                <li>Pulseras</li>
                <li>Aros</li>
                <li>Accesorios</li>
              </ul>
            </div>

            {/* ENLACES ÚTILES */}
            <div className="hidden lg:flex flex-col gap-3">
              <h6 className="text-gray-900 uppercase tracking-wide text-sm font-bold mb-0 leading-tight">Enlaces</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Categorías</li>
                <li>Más vendidos</li>
                <li>Ofertas</li>
              </ul>
            </div>

            {/* CONTACTO */}
            <div className="flex flex-col gap-3">
              <h6 className="text-gray-900 tracking-wide uppercase text-sm font-bold mb-0 leading-tight">Contacto</h6>
              <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><Icon name="home" className="w-4 h-4" /> Valdivia Chile</p>
              <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><Icon name="envelope" className="w-4 h-4" /> ventas@runajoyas.cl</p>
              <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><Icon name="phone" className="w-4 h-4" /> +56 9 9876 5432</p>
              <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><Icon name="clock" className="w-4 h-4" /> Lun–Sáb 10:00–19:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS / CONFIANZA */}
      <section className="w-full mt-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center items-start">
          <div className="flex flex-col items-center justify-start gap-3">
            <div className="flex items-center justify-center gap-3">
              <Icon name="truck" className="w-6 h-6 text-gray-700" />
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 m-0">Despacho a todo Chile</p>
                <p className="text-xs text-gray-600 m-0">Envíos seguros y confiables</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Image src="/Correos_Chile_2008.webp" alt="Correos de Chile" width={90} height={24} className="opacity-90" />
              <Image src="/Starken.png" alt="Starken" width={110} height={32} className="opacity-95" />
              <Image src="/chilexpress.png.webp" alt="Chilexpress" width={120} height={26} className="opacity-90" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Icon name="lock" className="w-6 h-6 text-gray-700" />
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900 m-0">Compra Segura</p>
              <p className="text-xs text-gray-600 m-0">Pagos cifrados</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-600 text-xs">Pagos con</span>
                <Image src="/mercadopago.png" alt="Mercado Pago" width={120} height={28} className="opacity-95" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Icon name="credit" className="w-6 h-6 text-gray-700" />
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900 m-0">Múltiples métodos de pago</p>
              <p className="text-xs text-gray-600 m-0">Crédito, débito y transferencias</p>
              <div className="flex items-center gap-2 mt-2">
                <Image src="/medios.png" alt="Medios de pago" width={130} height={26} className="opacity-95" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COPYRIGHT */}
      <div className="border-top border-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          {/* Removed the "Página desarrollada por" text per request */}
          <p className={`${michroma.className} text-gray-800 text-xs tracking-wide select-none text-center md:text-left flex items-center gap-1`}>
            <span className="text-base">©</span> Desarrollado por NativeCode
          </p>
          <div className="flex items-center">

          </div>
        </div>
      </div>
    </footer>
  );
}
