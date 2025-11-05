"use client"
import {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import ToasterClient from "@/Componentes/ToasterClient";

export default function GestionStock() {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const [nuevoStock, setNuevoStock] = useState({});

    async function actualizarStock(cantidadStock,id_producto) {
        try {
            const res = await fetch(`${API}/producto/actualizarStock`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                body: JSON.stringify({cantidadStock, id_producto}),
                mode: "cors"
            })
            if (!res.ok) {
                return toast.error("Error al Actualizar producto / Verifique que no hayan campos vacios");
            }else{
                const resultado = await res.json();
                if (resultado.message === "ok") {
                    await listarProductos();
                    return toast.success("Stock de producto actualizado con exito!");
                }
            }
        }catch(err) {
            console.log(err);
            return toast.error("Error al Actualizar producto / Contacte a soporte Informatico de NativeCode");

        }
    }








    const [productos, setProductos] = useState([])

    async function listarProductos() {
        try {
            const res = await fetch(`${API}/producto/seleccionarProducto`,{
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })
            if(!res.ok){
                return toast.error("No ha sido posible listar los productos para la edicion, contacte a soporte Informatico de NativeCode")
            }else {
                const dataProductos = await res.json();
                setProductos(dataProductos);
            }

        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarProductos();
    },[])




    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-slate-900 py-10">
        <ToasterClient/>
        <div className="mx-auto max-w-6xl px-4">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-800 to-sky-700">
                Gestión de Inventario
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Administra el stock de tus productos de forma clara y profesional.
            </p>
          </header>

          <div className="space-y-4">
            {productos.map((producto) => (
              <div
                key={producto.id_producto}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500">Producto</span>
                  <span className="text-base font-medium text-slate-800">
                    {producto.tituloProducto}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <span className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Stock: {producto.cantidadStock}
                  </span>

                  <input
                    min="0"
                    step="1"
                    type="number"
                    className="w-24 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none transition focus:border-slate-500"
                    value={nuevoStock[producto.id_producto] ?? ""}
                    onChange={(e) =>
                      setNuevoStock((objetoPrevio) => ({
                        ...objetoPrevio,
                        [producto.id_producto]: e.target.value,
                      }))
                    }
                  />

                  <button
                    onClick={() =>
                      actualizarStock(Number(nuevoStock[producto.id_producto] ?? 0), producto.id_producto)
                    }
                    type="button"
                    className="rounded-lg border border-slate-400 bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
