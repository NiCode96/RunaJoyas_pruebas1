"use client";
import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            {/* // REDES SOCIALES */}
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div>
                    <a href='#' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='facebook-f' />
                    </a>
                    <a href='#' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='twitter' />
                    </a>
                    <a href='#' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='google' />
                    </a>
                    <a href='#' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='instagram' />
                    </a>
                    <a href='#' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='linkedin' />
                    </a>
                    <a href='#' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='github' />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-4 md:mt-8'>
                    <MDBRow className='mt-2 md:mt-3 gap-2'>
                        {/* // SOBRE NOSOTROS */}
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4 hidden md:block'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon color='secondary' icon='gem' className='me-3' />
                                Runa Joyas
                            </h6>
                            <p>
                                Desde 1998, Runa Joyas se ha dedicado a crear piezas artesanales únicas que celebran la belleza de la cultura andina. Nuestro compromiso con la calidad, la sostenibilidad y el diseño auténtico nos distingue, ofreciendo joyas que cuentan historias y conectan generaciones.
                            </p>
                        </MDBCol>

                        {/* // PRODUCTOS */}
                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4 hidden md:block'>
                            <h6 className='text-uppercase fw-bold mb-4'>Productos</h6>
                            {/* // PRODUCTOS - EDITA ESTOS ITEMS SEGÚN TUS CATEGORÍAS */}
                            <p>
                                <a href='#!' className='text-reset'>Joyas</a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>Collares</a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>Pulseras</a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>Aros</a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>Accesorios</a>
                            </p>
                        </MDBCol>

                        {/* // ENLACES ÚTILES */}
                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4 hidden md:block'>
                            <h6 className='text-uppercase fw-bold mb-4'>Enlaces</h6>
                            {/* // ENLACES - EDITA LOS LINKS PRINCIPALES */}
                            <p>
                                <a href='#!' className='text-reset'>Categorías</a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>Más vendidos</a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>Ofertas</a>
                            </p>
                        </MDBCol>

                        {/* // CONTACTO */}
                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-gray-900 tracking-wide uppercase text-sm font-semibold mb-3 md:mb-4'>Contacto</h6>
                            {/* // CONTACTO - EDITA DATOS DE CONTACTO PARA CHILE */}
                            <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><MDBIcon color='secondary' icon='home' className='mt-0.5 me-2' /> Av. Providencia 1234, Santiago, Chile</p>
                            <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><MDBIcon color='secondary' icon='envelope' className='mt-0.5 me-3' /> ventas@runajoyas.cl</p>
                            <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><MDBIcon color='secondary' icon='phone' className='mt-0.5 me-3' /> +56 9 9876 5432</p>
                            <p className="text-gray-600 text-xs sm:text-sm flex items-start gap-2"><MDBIcon color='secondary' icon='clock' className='mt-0.5 me-3' /> Lun–Sáb 10:00–19:00</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2025 Pagina Desarrollada por NativeCode.cl
                <p>
                    <a href='https://nativecode.cl/' target='_blank' rel='noopener noreferrer' className='fw-bold text-reset'>Visita NativeCode.cl</a>
                </p>
                {/* // REDES SOCIALES - ICONOS DE RUNA JOYAS (EDITA LOS ENLACES SI ES NECESARIO) */}
                <div className='mt-3'>
                  <a href='https://www.instagram.com/runajoyas' target='_blank' rel='noopener noreferrer' className='me-4 text-reset'>
                    <MDBIcon fab icon='instagram' />
                  </a>
                  <a href='https://www.facebook.com/runajoyas' target='_blank' rel='noopener noreferrer' className='me-4 text-reset'>
                    <MDBIcon fab icon='facebook-f' />
                  </a>
                  <a href='https://www.tiktok.com/@runajoyas' target='_blank' rel='noopener noreferrer' className='text-reset'>
                    <MDBIcon fab icon='tiktok' />
                  </a>
                </div>
            </div>
        </MDBFooter>
    );
}