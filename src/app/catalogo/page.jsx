"use client"

import {useState, useEffect} from 'react';
import MediaCard from "@/Componentes/MediaCard";

export default function Catalogo() {

    const[listaProductos, setListaProductos] = useState([]);
    const[publicaciones, setPublicaciones] = useState([]);


    const API = process.env.NEXT_PUBLIC_API_URL;

    async function listarProductos(){
        try {
            const res = await fetch(`${API}/producto/seleccionarProducto`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                throw new Error('No fue posible cargar los productos');
            }
            const dataProductos = await res.json();
            setListaProductos(dataProductos);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        listarProductos();
    }, [])


    async function publicacionesLaterales() {
        try {
            const res = await fetch(`${API}/publicaciones/seleccionarPublicaciones`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })

            if(!res.ok) {
                console.error("No se han podido Listar Publicaciones / Falla en el fetch desde el frontEnd");
                setPublicaciones([])
                return[]
            }else {
                const publicaciones = await res.json();
                setPublicaciones(publicaciones);
                return publicaciones;
            }
        }catch(err) {
            console.error("Problema al consultar Backen desde la vista fronend:"+err);
        }
    }


    useEffect(() => {
        publicacionesLaterales();
    }, []);



    return (
        <>
            {/* Contenedor principal del catálogo: ancho máximo, centrado y espaciado vertical */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
                {/* Encabezado del catálogo: título, subtítulo, breadcrumb y acciones visuales */}
                <header className="mb-8">

                    {/* Breadcrumb minimal para orientación del usuario */}
                    <nav className="text-sm text-gray-500 mb-3" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2">
                            <li><a className="hover:text-gray-700" href="#">Inicio</a></li>
                            <li className="text-gray-300">/</li>
                            <li className="text-gray-900 font-medium">Catálogo</li>
                        </ol>
                    </nav>

                    {/* Título principal llamativo y subtítulo descriptivo */}
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Descubre la Colección</h1>
                    <p className="mt-2 text-base md:text-lg text-gray-600">Piezas seleccionadas con diseño atemporal y acabados de alta calidad.</p>



                    {/* Barra de acciones (visual/mocks): etiquetas, orden y utilidades sin alterar lógica */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">Anillos</span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">Collares</span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">Aros</span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">Pulseras</span>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-sm text-gray-500 hidden sm:inline">Ordenar:</span>
                            <button className="text-sm px-3 py-1 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50">Destacados</button>
                            <button className="text-sm px-3 py-1 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50">Nuevos</button>
                            <button className="text-sm px-3 py-1 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50">Precio</button>
                        </div>
                    </div>
                </header>

                {/* Separador sutil entre encabezado y contenido */}
                <hr className="my-6 border-gray-100" />

                {/* Layout responsivo con separación: 1 columna en móviles, 5 en escritorio (sidebar + grilla) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Sidebar de publicaciones/banners: se mantiene fijo en viewport alto, sin alterar la lógica */}
                    <aside className="hidden md:block order-2 lg:order-1 lg:col-span-1 space-y-4 sticky top-24 self-start">
                        {/* Título del sidebar para dar contexto visual */}
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Inspiración</h3>
                        <p className="text-sm text-gray-500 mb-4">Tendencias y campañas</p>
                        {/* Tarjetas simples para cada publicación: borde sutil, sombra ligera y transición al hover */}
                        {publicaciones.map(publicacion => (
                            <div key={publicacion.id_publicaciones} className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                                <img
                                    src={publicacion.imagenPublicaciones_primera}
                                    className="w-full aspect-[3/4] object-cover"
                                    alt="Publicación"
                                />
                            </div>
                        ))}
                    </aside>

                    {/* Sección principal con la grilla de productos */}
                    <section className="order-1 lg:order-2 lg:col-span-4">
                        {/* Encabezado de la sección de productos con contador visual (sin alterar lógica) */}
                        <div className="flex items-baseline justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
                            <span className="text-sm text-gray-500">{listaProductos?.length ?? 0} resultados</span>
                        </div>
                        {/* Grilla de tarjetas de producto: columnas adaptativas y buen espacio entre elementos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                            {
                                listaProductos.map((producto) => (
                                    <MediaCard
                                        // Props con ambos nombres por compatibilidad (sin cambios en la lógica)
                                        titulo={producto.tituloProducto}
                                        descripcion={producto.descripcionProducto}
                                        valor={producto.valorProducto}
                                        imagenProducto={producto.imagenProducto}
                                    />
                                ))
                            }
                        </div>
                    </section>

                </div>
            </div>
        </>
    )

}