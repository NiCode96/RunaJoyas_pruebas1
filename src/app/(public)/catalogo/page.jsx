 "use client"

import {useState, useEffect, Suspense} from 'react';
import MediaCard from "@/Componentes/MediaCard";
import Link from "next/link";
import{useSearchParams} from "next/navigation";
import { toast } from 'react-hot-toast';
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
 import MediaCardImage from "@/Componentes/MediaCardImage";
 import {BotonFlecha} from "@/Componentes/BotonFlecha";

export default function Catalogo() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Cargando catálogo…</div>}>
      <CatalogoInner />
    </Suspense>
  );
}

function CatalogoInner() {

    const buscar = useSearchParams();
    const id_CategoriaNavBar = buscar.get("categoria");
    const buscarOfertas = buscar.get("ofertas");
    const buscarRecientes = buscar.get("recientes");


    useEffect(() => {
        if(buscarRecientes){
            listarRecientes();
        }
    }, [buscarRecientes]);

    useEffect(() => {
        if(buscarOfertas){
            listarOfertas();
        }
    }, [buscarOfertas]);

    useEffect(() => {
        if(id_CategoriaNavBar){
            filtrarPorCategoria(id_CategoriaNavBar);
        }
    }, [id_CategoriaNavBar]) ;

    const[listaProductos, setListaProductos] = useState([]);
    const[publicaciones, setPublicaciones] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");


    const API = process.env.NEXT_PUBLIC_API_URL;

    //FUNCION PARA LISTAR TODOS LOS PRODUCTOS RECIENTES QUE NO TENGAN ELIMINACION LOGICA
    async function listarRecientes(){
        try {
            const res = await fetch(`${API}/producto/seleccionarProductoReciente`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                throw new Error('No fue posible cargar los productos');
            }
            const dataProductos = await res.json();
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.log(err);
        }
    }




    //FUNCION PARA FILTRAR PRODUCTOS SEGUN CATEGORIA
    async function filtrarPorCategoria(categoriaProducto){
   try {
       if(!categoriaProducto){
           return;
       }
       const res = await fetch(`${API}/producto/categoriaProducto`, {
           method: "POST",
           headers: {Accept: "application/json",
           "Content-Type": "application/json"},
           mode: "cors",
           body: JSON.stringify({categoriaProducto})
       })
       if (!res.ok){
          toast.error("Problema al filtrar categorías, contacte a Soporte de NativeCode.cl");
          return;
       }
       const dataFiltrada = await res.json();
       setListaProductos(dataFiltrada);
   }catch (error) {
       console.log(error);
   }
    }





    // FUNCION PARA SELECCIONAR LA LISTA COMPLETA DE CATEGORIAS DE PRODUCTOS
    async function seleccionarCategoriasCatalogo() {
        try {
            const res = await fetch(`${API}/categorias/seleccionarCategoria`, {
                method: "GET",
                headers: {Accept: "application/json"},
                cache: "no-store",
            })
            if(!res.ok) {
                console.error('No fue posible cargar la lista de categorias');
                setListaCategorias([]);
                return [];
            }
            const dataCategorias = await res.json();
            const listaCategorias = Array.isArray(dataCategorias) ? dataCategorias : [];
            setListaCategorias(listaCategorias);
            return listaCategorias;
        }catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        seleccionarCategoriasCatalogo();
    }, []);



    // FUNCION PARA LLAMAR A LOS PRODUCTOS EN OFERTA ESTADO NUMERO 3 estadoProducto en base de datos
    async function listarOfertas(){
        try {
            const res = await fetch(`${API}/producto/seleccionarOfertas`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                throw new Error('No fue posible cargar los productos');
            }
            const dataProductos = await res.json();
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.log(err);
        }
    }



//FUNCION PARA LISTAR TODOS LOS PRODUCTOS QUE NO TENGAN ELIMINACION LOGICA
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
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(!buscarOfertas && !id_CategoriaNavBar && !buscarRecientes){
            listarProductos();
        }
    }, [buscarOfertas, id_CategoriaNavBar, buscarRecientes]);


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

    async function ordenarMayorPrecio(){
        try {
            const res = await fetch(`${API}/producto/ordenarMayor`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })

            if(!res.ok) {
                return toast.error("Ha habido un problema con el filtro de precios; contacte soporte TI de NativeCode.")
             } else {
                const dataProductosMayorPrecio = await res.json();
                setListaProductos(dataProductosMayorPrecio);
            }
        }catch(err){
            console.log(err);
        }
    }

    async function ordenarMenorPrecio(){
        try {
            const res = await fetch(`${API}/producto/ordenarMenor`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })
            if(!res.ok) {
                return toast.error("Ha habido un problema con el filtro de precios; contacte soporte TI de NativeCode.");
             } else{
                const dataProductosMenorPrecio = await res.json();
                setListaProductos(dataProductosMenorPrecio);
            }
        }catch(err){
            console.log(err);
        }
    }


    const [carrito, setCarrito] = useCarritoGlobal();

    function anadirProducto(nuevoProducto) {
        if(!nuevoProducto) {
            return toast.error("Debe seleccionar almenos un producto para añadir al carrito");
        }else{
            setCarrito((carrito) => [...carrito, nuevoProducto]);
            return toast.success("Producto añadido al carrito de compras!");
        }
    }



    return (
        <>
            {/* Contenedor principal del catálogo: ancho máximo, centrado y espaciado vertical */}
            <div className="mt-15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
                {/* Encabezado del catálogo: título, subtítulo, breadcrumb y acciones visuales */}
                <header className="mb-8">



                    {/* Título principal llamativo y subtítulo descriptivo */}
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Descubre la Colección</h1>
                    <p className="mt-2 text-base md:text-lg text-gray-600">Piezas seleccionadas con diseño atemporal y acabados de alta calidad.</p>



                    {/* Barra de acciones (visual/mocks): etiquetas, orden y utilidades sin alterar lógica */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <div className="flex w-full lg:w-auto">
                        {/* ACCESIBILIDAD: ETIQUETA OCULTA PARA LECTOR DE PANTALLA */}
                        <span className="sr-only">Filtrar por categoría</span>
                        {/* CINTA DE CATEGORÍAS (RESPONSIVA): SCROLL HORIZONTAL EN MÓVIL */}


                        <div className="flex gap-2 overflow-x-auto py-2 pr-2">

                            <button
                                key={"key"}
                                type="button"
                                onClick={() => listarProductos()}
                                className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                            >
                                Ver Todos
                            </button>

                          {listaCategorias.map((categoria) => (
                            <button
                              key={categoria.id_categoriaProducto}
                              type="button"
                              onClick={() => filtrarPorCategoria(categoria.id_categoriaProducto)}
                              className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                            >
                              {categoria.descripcionCategoria}
                            </button>
                          ))}
                        </div>
                      </div>






                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-sm text-gray-500 hidden sm:inline">Ordenar:</span>
                            <button
                                onClick={() => ordenarMenorPrecio()}
                                className="text-sm px-3 py-1 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50">Precio Menor</button>
                            <button
                                onClick={() => ordenarMayorPrecio()}
                                className="text-sm px-3 py-1 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50">Precio Mayor</button>
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
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Tendecias</h3>
                        <p className="text-sm text-gray-500 mb-4">Lo mejor de la temporada</p>



                        {/* Tarjetas simples para cada publicación: borde sutil, sombra ligera y transición al hover */}
                        {publicaciones
                            .filter(publicacion => Number(publicacion.id_publicaciones) !== 10)
                            .map(publicacion => (
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
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                            {
                                listaProductos.map((producto, index) => {

                                    const id = producto.id_producto ?? index;
                       return (

                              <div key={producto.id_producto ?? index} className="flex flex-col h-auto">
                                  <Link
                                      href={`/producto/${id}`}
                                      className="no-underline hover:no-underline inline-block focus:outline-none focus:ring-0"
                                      style={{ textDecoration: 'none', WebkitTextDecoration: 'none' }}
                                  >
                                      <MediaCardImage
                                          imagenProducto={producto.imagenProducto}
                                          className="no-underline hover:no-underline"
                                      />
                                  </Link>
                                  {/*

                                  <div className="mt-1 flex flex-wrap items-center gap-2 md:flex-row">
                                      <button
                                          onClick={() => {anadirProducto(producto)}}
                                          className="p-2 flex items-center justify-center w-auto h-9 rounded-full bg-sky-200 hover:bg-sky-700 text-gray-700 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-300 hover:text-white"
                                          title="Añadir al carrito"
                                      >
                                          Comprar
                                      </button>

                                      <button            className="p-2 flex items-center justify-center w-auto h-9 rounded-full bg-sky-200 hover:bg-sky-700 text-gray-700 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-300 hover:text-white"
                                      >
                                          <ShoppingCartIcon className="w-5 h-5" />
                                      </button>
                                  </div>*/}



                                  <label >{producto.tituloProducto}</label>
                                  <p className="text-gray-500"> ${producto.valorProducto}</p>




                              </div>



                       )
                                })
                            }
                        </div>
                    </section>

                </div>
            </div>
        </>
    )

}