"use client"

import React, { useState, useEffect } from "react";

export default function Publicaciones() {
    const [file, setfile] = useState([]);
    const [url, setUrl] = useState([]);
    const [isUploading, setIsUploading] = useState(false);



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

    // Límite de tamaño de Cloudinary (plan gratuito) ≈ 10 MB
    const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

    /**
     * Redimensiona/comprime una imagen usando canvas.
     * - Mantiene proporción.
     * - Convierte a JPEG para una mejor compresión.
     * @param {File|Blob} file
     * @param {number} maxW
     * @param {number} maxH
     * @param {number} quality 0..1
     * @returns {Promise<Blob>}
     */
    async function downscaleImage(file, maxW = 1600, maxH = 1600, quality = 0.8) {
      const img = document.createElement("img");
      const objectUrl = URL.createObjectURL(file);
      try {
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = objectUrl;
        });
        const { width, height } = img;
        const scale = Math.min(maxW / width, maxH / height, 1);
        const targetW = Math.max(1, Math.round(width * scale));
        const targetH = Math.max(1, Math.round(height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetW, targetH);

        return await new Promise((resolve) =>
          canvas.toBlob(
            (blob) => resolve(blob),
            "image/jpeg",
            quality
          )
        );
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    }





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


    return (<div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Nueva publicación</h2>
              <form
                  onSubmit={async (e) => {
                      e.preventDefault();
                      setIsUploading(true);
                      if (!file || file.length === 0) {
                          setIsUploading(false);
                          alert("Selecciona al menos una imagen");
                          return;
                      }
                      // Validación de variables de entorno requeridas para Cloudinary
                      if (!CLOUD_NAME || !UPLOAD_PRESET) {
                        setIsUploading(false);
                        console.error("Faltan variables de entorno para Cloudinary", {
                          CLOUD_NAME: CLOUD_NAME || "NO DEFINIDO",
                          UPLOAD_PRESET: UPLOAD_PRESET || "NO DEFINIDO",
                        });
                        alert("No se puede subir la imagen: faltan variables de entorno (CLOUD_NAME o UPLOAD_PRESET).");
                        return;
                      }
                      const uploadedUrls = [];
                      for (const f of file) {
                          let toUpload = f;

                          // Si supera el límite, intentamos comprimir/redimensionar
                          if (toUpload.size > MAX_UPLOAD_SIZE) {
                            console.warn("Imagen supera 10MB, intentando comprimir...", {
                              nombre: toUpload.name,
                              sizeMB: (toUpload.size / (1024*1024)).toFixed(2)
                            });
                            const compressed = await downscaleImage(toUpload, 1600, 1600, 0.82);
                            if (compressed && compressed.size < toUpload.size) {
                              toUpload = new File([compressed], (f.name || "image") + ".jpg", { type: "image/jpeg" });
                              console.info("Imagen comprimida", {
                                nuevaSizeMB: (toUpload.size / (1024*1024)).toFixed(2)
                              });
                            }
                          }

                          // Si aún excede el máximo, informamos y detenemos
                          if (toUpload.size > MAX_UPLOAD_SIZE) {
                            setIsUploading(false);
                            alert("La imagen excede 10 MB incluso tras compresión. Por favor, súbela con menor resolución o peso.");
                            return;
                          }

                          const formData = new FormData();
                          formData.append("file", toUpload);
                          formData.append("upload_preset", UPLOAD_PRESET);

                          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
                            method: "POST",
                            body: formData,
                          });
                          if (!res.ok) {
                            setIsUploading(false);
                            const errText = await res.text();
                            console.error("Error subiendo una imagen a Cloudinary:", res.status, errText);
                            alert("Error subiendo una imagen. Revisa en Cloudinary que el UPLOAD_PRESET sea 'unsigned' y que el CLOUD_NAME sea correcto.");
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
                      // Limpieza de estados tras inserción exitosa
                      setfile([]);
                      setDescripcionPublicaciones("");
                      setImagenPublicaciones_primera("");
                      setImagenPublicaciones_segunda("");
                      setImagenPublicaciones_tercera("");
                      await listarPublicaciones();
                      setIsUploading(false);
                  }}
              >
                  <input
                      type="text"
                      name="descripcionPublicaciones"
                      value={descripcionPublicaciones || ""}
                      onChange={(e) => setDescripcionPublicaciones(e.target.value)}
                      className="border-2 border-gray-200 rounded-xl w-full h-10 px-3 focus:outline-none focus:border-blue-500"
                  />
                  <br/>
                  <br/>
                  <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => setfile(Array.from(e.target.files).slice(0, 3))}
                      className="border-2 border-gray-200 rounded-xl w-full h-10 px-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 hover:file:bg-blue-100"
                  />
                  {isUploading && (
                    <div className="mt-2 flex items-center gap-2 text-blue-600 text-sm">
                      <span className="inline-block h-4 w-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
                      <span>Subiendo imagen a la nube...</span>
                    </div>
                  )}
                  <br/><br/>
                  <button
                      className={`inline-flex items-center justify-center h-10 px-5 rounded-xl border-2 border-blue-200 font-medium transition-colors ${isUploading ? "bg-blue-100 text-blue-400 cursor-not-allowed" : "bg-blue-50 text-blue-900 hover:bg-blue-500 hover:text-white"}`}
                      type="submit"
                      disabled={isUploading}
                  >Subir Publicacion</button>
              </form>
            </section>
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Actualizar publicación</h2>
              <form
                  onSubmit={async (e) => {
                      e.preventDefault();
                      setIsUploading(true);
                      if (!file || file.length === 0) {
                          setIsUploading(false);
                          alert("Selecciona al menos una imagen");
                          return;
                      }
                      // Validación de variables de entorno requeridas para Cloudinary
                      if (!CLOUD_NAME || !UPLOAD_PRESET) {
                        setIsUploading(false);
                        console.error("Faltan variables de entorno para Cloudinary", {
                          CLOUD_NAME: CLOUD_NAME || "NO DEFINIDO",
                          UPLOAD_PRESET: UPLOAD_PRESET || "NO DEFINIDO",
                        });
                        alert("No se puede subir la imagen: faltan variables de entorno (CLOUD_NAME o UPLOAD_PRESET).");
                        return;
                      }
                      const uploadedUrls = [];
                      for (const f of file) {
                          let toUpload = f;

                          // Si supera el límite, intentamos comprimir/redimensionar
                          if (toUpload.size > MAX_UPLOAD_SIZE) {
                            console.warn("Imagen supera 10MB, intentando comprimir...", {
                              nombre: toUpload.name,
                              sizeMB: (toUpload.size / (1024*1024)).toFixed(2)
                            });
                            const compressed = await downscaleImage(toUpload, 1600, 1600, 0.82);
                            if (compressed && compressed.size < toUpload.size) {
                              toUpload = new File([compressed], (f.name || "image") + ".jpg", { type: "image/jpeg" });
                              console.info("Imagen comprimida", {
                                nuevaSizeMB: (toUpload.size / (1024*1024)).toFixed(2)
                              });
                            }
                          }

                          // Si aún excede el máximo, informamos y detenemos
                          if (toUpload.size > MAX_UPLOAD_SIZE) {
                            setIsUploading(false);
                            alert("La imagen excede 10 MB incluso tras compresión. Por favor, súbela con menor resolución o peso.");
                            return;
                          }

                          const formData = new FormData();
                          formData.append("file", toUpload);
                          formData.append("upload_preset", UPLOAD_PRESET);

                          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
                            method: "POST",
                            body: formData,
                          });
                          if (!res.ok) {
                            setIsUploading(false);
                            const errText = await res.text();
                            console.error("Error subiendo una imagen a Cloudinary:", res.status, errText);
                            alert("Error subiendo una imagen. Revisa en Cloudinary que el UPLOAD_PRESET sea 'unsigned' y que el CLOUD_NAME sea correcto.");
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
                      // Limpieza de estados tras actualización (excepto id_publicaciones)
                      setfile([]);
                      setDescripcionPublicaciones("");
                      setImagenPublicaciones_primera("");
                      setImagenPublicaciones_segunda("");
                      setImagenPublicaciones_tercera("");
                      setIsUploading(false);
                  }}
              >
                  <input
                      type="text"
                      name="descripcionPublicaciones"
                      value={descripcionPublicaciones || ""}
                      onChange={(e) => setDescripcionPublicaciones(e.target.value)}
                      className="border-2 border-gray-200 rounded-xl w-full h-10 px-3 focus:outline-none focus:border-emerald-500"
                      placeholder="Nueva descripción"
                  />
                  <br /><br />
                  <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => setfile(Array.from(e.target.files).slice(0, 3))}
                      className="border-2 border-gray-200 rounded-xl w-full h-10 px-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 hover:file:bg-emerald-100"
                  />
                  {isUploading && (
                    <div className="mt-2 flex items-center gap-2 text-blue-600 text-sm">
                      <span className="inline-block h-4 w-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
                      <span>Subiendo imagen a la nube...</span>
                    </div>
                  )}
                  <br /><br />
                  <button
                      className={`inline-flex items-center justify-center h-10 px-5 rounded-xl border-2 font-medium transition-colors ${isUploading ? "border-emerald-200 bg-emerald-100 text-emerald-400 cursor-not-allowed" : "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-500 hover:text-white"}`}
                      type="submit"
                      disabled={isUploading}
                  >
                      Actualizar Publicación
                  </button>
              </form>
            </section>

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Administrar publicaciones</h2>
              <div className="flex flex-wrap items-center gap-3">
                <select
                    className="border-2 border-gray-200 w-80 rounded-xl px-3 h-10 focus:outline-none focus:border-rose-500"
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
                    className="inline-flex items-center justify-center w-40 h-10 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                    onClick={() => eliminarPublicacion(id_publicaciones)}
                >Eliminar </button>
              </div>
            </section>

            <section aria-labelledby="publications-title" className="space-y-4">
              <h2 id="publications-title" className="text-2xl font-semibold tracking-tight">Publicaciones</h2>
              {listaPublicaciones.length === 0 ? (
                <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-gray-500">Aún no hay publicaciones.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listaPublicaciones.map((publicaciones) => (
                    <article key={publicaciones.id_publicaciones} className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <h3 className="text-base font-medium truncate" title={publicaciones.descripcionPublicaciones}>{publicaciones.descripcionPublicaciones}</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-2 p-4 pt-0">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
                          <img src={publicaciones.imagenPublicaciones_primera} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
                          <img src={publicaciones.imagenPublicaciones_segunda} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
                          <img src={publicaciones.imagenPublicaciones_tercera} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
        </div>)




}