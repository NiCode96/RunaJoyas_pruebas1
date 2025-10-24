'use client'
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import Carrusel from "@/Componentes/Carrusel";

export default function ProductoDetalle() {

    //USE STATE PARA ALMACENAR EL OBJETO SELECCIONADO CON USESTATE
    const [producto, setProducto] = useState({});

    // UI: cantidad seleccionada para el carrito (solo estado local de interfaz)
    const [cantidad, setCantidad] = useState(1);
    const incrementar = () => setCantidad((prev) => Math.min(prev + 1, 99));
    const decrementar = () => setCantidad((prev) => Math.max(prev - 1, 1));

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

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex items-start justify-center bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm ring-1 ring-slate-200">
            {producto && (
<Carrusel
    imagen1={producto.imagenProducto}
    imagen2={producto.imagenProductoSegunda ?? producto.imagenProducto}
    imagen3={producto.imagenProductoTercera ?? producto.imagenProducto}
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

                {/* PRECIO */}
                <div className="flex items-baseline gap-3">
                  <span className="text-sm uppercase tracking-wider text-slate-500">Valor</span>
                  <label className="text-2xl md:text-3xl font-bold text-blue-600">
                    {producto.valorProducto}
                  </label>
                </div>

                {/* DESCRIPCIÓN */}
                <p className="text-slate-600 leading-relaxed">
                  {producto.descripcionProducto}
                </p>

                {/* SEPARADOR SUTIL */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* SELECTOR DE CANTIDAD */}
                <div className="space-y-3">
                  <h2 className="text-sm font-medium tracking-wide text-slate-700">Cantidad</h2>
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={decrementar}
                        aria-label="Disminuir"
                        className="w-10 h-10 grid place-items-center text-base rounded-l-full hover:bg-slate-50 active:scale-[0.98] transition"
                      >
                        −
                      </button>
                      <span className="min-w-12 text-center text-sm font-medium text-slate-900 select-none">
                        {cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={incrementar}
                        aria-label="Aumentar"
                        className="w-10 h-10 grid place-items-center text-base rounded-r-full hover:bg-slate-50 active:scale-[0.98] transition"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-slate-500">Selecciona cuántas unidades quieres</span>
                  </div>
                </div>

                {/* ACCIONES */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-600/20 ring-1 ring-emerald-700/20 transition"
                  >
                    Añadir al carrito
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-950 active:bg-black shadow-lg shadow-slate-900/20 ring-1 ring-black/10 transition"
                  >
                    Comprar ahora
                  </button>
                </div>

                {/* BENEFICIOS / SELLOS DE CONFIANZA */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="rounded-xl border border-slate-200 p-4 bg-white/60 backdrop-blur">
                    <p className="text-sm font-medium text-slate-900">Despacho rápido</p>
                    <p className="text-xs text-slate-500">A todo Chile</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4 bg-white/60 backdrop-blur">
                    <p className="text-sm font-medium text-slate-900">Pago seguro</p>
                    <p className="text-xs text-slate-500">Tarjetas y transferencias</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4 bg-white/60 backdrop-blur">
                    <p className="text-sm font-medium text-slate-900">Garantía</p>
                    <p className="text-xs text-slate-500">Cambios y devoluciones</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )

}