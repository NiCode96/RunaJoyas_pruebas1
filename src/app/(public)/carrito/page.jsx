"use client"
import {useState, useEffect} from "react";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";

export  default function Carrito() {

    const [carrito, setCarrito] = useCarritoGlobal();



    const productoCatidades = {};

    for (const productos of carrito) {
        if (productoCatidades[productos.id_producto]) {
            productoCatidades[productos.id_producto].cantidadVendida += 1;
        }else{
            productoCatidades[productos.id_producto]= {...productos, cantidadVendida: 1};
        }
    }

    const productosDelCarrito = Object.values(productoCatidades)



    return (
      <div className="mt-20 mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-3">Tu Carrito</h1>
        <ul className="divide-y divide-gray-200 rounded-xl bg-white shadow-md">

          {productosDelCarrito.map((producto) => (
            <li key={producto.id_producto} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{producto.tituloProducto}</h2>

                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100 shadow-sm">
                  Codigo Producto: #{producto.id_producto}
                </span>

              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
                <div>

                  <p className="text-gray-500">Unidades a Pagar</p>
                  <p className="font-medium text-gray-800">{producto.cantidadVendida}</p>
                </div>
                <div>
                  <p className="text-gray-500">Valor por Unidad</p>
                  <p className="font-medium text-gray-800">{producto.valorProducto}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-medium text-gray-800">{producto.cantidadVendida * producto.valorProducto}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

          <button
            className="mt-5 w-40 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-indigo-600 hover:to-blue-500"
          >
            Ir a Pagar
          </button>
      </div>
    )
}