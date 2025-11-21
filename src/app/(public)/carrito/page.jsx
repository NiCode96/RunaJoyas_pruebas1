"use client"
import {useState, useEffect} from "react";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {useObjetosPagosGlobales} from "@/ContextosGlobales/ObjetoPagarContext";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {ShadcnButton} from "@/Componentes/shadcnButton";


export  default function Carrito() {

    const [carrito, setCarrito] = useCarritoGlobal();
    const [objetoDePago, setObjetoDePago] = useObjetosPagosGlobales();
    const [nuevaCantidad,setNuevaCantidad] = useState(0);
    const [idSeleccionado, setIdSeleccionado] = useState(null);




    const productoCatidades = {};
    let  totalPago = 0;

    for (const productos of carrito) {
        if (productoCatidades[productos.id_producto]) {
            productoCatidades[productos.id_producto].cantidadVendida += 1;
        }else{
            productoCatidades[productos.id_producto]= {...productos, cantidadVendida: 1};
        }
    }

    const productosDelCarrito = Object.values(productoCatidades)

    useEffect(() => {
      if (
        productosDelCarrito.length > 0 &&
        (idSeleccionado === null ||
          !productosDelCarrito.some(p => p.id_producto === idSeleccionado))
      ) {
        setIdSeleccionado(productosDelCarrito[0].id_producto);
      }
    }, [productosDelCarrito]);

    for (const producto of productosDelCarrito) {
        totalPago += (producto.valorProducto * producto.cantidadVendida);
    }



function actualizarValorUnidades(id_producto) {
    try {
        if (!id_producto) {
            toast.error("Debe Seleccionar el objeto que desea modificar la cantidad para ser comprado.")
        } else {
          const idNum = Number(id_producto);
          if (!Number.isFinite(idNum)) {
            return toast.error("ID de producto inválido");
          }
          if (nuevaCantidad < 0) {
            return toast.error("La cantidad no puede ser negativa");
          }

          // Buscar un ejemplar base del producto en el carrito o en el listado agregado
          const productoBase = carrito.find(p => p.id_producto === idNum) || productosDelCarrito.find(p => p.id_producto === idNum);
          if (!productoBase) {
            return toast.error("No se ha encontrado el producto seleccionado");
          }

          // 1) Quitamos todas las ocurrencias del producto del carrito actual
          const carritoSinProducto = carrito.filter(p => p.id_producto !== idNum);

          // 2) Agregamos 'nuevaCantidad' copias del producto (tu modelo usa copias para contar unidades)
          const nuevoCarrito = [...carritoSinProducto];
          for (let i = 0; i < Number(nuevaCantidad); i++) {
            nuevoCarrito.push({ ...productoBase });
          }

          setCarrito(nuevoCarrito);
          return toast.success("Cantidad actualizada correctamente");
        }
    } catch(err) {
        console.log(err);
        return toast.error("Ha ocurrido un problema : " + err.message);
    }
}


    return (
      <div className="mt-20 mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-3">Tu Carrito</h1>
        <ul className="divide-y divide-gray-200 rounded-xl bg-white shadow-md">

            <div className="ml-5 sm:col-span-2">
                <p className="text-gray-500">Modificar Cantidad</p>

       <select
         className="p-2 w-70 md:w-100 border-2 border-blue-600 rounded-lg"
         value={idSeleccionado ?? ''}
         onChange={(e) => setIdSeleccionado(Number(e.target.value))}
       >
           {productosDelCarrito.map((producto) => (
               <option key={producto.id_producto} value={producto.id_producto}>{producto.tituloProducto}</option>
           ))}
       </select>
                <br/><br/>



                <input type={"number"}
                       min={0}
                       max={10}
                       step={1}
                       value={nuevaCantidad}
                       onChange={(event) => setNuevaCantidad(Number(event.target.value))}
                       className="w-20 border-2 border-blue-600 rounded-lg p-2"/>


                <button
                  onClick={() => actualizarValorUnidades(idSeleccionado)}
                  className="ml-3 mt-3 w-full sm:w-auto px-4 py-2 text-sm sm:text-base font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-all duration-300 active:scale-95"
                >
                  Actualizar
                </button>
            </div>

            <br/><br/>


          {productosDelCarrito.map((producto) => (
            <li key={producto.id_producto} className="p-5  transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-lg font-semibold text-gray-800">{producto.tituloProducto}</h5>


                  <div>

                      <img
                          className="rounded-2"
                          src={producto.imagenProducto} alt={"Imagen Producto"} width={100} height={100}/>
                      <br/>




                  </div>

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

          <label>Total a Pagar :</label>
          <h1>$ {totalPago}</h1>

<Link href="/formularioPago">
    <button
        className="mt-5 w-40 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-indigo-600 hover:to-blue-500"
    >
        Ir a Pagar
    </button>
</Link>
      </div>
    )
}