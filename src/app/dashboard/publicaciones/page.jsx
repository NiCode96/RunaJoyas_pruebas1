"use client"

import React, { useState, useEffect } from "react";

export default function Publicaciones() {
    const [file, setfile] = useState([]);
    const [url, setUrl] = useState([]);



    const [descripcionPublicaciones, setDescripcionPublicaciones] = useState("");
    const [imagenPublicaciones_primera, setImagenPublicaciones_primera] = useState("");
    const [imagenPublicaciones_segunda, setImagenPublicaciones_segunda] = useState("");
    const [imagenPublicaciones_tercera, setImagenPublicaciones_tercera] = useState("");
    const [listaPublicaciones, setListaPublicaciones] = useState([]);
    const [id_publicaciones, setId_publicaciones] = useState("");



    // API INTERNA PARA HACER LOS FETH DIRECTO AL BACKEND NO USAR http://localhost:3001 PORQUE COMPLICA EL DESPLIEGUE EN LA NUBE
    const API = process.env.NEXT_PUBLIC_API_URL;
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;





    async function actuzalizarPublicaciones(
        descripcionPublicaciones,
        imagenPublicaciones_primera,
        imagenPublicaciones_segunda,
        imagenPublicaciones_tercera,
        id_publicaciones) {

        try {
            const res = await fetch(`${API}/publicaciones/actualizarPublicacion`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify({
                    descripcionPublicaciones,
                    imagenPublicaciones_primera,
                    imagenPublicaciones_segunda,
                    imagenPublicaciones_tercera,
                    id_publicaciones
                }),
                mode: "cors",
                cache: "no-cache"
            })
            const resultado = await res.json();
            if (!res.ok) {
                alert('No fue posible actulizar la publicacion seleccionada, porfavor contacte a soporte informatico de NativeCode.cl')
                return resultado;
            }else{
                if (resultado.message === "sindato"){
                    alert('No fue posible actulizar la publicacion / Debe llenar los campos obligartirios')
                    return resultado;
                }
                if (resultado.message === true){
                    alert('Se ha actualziado con exito la publicacion seleccionada')
                    return resultado;
                }
            }
        }catch (error) {
            console.log("No se ha podido actualizar la publicacion ERRPOR :" + error );
        }

    }





    async function eliminarPublicacion(id_publicaciones) {
        try {
            const res = await fetch(`${API}/publicaciones/eliminarPublicacion`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                body: JSON.stringify({id_publicaciones}),
                mode: "cors",
                cache: "no-cache"
            });

            const resultado = await res.json();

            if(!res.ok) {
                alert("No se ha podido eliminar publicacion consulte con soporte de NativeCode")
                return resultado;
            }else{



                if(resultado.message === "sindato"){
                    alert("No se ha seleccionado ninguna publicacion para ser eliminada, Debe seleccionar almenos una opcion")
                    console.log(resultado)
                    return resultado;

                }

                if(resultado.message === true){
                    alert("Se ha eliminado publicacion seleccionada correctamente")
                   await listarPublicaciones();
                    return resultado;
                }

            }

        }catch (error) {
            console.log("No se ha podido eliminar publicacion por error en el fecth : " + error);
        }
    }



    async function listarPublicaciones() {
        try {
            const res = await fetch(`${API}/publicaciones/seleccionarPublicaciones`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors",
                cache: "no-cache"
            })

            if(!res.ok) {
                console.error("No se han podido Listar Publicaciones / Falla en el fetch desde el frontEnd");
                setListaPublicaciones([])
                return[]
            }else {
                const publicaciones = await res.json();
                setListaPublicaciones(publicaciones);
                return publicaciones;
            }
        }catch(err) {
            console.error("Problema al consultar Backen desde la vista fronend:"+err);
        }
    }


    useEffect(() => {
        listarPublicaciones();
    }, []);


    async function insertarPublicacion(
        descripcionPublicaciones,
        imagenPublicaciones_primera,
        imagenPublicaciones_segunda,
        imagenPublicaciones_tercera
        ){
        if (!descripcionPublicaciones || !imagenPublicaciones_primera){
            alert("Campo descripcion obligatorio / Primera Imagen Obligatoria");
            return;
        }
        try {
            const res = await fetch(`${API}/publicaciones/insertarPublicacion`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                body: JSON.stringify({
                    descripcionPublicaciones,
                    imagenPublicaciones_primera,
                    imagenPublicaciones_segunda,
                    imagenPublicaciones_tercera
                }),
                mode: "cors",
                cache: "no-store"
            })
            if(!res.ok){
                alert("Ha habido un problema en consultar al servidor , Consulte con el equipo de Soporte de NativeCode")
            }else{
                const data = await res.json();
                if (data.resultado){
                    alert('Se ha insertado una nueva publicacion con exito!');
                }else {
                    alert('No se ha podido Insertar la NUEVA publicacion. Verifique que los campos obligatorios fueron ingresados.');
                }
            }
        }catch (e) {
            console.error(e);
        }
    }


    async function subirImagenCloudinary(e) {
        e.preventDefault();
        if (!file) {
            alert("Selecciona un archivo primero");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            alert("Error subiendo la imagen");
            return;
        }
        const data = await res.json();
        setUrl(data.secure_url); // Guarda la URL de la imagen subida
    }


    return (<div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (!file || file.length === 0) {
                        alert("Selecciona al menos una imagen");
                        return;
                    }
                    const uploadedUrls = [];
                    for (const f of file) {
                        const formData = new FormData();
                        formData.append("file", f);
                        formData.append("upload_preset", UPLOAD_PRESET);

                        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
                            method: "POST",
                            body: formData,
                        });
                        if (!res.ok) {
                            alert("Error subiendo una imagen");
                            return;
                        }
                        const data = await res.json();
                        uploadedUrls.push(data.secure_url);
                    }
                    // Asignar URLs a los estados individuales
                    setImagenPublicaciones_primera(uploadedUrls[0] || "");
                    setImagenPublicaciones_segunda(uploadedUrls[1] || "");
                    setImagenPublicaciones_tercera(uploadedUrls[2] || "");

                    await insertarPublicacion(
                        descripcionPublicaciones,
                        uploadedUrls[0] || "",
                        uploadedUrls[1] || "",
                        uploadedUrls[2] || "",
                    );
                }}
            >

                <input
                    type="text"
                    name="descripcionPublicaciones"
                    value={descripcionPublicaciones || ""}
                    onChange={(e) => setDescripcionPublicaciones(e.target.value)}
                    className="border border-2 rounded-2 w-100 h-10 rounded-2 p-2"
                />

                <br/>
                <br/>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => setfile(Array.from(e.target.files).slice(0, 3))}
                    className="border border-2 rounded-2 w-100 h-10 rounded-2 p-2"
                />

<br/><br/>

                <button
                    className="border border-2 rounded-2 w-50 h-10 rounded-2 p-2 bg-blue-50 font-bold hover:bg-blue-500 hover:text-white rounded-lg"
                    type="submit">Subir Publicacion</button>

            </form>






        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (!file || file.length === 0) {
                    alert("Selecciona al menos una imagen");
                    return;
                }
                const uploadedUrls = [];
                for (const f of file) {
                    const formData = new FormData();
                    formData.append("file", f);
                    formData.append("upload_preset", UPLOAD_PRESET);

                    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
                        method: "POST",
                        body: formData,
                    });
                    if (!res.ok) {
                        alert("Error subiendo una imagen");
                        return;
                    }
                    const data = await res.json();
                    uploadedUrls.push(data.secure_url);
                }
                // Llama al método de actualización
                await actuzalizarPublicaciones(
                    descripcionPublicaciones,
                    uploadedUrls[0] || "",
                    uploadedUrls[1] || "",
                    uploadedUrls[2] || "",
                    id_publicaciones
                );
                await listarPublicaciones(); // Para refrescar la lista
            }}
        >
            <input
                type="text"
                name="descripcionPublicaciones"
                value={descripcionPublicaciones || ""}
                onChange={(e) => setDescripcionPublicaciones(e.target.value)}
                className="border border-2 rounded-2 w-100 h-10 rounded-2 p-2"
                placeholder="Nueva descripción"
            />
            <br /><br />
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => setfile(Array.from(e.target.files).slice(0, 3))}
                className="border border-2 rounded-2 w-100 h-10 rounded-2 p-2"
            />
            <br /><br />
            <button
                className="border border-2 rounded-2 w-50 h-10 rounded-2 p-2 bg-green-50 font-bold hover:bg-green-500 hover:text-white rounded-lg"
                type="submit"
            >
                Actualizar Publicación
            </button>
        </form>


<br/><br/><br/>


        <select
            className="border-2 w-80 rounded-2xl p-2 border-blue-600"
            value={id_publicaciones}
            onChange={(e) => setId_publicaciones(e.target.value)}
        >
            <option value="" disabled selected>-- Selecciona una Publicacion --</option>
            {listaPublicaciones.map((publicaciones) => (
                <option value={publicaciones.id_publicaciones} key={publicaciones.id_publicaciones}>
                    {publicaciones.descripcionPublicaciones}
                </option>
            ))}
        </select>



            <button
                className="w-40 h-10 rounded-2xl p-2 bg-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
                onClick={() => eliminarPublicacion(id_publicaciones)}
            >Eliminar </button>

        <br/><br/><br/>



        <div>
            {
                listaPublicaciones.map((publicaciones) => (
                    <div key={publicaciones.id_publicaciones}>
                        <h1>{publicaciones.descripcionPublicaciones}</h1>
                <div className="flex items-center justify-between">
                    <img src={publicaciones.imagenPublicaciones_primera} alt="" />
                    <img src={publicaciones.imagenPublicaciones_segunda} alt="" />
                    <img src={publicaciones.imagenPublicaciones_tercera} alt="" />
                </div>
                    </div>

                ))
            }

        </div>



        </div>)




}