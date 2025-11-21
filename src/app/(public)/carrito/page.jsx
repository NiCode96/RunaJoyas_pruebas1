"use client"
import {useState, useEffect} from "react";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {useObjetosPagosGlobales} from "@/ContextosGlobales/ObjetoPagarContext";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {
    ButtonGroup,
    // ButtonGroupSeparator,
    // ButtonGroupText,
} from "@/components/ui/button-group"

import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"




export default function Carrito() {

    const [carrito, setCarrito] = useCarritoGlobal();
    const [_objetoDePago, _setObjetoDePago] = useObjetosPagosGlobales();
    const [_nuevaCantidad, _setNuevaCantidad] = useState(0);
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);


    const productoCatidades = {};
    let totalPago = 0;

    for (const productos of carrito) {
        if (productoCatidades[productos.id_producto]) {
            productoCatidades[productos.id_producto].cantidadVendida += 1;
        } else {
            productoCatidades[productos.id_producto] = {...productos, cantidadVendida: 1};
        }
    }

    const productosDelCarrito = Object.values(productoCatidades)

    useEffect(() => {
        // Solo ejecutar esta lógica después del montaje para evitar mismatch SSR/cliente
        if (!isMounted) return;
        if (
            productosDelCarrito.length > 0 &&
            (idSeleccionado === null ||
                !productosDelCarrito.some(p => p.id_producto === idSeleccionado))
        ) {
            setIdSeleccionado(productosDelCarrito[0].id_producto);
        }
    }, [productosDelCarrito, isMounted]);

    for (const producto of productosDelCarrito) {
        totalPago += (producto.valorProducto * producto.cantidadVendida);
    }


    function quitarDelCarrito(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para quitarlo del carrito!');
            } else {
                const nuevoCarrito = carrito.filter(producto => {
                    return producto.id_producto !== id_producto
                });
                setCarrito(nuevoCarrito);
            }

        } catch (e) {
            return toast.error("No se puede eliminar el producto del carrito. Pruebe mas tarde");
        }
    }



    function aumentarCantidad(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para poder aumentar su cantidad.');
            } else {

                const productoAumentar = carrito.find(producto => producto.id_producto === id_producto);
                if (!productoAumentar) {
                    return toast.error("No se ha encontrado el producto que se quiere aumentar");
                }else{
                    setCarrito([...carrito, {...productoAumentar}]);
                }

            }
        } catch (e) {
            console.log(e);
            return toast.error("No se puede aumentar la cantidad. Si necesita mas cantidad contacte a la tienda.");
        }

    }



    function disminuirCantidad(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para poder bajar su cantidad.');
            } else {
                const productoEliminar = carrito.findIndex(producto => producto.id_producto === id_producto);
                if (productoEliminar === -1) {
                    return toast.error("No se ha encontrado el producto que se quiere aumentar");
                }else{
                    const nuevoCarritoConProductoEliminado = [...carrito];
                    nuevoCarritoConProductoEliminado.splice(productoEliminar, 1);
                    setCarrito(nuevoCarritoConProductoEliminado);
                }
            }
        } catch (e) {
            console.log(e);
            return toast.error("No se puede aumentar la cantidad. Si necesita mas cantidad contacte a la tienda.");
        }

    }


    return (
        <div className="mt-20">
            <div className="p-15">

                <h1 className="text-blue-800 text-4xl font-bold">Carrito de Compras</h1>

                <Table className="w-full mt-8  rounded-xl overflow-hidden shadow-sm bg-white">
                    <TableCaption></TableCaption>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="text-gray-700">
                            <TableHead
                                className="px-4 py-3 text-left font-semibold text-sm text-gray-700 border-b">Producto</TableHead>
                            <TableHead
                                className="px-4 py-3 text-left font-semibold text-sm text-gray-700 border-b">Referencia</TableHead>
                            <TableHead
                                className="px-4 py-3 text-left font-semibold text-sm text-gray-700 border-b">Unidades</TableHead>
                            <TableHead
                                className="px-4 py-3 text-left font-semibold text-sm text-gray-700 border-b">Aumentar/Disminuir</TableHead>
                            <TableHead className="px-4 py-3 text-left font-semibold text-sm text-gray-700 border-b">Valor
                                Unidad</TableHead>
                            <TableHead
                                className="px-4 py-3 text-left font-semibold text-sm text-gray-700 border-b">SubTotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isMounted && productosDelCarrito.map((producto) => (
                            <TableRow key={producto.id_producto} className="hover:bg-gray-50 transition-colors">
                                <TableCell
                                    className="px-4 py-4 text-sm text-gray-800 align-middle border-b font-medium">
                                    <span className="text-blue-700">{producto.tituloProducto}</span>
                                    <span className="mt-3 block"><ShadcnButton
                                        funcion={() => quitarDelCarrito(producto.id_producto)}
                                        nombre={"Eliminar"}/></span>
                                </TableCell>
                                <TableCell className="px-4 py-4 text-sm text-gray-800 align-middle border-b"><img
                                    src={producto.imagenProducto} alt={"Imagen Producto"} width={100}
                                    height={100}/></TableCell>
                                <TableCell
                                    className="px-4 py-4 text-sm text-gray-800 align-middle border-b">{producto.cantidadVendida}</TableCell>
                                <TableCell className="px-4 py-4 text-sm text-gray-800 align-middle border-b">

                                    <ButtonGroup aria-label="Acciones">
                                        <Button onClick={()=>disminuirCantidad(producto.id_producto)} variant="outline">-</Button>
                                        <Button onClick={()=>aumentarCantidad(producto.id_producto)} variant="outline">+</Button>
                                    </ButtonGroup>

                                </TableCell>
                                <TableCell
                                    className="px-4 py-4 text-sm text-gray-800 align-middle border-b">{producto.valorProducto}</TableCell>
                                <TableCell
                                    className="px-4 py-4 text-sm text-gray-800 align-middle border-b text-right">{producto.cantidadVendida * producto.valorProducto}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="bg-gray-100 w-full font-semibold">
                            <TableCell className="px-4 py-3 w-full text-left text-gray-700"
                                       colSpan={3}>Total</TableCell>
                            <TableCell className="px-4 py-3 text-right text-blue-700">$ {isMounted ? totalPago : 0}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>


                <Link href="/formularioPago">
                    <button
                        className="p-2 w-44 rounded-xl font-semibold
bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600
text-white shadow-md transition-all duration-300
hover:scale-105 hover:shadow-xl
hover:from-blue-600 hover:via-amber-blue hover:to-blue-800"
                    >
                        Ir a Pagar
                    </button>
                </Link>
            </div>
        </div>
    )
}