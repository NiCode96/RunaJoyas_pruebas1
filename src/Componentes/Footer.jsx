// ...existing code...
"use client";
import React from 'react';
import Image from 'next/image';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter
          id="footer"
          className="
            text-center text-lg-start text-gray-700
            bg-white
            border-t border-gray-200
            tracking-[0.01em]
          "
        >
            {/* // REDES SOCIALES */}
            <section className="w-full border-b border-gray-200">
              <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-center gap-6">
                {[
                  { href: 'https://www.instagram.com/runajoyas', icon: 'instagram' },
                  { href: 'https://www.facebook.com/runajoyas', icon: 'facebook-f' },
                  { href: 'https://www.tiktok.com/@runajoyas', icon: 'tiktok' },
                  { href: 'https://www.linkedin.com/', icon: 'linkedin' },
                  { href: 'https://github.com/', icon: 'github' },
                ].map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600/80 transition-all no-underline hover:text-gray-900 hover:-translate-y-0.5"
                  >
                    <MDBIcon fab icon={s.icon} size="lg" />
                  </a>
                ))}
              </div>
            </section>

            {/* NEWSLETTER */}
            <section className="w-full">
              <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4">
                <div>
                  <h3 className="text-gray-900 text-lg font-semibold">Consulta por tu Joya Favorita</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Consulta sobre tus despachos , nos aseguramos de que tu pedido llegue a tus manos!
                  </p>
                </div>

                <p className="text-gray-500 text-xs md:col-span-2">
                 Siguenos en redes sociales y no te pierdas nuestras promociones y concursos <a href="#" className="no-underline text-gray-700 hover:text-gray-900">Link a red social de preferencia</a>.
                </p>
              </div>
            </section>


            <section>
                <MDBContainer className='max-w-6xl mx-auto text-center text-md-start mt-8 px-4'>
                    <MDBRow className='mt-2 md:mt-3 gap-2'>
                        {/* // SOBRE NOSOTROS */}
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-6 md:mb-8'>
                            <h6 className='text-gray-900 uppercase tracking-wide text-sm font-semibold mb-4 flex items-center'>
                                <MDBIcon color='secondary' icon='gem' className='me-3' />
                                Runa Joyas
                            </h6>
                            <p className="text-gray-600 leading-relaxed">
                                Desde 1998, Runa Joyas se ha dedicado a crear piezas artesanales únicas que celebran la belleza de la cultura andina. Nuestro compromiso con la calidad, la sostenibilidad y el diseño auténtico nos distingue, ofreciendo joyas que cuentan historias y conectan generaciones.
                            </p>
                        </MDBCol>

                        {/* // PRODUCTOS (oculto en móviles y tablets) */}
                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-6 md:mb-8 hidden lg:block'>
                            <h6 className='text-gray-900 uppercase tracking-wide text-sm font-semibold mb-4'>Productos</h6>
                            {/* // PRODUCTOS - EDITA ESTOS ITEMS SEGÚN TUS CATEGORÍAS */}
                            <p>
                                <span className='text-gray-600 cursor-default'>Joyas</span>
                            </p>
                            <p>
                                <span className='text-gray-600 cursor-default'>Collares</span>
                            </p>
                            <p>
                                <span className='text-gray-600 cursor-default'>Pulseras</span>
                            </p>
                            <p>
                                <span className='text-gray-600 cursor-default'>Aros</span>
                            </p>
                            <p>
                                <span className='text-gray-600 cursor-default'>Accesorios</span>
                            </p>
                        </MDBCol>

                        {/* // ENLACES ÚTILES */}
                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-6 md:mb-8 hidden lg:block'>
                            <h6 className='text-gray-900 uppercase tracking-wide text-sm font-semibold mb-4'>Enlaces</h6>
                            {/* // ENLACES - EDITA LOS LINKS PRINCIPALES */}
                            <p>
                                <span className='text-gray-600 cursor-default'>Categorías</span>
                            </p>
                            <p>
                                <span className='text-gray-600 cursor-default'>Más vendidos</span>
                            </p>
                            <p>
                                <span className='text-gray-600 cursor-default'>Ofertas</span>
                            </p>
                        </MDBCol>

                        {/* // CONTACTO */}
                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-gray-900 tracking-wide uppercase text-sm font-bold mb-3 md:mb-4'>Contacto</h6>
                            {/* // CONTACTO - EDITA DATOS DE CONTACTO PARA CHILE */}
                            <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><MDBIcon color='secondary' icon='home' className='mt-0.5 me-2' /> Av. Providencia 1234, Santiago, Chile</p>
                            <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><MDBIcon color='secondary' icon='envelope' className='mt-0.5 me-3' /> ventas@runajoyas.cl</p>
                            <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><MDBIcon color='secondary' icon='phone' className='mt-0.5 me-3' /> +56 9 9876 5432</p>
                            <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><MDBIcon color='secondary' icon='clock' className='mt-0.5 me-3' /> Lun–Sáb 10:00–19:00</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            {/* BENEFICIOS / CONFIANZA */}
            <section className="w-full mt-8 border-t border-gray-200">
              <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex items-center justify-center gap-3">
                    <MDBIcon icon="truck" className="text-gray-700 text-lg" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 m-0">Despacho a todo Chile</p>
                      <p className="text-xs text-gray-600 m-0">Envíos seguros y confiables</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <img
                      src="/Correos_Chile_2008.webp"
                      alt="Correos de Chile"
                      className="h-6 w-auto opacity-90 transition-transform hover:scale-105"
                      loading="lazy"
                    />
                    <img
                      src="/Starken.png"
                      alt="Starken"
                      className="h-8 w-auto opacity-95 transition-transform hover:scale-110"
                      loading="lazy"
                    />
                    <img
                      src="/chilexpress.png.webp"
                      alt="Chilexpress"
                      className="h-6 w-auto opacity-90 transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MDBIcon icon="lock" className="text-gray-700" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 m-0">Compra Segura</p>
                    <p className="text-xs text-gray-600 m-0">Pagos cifrados</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-600 text-xs">Pagos con</span>
                      <img
                        src="/mercadopago.png"
                        alt="Mercado Pago"
                        className="h-6 w-auto opacity-95"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MDBIcon icon="credit-card" className="text-gray-700" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 m-0">Múltiples métodos de pago</p>
                    <p className="text-xs text-gray-600 m-0">Crédito, débito y transferencias</p>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src="/medios.png"
                        alt="Medios de pago"
                        className="h-6 w-auto opacity-95"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 mt-8">
              <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                <span className="text-gray-600 text-sm">
                  © 2025 — Página desarrollada por <span className="text-gray-900">NativeCode.cl</span>
                </span>
                <a
                  href="https://nativecode.cl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 no-underline hover:text-gray-900 text-sm tracking-wide"
                  title="Aplicación web desarrollada por NativeCode.cl"
                >
                  Aplicación web desarrollada por <span className="text-gray-900">NativeCode.cl</span>
                </a>
                <div className="flex items-center gap-4">
                  <a href='https://www.instagram.com/runajoyas' target='_blank' rel='noopener noreferrer' className='text-gray-600/80 transition-all no-underline hover:text-gray-900 hover:-translate-y-0.5'>
                    <MDBIcon fab icon='instagram' />
                  </a>
                  <a href='https://www.facebook.com/runajoyas' target='_blank' rel='noopener noreferrer' className='text-gray-600/80 transition-all no-underline hover:text-gray-900 hover:-translate-y-0.5'>
                    <MDBIcon fab icon='facebook-f' />
                  </a>
                  <a href='https://www.tiktok.com/@runajoyas' target='_blank' rel='noopener noreferrer' className='text-gray-600/80 transition-all no-underline hover:text-gray-900 hover:-translate-y-0.5'>
                    <MDBIcon fab icon='tiktok' />
                  </a>
                </div>
              </div>
            </div>
        </MDBFooter>
    );
}
// ...existing code...
