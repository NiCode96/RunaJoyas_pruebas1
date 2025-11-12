"use client"

import {useState, useEffect} from "react";
import ToasterClient from "@/Componentes/ToasterClient";
import {toast} from "react-hot-toast";



export default function CambiosDevoluciones() {

    const [titulos , settitulos] = useState([]);
    const [texto, setTexto] = useState([]);

    const API = process.env.NEXT_PUBLIC_API_URL

    async function llamarTitulo(){
        try {
            const res = await fetch(`${API}/titulo`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            });
            if (!res.ok){
                return toast.error("No se han podido cargar los datos del servidor contacte a soporte tecnico de NativeCode.cl")
            }

            const data = await res.json();

            let tituloSeleccionado = [];

            if(Array.isArray(data)){
                tituloSeleccionado = data.find(tituloBuscado => tituloBuscado.id_titulo === 8)
                return settitulos(tituloSeleccionado);

            }else{
                return toast.error("No se ha podido cargar los datos del servidor / Contacte a soporte Informatico de NativeCode.cl");
            }

        }catch(error){
            console.log(error);
            return toast.error(error.message);
        }
    }

    useEffect(() => {
        llamarTitulo()
    },[])




    async function llamarTexto(){
        try {
            const res = await fetch(`${API}/textos`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            });
            if (!res.ok){
                return toast.error("No se han podido cargar los datos del servidor contacte a soporte tecnico de NativeCode.cl")
            }

            const data = await res.json();
            let textoEspecifico = [];

            if(Array.isArray(data)){
                textoEspecifico = data.find(textoBuscado => textoBuscado.id_Textos === 7);
                return setTexto(textoEspecifico);
            }else{
                return toast.error("No se han podido cargar los datos de los textos , contacte a soporte de NativeCode.cl");
            }
        }catch(error){
            console.log(error);
            return toast.error(error.message);
        }
    }

    useEffect( () => {
        llamarTexto()
    },[])


    return (



        <div className="min-h-screen w-full relative bg-white">
            {/* Soft Dark Yellow Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at center, #ccb755 0%, transparent 70%)
      `,
                    opacity: 0.6,
                    mixBlendMode: "multiply",
                }}
            />
            <div className="mt-24 px-4 sm:px-6 md:px-10 lg:px-0 py-20 bg-gradient-to-b from-white to-gray-50 text-gray-800 font-sans">
                <ToasterClient />
                <div className="mx-auto max-w-4xl rounded-3xl bg-white/70 backdrop-blur-sm shadow-xl ring-1 ring-black/5 p-8 md:p-12 space-y-8">

                    {titulos && (
                        <h1
                            key={titulos.id_titulo}
                            className="text-4xl md:text-5xl font-extrabold text-center mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
                        >
                            {titulos.titulo}
                        </h1>
                    )}

                    {texto && (
                        <div
                            key={texto.id_Textos}
                            className="whitespace-pre-line text-justify text-[1.05rem] md:text-[1.2rem] leading-8 md:leading-9 font-normal tracking-normal text-gray-900/90 selection:bg-yellow-200 selection:text-gray-900"
                        >
                            {texto.contenido}
                        </div>
                    )}
                    <hr className="border-t border-gray-200/70 mt-4" />
                </div>
            </div>
        </div>
    )
}