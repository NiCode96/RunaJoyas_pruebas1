"use client"
import {useState, useEffect, createContext, useContext} from "react";

const CarritoContext = createContext(null);

export default function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);



    function agregarProductoCarrito(producto) {
        setCarrito((arrayProductosPrevios) => [...arrayProductosPrevios, producto]);

    }


    return(
<CarritoContext.Provider value={[carrito, setCarrito]}>
    {children}
</CarritoContext.Provider>
    )


}


export const useCarritoGlobal = () => {
    const contexto = useContext(CarritoContext);
    if (!contexto) {
        return console.log("No se puede usar el carriro verificar los compmponetes de context");
    } else {
        return contexto;
    }
}