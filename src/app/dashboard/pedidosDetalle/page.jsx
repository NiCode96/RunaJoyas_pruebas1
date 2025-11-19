'use client'
import {useSearchParams} from "next/navigation";
import ToasterClient from "@/Componentes/ToasterClient";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {ShadcnSelect} from "@/Componentes/shadcnSelect";
import formatearFecha from "@/FuncionesTranversales/funcionesTranversales.js"
import Link from "next/link";

export default function PedidoDetalle(){
    const searchParams = new useSearchParams();
    const id_pedido = searchParams.get("id");
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [detalleComprador, setDetalleComprador] = useState([]);
    const [nuevoestado, setnuevoEstado] = useState("");


    async function obtenerDetallesComprador(id_pedido){
        try {
            const res = await fetch(`${API}/pedidos/seleccionarPorid`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json",},
                body: JSON.stringify({ id_pedido }),
                mode: "cors"
            });

            if(!res.ok){
                return toast.error('Ha ocurrido un problema porfavor contacte a soporte de NativeCode');
            }else{

               const dataDetalles = await res.json();
               setDetalleComprador(dataDetalles);
            }
        }catch (error) {
            console.log(error);
            return toast.error('Ha ocurrido un problema porfavor contacte a soporte de NativeCode'  + error.message);

        }
    }

    useEffect(() => {
        obtenerDetallesComprador(id_pedido)
    }, [])



async function cambiarEstado(id_pedido, nuevoestado){
        if(!nuevoestado || !id_pedido){
            return toast.error("viene vacio un dato")
        }

        let estado_pedido;

        if(nuevoestado.includes("Pago Pendiente")){estado_pedido = "0";}
        else if(nuevoestado.includes("Pendiente")){estado_pedido = 1;}
        else if(nuevoestado.includes("Confirmado")){estado_pedido = 2;}
        else if(nuevoestado.includes("Completado")){estado_pedido = 3;}
        else if(nuevoestado.includes("Anulado")){estado_pedido = 4;}
        else{
            return toast.error("problema en los IF")
        }

    try {

        const res = await fetch(`${API}/pedidos/cambioEstado`, {
            method: "POST",
            headers: {Accept: "application/json",
            "Content-Type": "application/json",},
            mode: "cors",
            body: JSON.stringify({estado_pedido,id_pedido}),
        })

    if(!res.ok){
        return toast.error("PROBLEMA EN EN resok")
    }else {

        const respuestaDelController = await res.json();

        if(respuestaDelController.message === true){
            await obtenerDetallesComprador(id_pedido)
            return toast.success("Se ha actualizado el estado del Pedido!");
        }else {
            return toast.error("No se ha podido actualizar el estado del Pedido!, Contacte al Administrador del Sistema");
        }
    }
        }catch (error) {
            console.log(error);
            return toast.error('Ha ocurrido un problema porfavor contacte a soporte de NativeCode'  + error.message);
        }
}







    return (
    <div className="p-6 sm:p-10 bg-white min-h-screen">
        <ToasterClient />

        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-sky-700">Detalle del Pedido</h1>
<Link href={"/dashboard/pedidosCompras"}  >
    <ShadcnButton nombre={"Volver a Listado"} />

</Link>      </div>

        <div className="
    flex flex-col sm:flex-row
    items-stretch sm:items-center
    gap-4 sm:gap-6
    mt-5
">
            <ShadcnSelect
                nombreDefault={"Estados de Pedidos"}
                value1={"Pendiente"}
                value2={"Confirmado"}
                value3={"Pago Pendiente"}
                value4={"Completado"}
                value5={"Anulado"}
                onChange={(value) => setnuevoEstado(value)}   // 👈 acá solo value
            />

            <ShadcnButton funcion={()=>cambiarEstado(id_pedido, nuevoestado)} nombre={"Cambiar Estado"} />
        </div>

        {/*

        ESTADOS DE LOS PEDIDOS:
        --------------------------
         1: "Pendiente"
         2: "Confirmado"
         3: "Completado"
         4: "Anulado"
         0: pendiente pago

        */}

        {detalleComprador.map(comprador => (
            <div key={comprador.id_pedido} className="space-y-3 mt-10">
                <h3 className="text-sky-800 font-medium"><span className="text-sky-800 font-semibold">Estado Actual :   </span>
                    {(
                        {
                            1: "Pendiente",
                            2: "Confirmado",
                            3: "Completado",
                            4: "Anulado"})[comprador.estado_pedido] ?? "Pago Pendiente"}

                </h3>
            </div>


        ))}



        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-sky-50 border border-sky-100 rounded-xl p-8 shadow-sm">

            {detalleComprador.map(comprador => (
                <div key={comprador.id_pedido} className="space-y-3">
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Nombre</span>: {comprador.nombre_comprador}</h3>
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Apellido</span>: {comprador.apellidosComprador}</h3>
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Telefono</span>: {comprador.telefono_comprador}</h3>
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Email</span>: {comprador.email_Comprador}</h3>
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">RUT</span>: {comprador.identificacion_comprador}</h3>
                </div>
            ))}

            {detalleComprador.map(comprador => (
                <div key={comprador.id_pedido} className="space-y-3">
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Fecha Pedido</span>: {formatearFecha(comprador.fecha_pedido)}</h3>
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Dirección</span>: {comprador.direccion_despacho}</h3>
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Comuna</span>: {comprador.comuna}</h3>
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Región / País</span>: {comprador.regionPais}</h3>
                    <h3 className="text-sky-800 font-medium"><span className="text-sky-500 font-semibold">Comentarios</span>: {comprador.comentarios || "Sin comentarios"}</h3>
                </div>
            ))}

        </div>
    </div>
); }