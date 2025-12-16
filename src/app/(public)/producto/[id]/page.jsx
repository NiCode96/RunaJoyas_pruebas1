'use client'
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import Carrusel from "@/Componentes/Carrusel";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {toast} from "react-hot-toast";
import Link from "next/link";
import {useRouter} from "next/navigation";


export default function ProductoDetalle() {


    //USO DE CARRITO GLOBAL DE CONTEXT PARA EL USO EN TODA LA APLICACION DE ARRAY DE OBJETOS GLOBALES
    const [carrito, setCarrito] = useCarritoGlobal();
    const router = useRouter();

    function agregarAlCarrito(productoSeleccionado) {
       setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
        toast.success("Producto añadido al carrito de compras!")
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


    //USE STATE PARA ALMACENAR EL OBJETO SELECCIONADO CON USESTATE
    const [producto, setProducto] = useState({});

    //SE USA EL PARAM DE USEPARAMS NAVEGATE DE NBEXT PARA SUAR EL ID
    const params = useParams();
    const id_producto = params?.id;

    // CONSTANTE API QUE APUNTA AL SERVIDOR BACKEND PARA CONECTAR CON LOS ENDPOINDS EN VIEWS
    const API = process.env.NEXT_PUBLIC_API_URL;



    //FUNCION PARA LLAMAR AL OBJETO ESPECIFICO POR ID
    async function seleccionarProductoPorID(id_producto) {
        try {
            const res = await fetch(`${API}/producto/${id_producto}`, {
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                return alert("No se ha podido renderizar el producto seleccionado, porfavor conatcte a soporte TI de NativeCode.cl")
            }else {
                const dataSeleccion = await res.json();
                setProducto(dataSeleccion);
            }
        }catch (error) {
            console.log(error);
        }
    }

useEffect(() => {
    seleccionarProductoPorID(id_producto);
}, [id_producto]);





    let booleanSinStock = false

    if (producto.cantidadStock < 1){
        booleanSinStock = true;
    }

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex items-start justify-center bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm ring-1 ring-slate-200 relative">
            {producto && (
<Carrusel
    key={producto.id_producto}
    imagen1={producto.imagenProducto}
    imagen2={producto.imagenProductoSegunda ?? producto.imagenProducto}
    imagen3={producto.imagenProductoTercera ?? producto.imagenProducto}
    imagen4={producto.imagenProductoCuarta ?? producto.imagenProducto}
></Carrusel>
            )}
          </div>

          <div className="space-y-6">
            {producto && (
              <>
                {/* TÍTULO DEL PRODUCTO */}
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                  {producto.tituloProducto}
                </h1>

         <div className="flex ">
             <label className="font-bold">Cantidad en Stock:</label>
             <p className="ml-2  font-bold">{producto.cantidadStock}</p>
         </div>

                {/* PRECIO */}
                <div className="flex items-baseline gap-3">
                  <span className="text-sm uppercase tracking-wider text-slate-500">Valor</span>
                  <label className="text-2xl md:text-3xl font-bold text-blue-600">
                   $ {producto.valorProducto}
                  </label>
                </div>

      {/* DESCRIPCIÓN */}
            <p className="text-slate-600 leading-relaxed whitespace-pre-line break-words">
              {producto.descripcionProducto}
            </p>


                {/* SEPARADOR SUTIL */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />



                {/* ACCIONES */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">



                <button
                    type="button"
                    disabled={booleanSinStock}
                    onClick={() => agregarAlCarrito(producto)}
                    className="
    inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white
    bg-blue-600 hover:bg-blue-700 active:bg-blue-800
    shadow-lg shadow-blue-600/20 ring-1 ring-emerald-700/20 transition
    disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:active:bg-gray-500
"
                  >
                    Añadir Unidad al carrito
                  </button>


                        <button
                            onClick={() => comparAhora(producto)}

                            type="button"
                            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-950 active:bg-black shadow-lg shadow-slate-900/20 ring-1 ring-black/10 transition"
                        >
                            Comprar
                        </button>


                </div>



                  {/* SELLOS DE CONFIANZA */}
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-md">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 mb-5">
                          Compra protegida y segura
                      </p>


                      {/*PANTALLAS DE CELULARES SELLOS DE CONFIANZA*/}

                      <div className="block md:hidden" >
                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 -mt-25">

                              {/* Seguridad */}
                              <div className="space-y-2 mt-25">
                                  <p className="text-sm font-semibold text-slate-900">
                                      Pago seguro garantizado
                                  </p>
                                  <li className="text-xs text-slate-500 leading-relaxed ml-8">Pago inmediato</li>
                                  <li className="text-xs text-slate-500 leading-relaxed ml-8">Crédito, débito, cuotas y saldo Mercado Pago</li>
                                  <li className="text-xs text-slate-500 leading-relaxed ml-8">Seguridad garantizada</li>
                                  <li className="text-xs text-slate-500 leading-relaxed ml-8">Comprobante automático</li>


                              </div>



                              {/* Atención */}
                              <div >
                                  <img
                                      src="/Mercado_Pago.png"
                                      alt="Mercado Pago"
                                      className="h-50 w-auto object-contain -mt-10"
                                  />
                              </div>

                          </div>
                      </div>





                      {/*PANTALLAS DE ESCRITORIO SELLOS DE CONFIANZA*/}
                      <div className="hidden md:block mt-10" >

                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 -mt-30">

                              {/* Seguridad */}
                              <div className="space-y-1 mt-25">
                                  <p className="text-sm font-semibold text-slate-900">
                                      Pago seguro garantizado
                                  </p>
                                  <li className="text-xs text-slate-500 leading-relaxed ml-8">Pago inmediato</li>
                                  <li className="text-xs text-slate-500 leading-relaxed ml-8">Crédito, débito, cuotas y saldo Mercado Pago</li>
                                  <li className="text-xs text-slate-500 leading-relaxed ml-8">Seguridad garantizada</li>
                                  <li className="text-xs text-slate-500 leading-relaxed ml-8">Comprobante automático</li>


                              </div>



                              {/* Atención */}
                              <div >
                                  <img
                                      src="/Mercado_Pago.png"
                                      alt="Mercado Pago"
                                      className="h-50 w-auto object-contain mt-30"
                                  />
                              </div>

                          </div>
                      </div>


                  </div>
              </>
            )}
          </div>
        </div>
      </div>
    )

}