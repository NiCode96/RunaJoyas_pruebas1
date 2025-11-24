"use client"

import {useState, useEffect, Suspense} from 'react';
import Link from "next/link";
import{useSearchParams} from "next/navigation";
import { toast } from 'react-hot-toast';
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import MediaCardImage from "@/Componentes/MediaCardImage";
import { motion } from "motion/react";
import {useRouter} from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function Catalogo() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Cargando catálogo…</div>}>
      <CatalogoInnerWrapper />
    </Suspense>
  );
}

// 🔹 FIX DEFINITIVO: Wrapper que fuerza re-mount cuando cambian los search params
// Esto resuelve el bug de página en blanco al navegar desde otras rutas (ej: /carrito → /catalogo?categoria=13)
// La key única garantiza que React destruya y re-cree el componente completo cuando cambien los params
function CatalogoInnerWrapper() {
  const searchParams = useSearchParams();

  // Crear key único que incluya todos los parámetros relevantes
  // Esto fuerza un re-mount completo del componente cuando cambian
  const categoria = searchParams.get("categoria");
  const ofertas = searchParams.get("ofertas");
  const recientes = searchParams.get("recientes");

  // Key dinámico que cambia cuando cualquier parámetro cambia
  const key = `${categoria || 'sin-cat'}-${ofertas || 'sin-of'}-${recientes || 'sin-rec'}`;

  return <CatalogoInner key={key} />;
}

function CatalogoInner() {


    const buscar = useSearchParams();
    const id_CategoriaNavBar = buscar.get("categoria");
    const buscarOfertas = buscar.get("ofertas");
    const buscarRecientes = buscar.get("recientes");
    const[listaProductos, setListaProductos] = useState([]);
    const[publicaciones, setPublicaciones] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const router = useRouter();
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [carrito, setCarrito] = useCarritoGlobal();

    // 🔹 FIX: Lógica movida dentro del useEffect para evitar closures obsoletos
    useEffect(() => {
        if (buscarRecientes) {
            (async () => {
                try {
                    const res = await fetch(`${API}/producto/seleccionarProductoReciente`, {
                        method: 'GET',
                        headers: { Accept: 'application/json' },
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
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [buscarRecientes, API]);

    // 🔹 FIX: Lógica movida dentro del useEffect para evitar closures obsoletos
    useEffect(() => {
        if (buscarOfertas) {
            (async () => {
                try {
                    const res = await fetch(`${API}/producto/seleccionarOfertas`, {
                        method: 'GET',
                        headers: { Accept: 'application/json' },
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
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [buscarOfertas, API]);

    // 🔹 FIX: Lógica movida dentro del useEffect para evitar closures obsoletos - CRÍTICO para navegación desde otras rutas
    useEffect(() => {
        if (id_CategoriaNavBar) {
            (async () => {
                try {
                    const res = await fetch(`${API}/producto/categoriaProducto`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        mode: "cors",
                        body: JSON.stringify({ categoriaProducto: id_CategoriaNavBar })
                    });
                    if (!res.ok) {
                        toast.error("Problema al filtrar categorías, contacte a Soporte de NativeCode.cl");
                        return;
                    }
                    const dataFiltrada = await res.json();
                    const productosArray = Array.isArray(dataFiltrada) ? dataFiltrada : [];
                    setListaProductos(productosArray);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [id_CategoriaNavBar, API]);


    function agregarAlCarrito(productoSeleccionado) {
        setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
        toast.success("Producto Seleccionado!")
    }

    function comparAhora(productoSeleccionado) {
        try {
            if (!productoSeleccionado) {
                return toast.error("Debe haber seleccionado el producto para poder realziar la compra inmediata");
            }else{
                agregarAlCarrito(productoSeleccionado);
                router.push("/carrito");

            }

        }catch(err) {
            console.log(err)
            return toast.error("No se puede comprar este Articulo por problemas tecnicos. Contacte al vendedor para concretar la venta.")
        }

    }






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
       let productosArray = [];

       if(Array.isArray(dataFiltrada)){
           productosArray = dataFiltrada
       }else {
           productosArray = []
       }
       setListaProductos(productosArray);
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
    // 🔹 FIX: Lógica movida dentro del useEffect para evitar closures obsoletos - caso por defecto (sin filtros)
    useEffect(() => {
        if (!buscarOfertas && !id_CategoriaNavBar && !buscarRecientes) {
            (async () => {
                try {
                    const res = await fetch(`${API}/producto/seleccionarProductoReciente`, {
                        method: 'GET',
                        headers: { Accept: 'application/json' },
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
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [buscarOfertas, id_CategoriaNavBar, buscarRecientes, API]);


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


                            <Select onValueChange={(value) =>{
                                if(value === "menor"){
                                    ordenarMenorPrecio()
                                }else if(value === "mayor"){
                                   ordenarMayorPrecio()
                                }else if(value === "reciente"){
                                    listarRecientes()
                                }else if(value === "antiguo"){
                                    listarProductos()
                                }
                            }}>
                                <SelectTrigger className="w-80">
                                    <SelectValue  placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="menor">Precio, menor a mayor</SelectItem>
                                    <SelectItem value="mayor">Precio, mayor a menor</SelectItem>
                                    <SelectItem value="reciente">Fecha: reciente a antiguo(a)</SelectItem>
                                    <SelectItem value="antiguo">Fecha: antiguo(a) a reciente</SelectItem>
                                </SelectContent>
                            </Select>


                        </div>
                    </div>
                </header>

                {/* Separador sutil entre encabezado y contenido */}
                <hr className="my-6 border-gray-100" />

                {/* Layout responsivo con separación: 1 columna en móviles, 5 en escritorio (sidebar + grilla) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Sidebar de publicaciones/banners: se mantiene fijo en viewport alto, sin alterar la lógica */}
                    <aside className="order-first hidden md:block  lg:col-span-1 space-y-4 sticky top-24 self-start">
                        {/* Título del sidebar para dar contexto visual */}
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Tendencias</h3>
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




                           <motion.div
                               key={id}
                               layout                      // 🔹 anima cambios de posición/tamaño
                               layoutId={`producto-${id}`} // 🔹 útil si luego quieres "shared layout" con la página de detalle
                               transition={{ layout: { duration: 0.35, ease: "easeOut" } }}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               whileHover={{ scale: 1.03 }}
                               className="flex flex-col h-full min-w-0 min-h-0 overflow-hidden break-words max-w-full"
                           >


                               <div className="flex flex-col h-full min-w-0 min-h-0 overflow-hidden break-words max-w-full">
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

                                   {/* Título estilo catálogo, mayúsculas y con tracking amplio */}
         <h3 className="mt-1 mb-0 text-gray-900 " style={{fontSize: '15px'}}>
                  {producto.tituloProducto}
               </h3>

               {/* Precio más marcado */}
               <p className="mt-0 text-gray-500 text-[16px] ">
                   ${producto.valorProducto}
               </p>
                               </div>

                               <div className=" flex justify-center">
                                   <button
                                       onClick={() => {agregarAlCarrito(producto)}}
                                       className="
      w-full
     p-2
      px-4
      bg-white
      border border-amber-900
      text-amber-900
      text-sm sm:text-base
      font-medium
      uppercase
      tracking-[0.20em]
      flex items-center justify-center
      transition-all duration-300 ease-in-out
      hover:border-4
      focus:outline-none focus-visible:ring-2  focus-visible:ring-amber-900/40
      hidden md:block
    "
                                       title="Añadir al carrito"
                                   >
                                       Añadir al carrito
                                   </button>





                                   <button
                                       onClick={() => {agregarAlCarrito(producto)}}
                                       className="
      w-full
     p-2
      px-4
      bg-white
      border border-amber-900
      text-amber-900

      font-medium
      uppercase
      tracking-[0.20em]
      flex items-center justify-center
      transition-all duration-300 ease-in-out
      hover:border-4
      focus:outline-none focus-visible:ring-2  focus-visible:ring-amber-900/40
      md:hidden
    "
                                       style={{fontSize: '12px'}}
                                       title="Añadir al carrito"
                                   >
                                       Añadir  <ShoppingCartIcon className="h-5 w-5"/>
                                   </button>
                               </div>

                           </motion.div>



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