"use client";
import { useState, useEffect } from "react";
import MediaCard from "@/Componentes/MediaCard";
import MediaCardImage from "@/Componentes/MediaCardImage";
import Image from "next/image";
import { toast, Toaster } from 'react-hot-toast';
import FiltroCategorias from "@/Componentes/FiltroCategorias";

export default function Dashboard() {

  // USESTATES DE REACT PARA EL CAMBIO DE ESTADOS CON HOOKS
  const [tituloProducto, settituloProducto] = useState("");
  const [descripcionProducto, setdescripcionProducto] = useState("");
  const [imagenProducto, setimagenProducto] = useState("");
  const [imagenProductoSegunda, setImagenProductoSegunda] = useState("");
  const [imagenProductoTercera, setImagenProductoTercera] = useState("");
  const [imagenProductoCuarta, setImagenProductoCuarta] = useState("");
  const [valorProducto, setvalorProducto] = useState(""); // URL final
  const [file, setFile] = useState(null); // archivo local
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setproductoSeleccionado] = useState(null);
  const [listadoCategorias, setlistadoCategorias] = useState([]);
  const [categoriaProducto, setcategoriaProducto] = useState("");
  const [categoriaProductoSeleccion, setcategoriaProductoSeleccion] = useState("");



  // API INTERNA PARA HACER LOS FETH DIRECTO AL BACKEND NO USAR http://localhost:3001 PORQUE COMPLICA EL DESPLIEGUE EN LA NUBE
  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;



  //FUNCION PARA LISTAR POR FILTRO DE CATEGORIAS
    async function seleccionarPorCategoria(id_categoriaProducto) {
try {

    const res = await fetch(`${API}/producto/seleccionarProductoCategoria`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-store",
        body: JSON.stringify({id_categoriaProducto})
    })

    if(!res.ok){
        console.error("Problema en el fronend fecth no se pudo realziar con exito")

    }


    const data = await res.json();
    const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.rows)
            ? data.rows
            : [];
    setProductos(list);
    console.log("Productos cargados:", list.length);
    return list;


}catch (error) {
    console.log(error);

}
    }


    // FUNCION PARA LLAMAR LISTA DE CATEGORIAS
    async function listarCategorias() {
        try {

            const res = await fetch(`${API}/categorias/seleccionarCategoria`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors",
                cache: "no-store",
            })

            if(!res.ok) {
                console.error('Problemas en la categoria');            }

            const data = await res.json();
            setlistadoCategorias(data);

        }catch (error) {
            console.error("Problema al cargar categoria / Error proveniente de fronend ingreso de productos");
        }
    }
    useEffect(() => {
        listarCategorias();
    }, []);
    //FUNCION PARA ACTUALIZAR PRODUCTO
  async function actualizarProducto(tituloProducto, descripcionProducto, valorProducto, imagenProducto, imagenProductoSegunda, imagenProductoTercera, imagenProductoCuarta,categoriaProducto, id_producto) {
    try {
      if (!tituloProducto || !descripcionProducto || !valorProducto || !imagenProducto || !imagenProductoSegunda || !imagenProductoTercera || !imagenProductoCuarta ||!categoriaProducto || !id_producto) {
        console.error("No se estan recibiendo valores relacionados a id del producto en la funcion en fronend")
      }
      const res = await fetch(`${API}/producto/actualizarProducto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tituloProducto, descripcionProducto, valorProducto, imagenProducto, imagenProductoSegunda, imagenProductoTercera, imagenProductoCuarta, categoriaProducto, id_producto })
      })
      if (!res.ok) {
        console.error("problema al actualizar producto")
      }
      const data = await res.json();
    } catch (error) {
      console.error("problema al actualizar producto:", error)
    }
  }
    //FUNCION PARA ELIMINACION PRODUCTO
  async function eliminarProducto(id_producto) {
  try {
    if(!id_producto){
      console.error("No se estan recibiendo valores relacionados a id del producto en la funcion en fronend")
    }

    const res = await fetch(`${API}/producto/eliminarProducto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id_producto})
    })

    if (!res.ok) {
        console.error("problema al eliminar producto")
    }
    const data = await res.json();


  } catch (error) {
    console.error("problema al eliminar producto:", error)
  }

}
   //FUNCION PARA CARGAR PRODUCTO ESPECIFICO POR ID
  async function cargarProductoEspecifico(id_producto) {
    try {
      if (!id_producto) {
        console.error({ message: "Id del producto no proporcionado" });
        return null;
      }



      const res = await fetch(`${API}/producto/${id_producto}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });


      if (!res.ok) {
        console.error({ message: "Error al cargar producto" });
        return null;
      }
      const data = await res.json();
      setproductoSeleccionado(data);
      settituloProducto(data.tituloProducto);
      setdescripcionProducto(data.descripcionProducto);
      setvalorProducto(data.valorProducto);
      setimagenProducto(data.imagenProducto);
      setImagenProductoSegunda(data.imagenProductoSegunda || "");
      setImagenProductoTercera(data.imagenProductoTercera || "");
      setImagenProductoCuarta(data.imagenProductoCuarta || "");
      console.log(data);
    } catch (error) {
      console.error("Problema al cargar producto especifico");
    }
  }
  //FUNCION PARA CARGAR TODOS LOS PRODUCTOS
  async function cargarProductos() {
    try {
      //END POINT PARA CONECTAR AL BACKEND CON LS PETICCION HTTP
      const endpoint = `${API}/producto/seleccionarProducto`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Error al Cargar productos:", res.status);
        setProductos([]);
        return [];
      }
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.rows)
        ? data.rows
        : [];
      setProductos(list);
      console.log("Productos cargados:", list.length);
      return list;
    } catch (error) {
      console.error(
        "Problema al hacer el fetch desde el frontend para traer las tarjetas",
        error
      );
      setProductos([]);
      return [];
    }
  }
  //uso de estado para disparar la funcion al recargar la pagina
  useEffect(() => {
    cargarProductos();
  }, []);
  //FUNCION PARA CARGAR IMAGENES A CLOUDINARY
  async function uploadToCloudinary(file) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(url, { method: "POST", body: form });
    if (!res.ok) throw new Error("Error subiendo a Cloudinary");
    const data = await res.json();
    return data.secure_url; // 👈 URL final segura
  }
  //FUNCION PARA INSERTAR NUEVOS PRODUCTOS ESPECIFICO POR ID
  async function insertarProducto() {
    try {
      // ⚠️ Validación simple con toast
      if (!tituloProducto.trim()) {
        toast.error("El campo 'Título del producto' no puede estar vacío");
        return;
      }

      if (!descripcionProducto.trim()) {
        toast.error("El campo 'Descripción' no puede estar vacío");
        return;
      }

      if (!valorProducto || Number(valorProducto) <= 0) {
        toast.error("El campo 'Valor del producto' debe ser mayor que 0");
        return;
      }

      if (!categoriaProducto) {
        toast.error("Debe seleccionar una categoría");
        return;
      }

      setSubiendo(true);

      // Subidas a Cloudinary segun existan archivos
      let finalImageUrl = imagenProducto;
      if (file) {
        finalImageUrl = await uploadToCloudinary(file);
        setimagenProducto(finalImageUrl);
      }

      let finalImageUrl2 = imagenProductoSegunda;
      if (file2) {
        finalImageUrl2 = await uploadToCloudinary(file2);
        setImagenProductoSegunda(finalImageUrl2);
      }

      let finalImageUrl3 = imagenProductoTercera;
      if (file3) {
        finalImageUrl3 = await uploadToCloudinary(file3);
        setImagenProductoTercera(finalImageUrl3);
      }

      let finalImageUrl4 = imagenProductoCuarta;
      if (file4) {
        finalImageUrl4 = await uploadToCloudinary(file4);
        setImagenProductoCuarta(finalImageUrl4);
      }

      const valorNumero = Number(valorProducto);

      const data = {
        tituloProducto,
        descripcionProducto,
        valorProducto: valorNumero,
        imagenProducto: finalImageUrl ,
        imagenProductoSegunda: finalImageUrl2 || "",
        imagenProductoTercera: finalImageUrl3 || "",
        imagenProductoCuarta: finalImageUrl4 || "",
        categoriaProducto: categoriaProducto
      };

      const res = await fetch(`${API}/producto/insertarProducto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const out = await res.json();
      if (!res.ok) {
        console.error(out);
        toast.error("Error al insertar producto");
        return;
      }

      toast.success("Producto insertado correctamente ✅");
      await cargarProductos();
      settituloProducto("");
      setdescripcionProducto("");
      setvalorProducto("");
      setimagenProducto("");
      setImagenProductoSegunda("");
      setImagenProductoTercera("");
      setImagenProductoCuarta("");
      setFile(null);
      setFile2(null);
      setFile3(null);
      setFile4(null);
    } catch (err) {
      console.error(err);
      toast.error("Error al subir producto ❌");
    } finally {
      setSubiendo(false);
    }
  }



  //INICIO DEL COMPONETE GRAFICO EN REACT
  return (
    <div>
      <h1 className="max-w-7xl mx-auto px-6 mt-10 text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">Gestión de Productos</h1>
      <div className="max-w-7xl mx-auto px-6 py-10">


        {/**CONTENEDOR PARTE SUPERIOR */}
        <div className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-gray-200 shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                insertarProducto();
              }}
            >
              {/* Título del producto */}
              <div className="relative group group-focus-within:scale-[1.02] transition-transform duration-200 mb-6">
                {/* Indicador visual lateral dinámico */}
                <span className="absolute left-0 top-0 h-full w-1 rounded bg-transparent group-focus-within:bg-blue-500 transition-colors duration-150"></span>
                <label className="pl-3 text-sm font-semibold group-focus-within:text-blue-600 transition-colors">
                  Título
                </label>
                <input
                  type="text"
                  value={tituloProducto}
                  onChange={(e) => settituloProducto(e.target.value)}
                  className="text-sm w-full mt-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Descripción del producto */}
              <div className="relative group group-focus-within:scale-[1.02] transition-transform duration-200 mb-6">
                <span className="absolute left-0 top-0 h-full w-1 rounded bg-transparent group-focus-within:bg-blue-500 transition-colors duration-150"></span>
                <label className="pl-3 text-sm font-semibold group-focus-within:text-blue-600 transition-colors">
                  Descripción
                </label>
                <textarea
                  value={descripcionProducto}
                  onChange={(e) => setdescripcionProducto(e.target.value)}
                  className="text-sm w-full h-50 mt-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              {/* Valor del producto */}
              <div className="relative group group-focus-within:scale-[1.02] transition-transform duration-200 mb-6">
                <span className="absolute left-0 top-0 h-full w-1 rounded bg-transparent group-focus-within:bg-blue-500 transition-colors duration-150"></span>
                <label className="pl-3 text-sm font-semibold group-focus-within:text-blue-600 transition-colors">
                  Valor Producto
                </label>
                <input
                  type="number"
                  value={valorProducto}
                  onChange={(e) => setvalorProducto(e.target.value)}
                  name="valorProductoe"
                  id="valorProductoe"
                  className="text-sm w-full mt-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Categoría del producto */}
              <div className="relative group group-focus-within:scale-[1.02] transition-transform duration-200 mb-6">
                <span className="absolute left-0 top-0 h-full w-1 rounded bg-transparent group-focus-within:bg-blue-500 transition-colors duration-150"></span>
                <label className="pl-3 text-sm font-semibold group-focus-within:text-blue-600 transition-colors">
                  Categoria Producto
                </label>
                <select
                  value={categoriaProducto}
                  onChange={(e) => setcategoriaProducto(e.target.value)}
                  className="text-sm w-full mt-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 cursor-pointer transition duration-150 ease-in-out"
                >
                  <option value="" disabled>Seleccione</option>
                  {listadoCategorias.map((categoria) => (
                    <option
                      key={categoria.id_categoriaProducto}
                      value={categoria.id_categoriaProducto}
                    >
                      {categoria.descripcionCategoria}
                    </option>
                  ))}
                </select>
              </div>

              <label className="text-sm font-semibold">Imagen Principal</label>
              <br />
              <input
                type="text"
                value={imagenProducto}
                readOnly
                aria-readonly="true"
                placeholder="URL generada automáticamente"
                className="text-sm w-full mt-1 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 px-3 py-2 cursor-not-allowed"
              />
              <br />
              <br />

  <label className="text-sm font-semibold">Imagen 2 (URL)</label>
  <br />
  <input
    type="text"
    value={imagenProductoSegunda}
    readOnly
    aria-readonly="true"
    placeholder="URL generada automáticamente"
    className="text-sm w-full mt-1 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 px-3 py-2 cursor-not-allowed"
  />
  <br />
  <br />

  <label className="text-sm font-semibold">Imagen 3 (URL)</label>
  <br />
  <input
    type="text"
    value={imagenProductoTercera}
    readOnly
    aria-readonly="true"
    placeholder="URL generada automáticamente"
    className="text-sm w-full mt-1 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 px-3 py-2 cursor-not-allowed"
  />
  <br />
  <br />

  <label className="text-sm font-semibold">Imagen 4 (URL)</label>
  <br />
  <input
    type="text"
    value={imagenProductoCuarta}
    readOnly
    aria-readonly="true"
    placeholder="URL generada automáticamente"
    className="text-sm w-full mt-1 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 px-3 py-2 cursor-not-allowed"
  />
  <br />
  <br />

              <label htmlFor="file1" className="inline-flex w-full items-center justify-center mt-1 rounded-xl border border-dashed border-blue-400 bg-blue-50 px-4 py-3 font-medium text-sm text-blue-700 hover:bg-blue-100 cursor-pointer">
                Subir Imagen 1
              </label>
              <input
                id="file1"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <br />
              <br />

  <label htmlFor="file2" className="inline-flex w-full items-center justify-center mt-1 rounded-xl border border-dashed border-blue-400 bg-blue-50 px-4 py-3 font-medium text-sm text-blue-700 hover:bg-blue-100 cursor-pointer">
    Subir Imagen 2
  </label>
  <input
    id="file2"
    type="file"
    accept="image/*"
    onChange={(e) => setFile2(e.target.files?.[0] || null)}
    className="hidden"
  />
  <br />
  <br />
  <label htmlFor="file3" className="inline-flex w-full items-center justify-center mt-1 rounded-xl border border-dashed border-blue-400 bg-blue-50 px-4 py-3 font-medium text-sm text-blue-700 hover:bg-blue-100 cursor-pointer">
    Subir Imagen 3
  </label>
  <input
    id="file3"
    type="file"
    accept="image/*"
    onChange={(e) => setFile3(e.target.files?.[0] || null)}
    className="hidden"
  />
  <br />
  <br />
  <label htmlFor="file4" className="inline-flex w-full items-center justify-center mt-1 rounded-xl border border-dashed border-blue-400 bg-blue-50 px-4 py-3 font-medium text-sm text-blue-700 hover:bg-blue-100 cursor-pointer">
    Subir Imagen 4
  </label>
  <input
    id="file4"
    type="file"
    accept="image/*"
    onChange={(e) => setFile4(e.target.files?.[0] || null)}
    className="hidden"
  />
  <br />
  <br />

              <button
                type="submit"
                disabled={subiendo}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition disabled:opacity-60"
              >
                {subiendo ? "Subiendo..." : "Subir Producto"}
              </button>



                {productoSeleccionado && (
                    <button

                        onClick={() => actualizarProducto(
                          tituloProducto,
                          descripcionProducto,
                          valorProducto,
                          imagenProducto,
                          imagenProductoSegunda,
                          imagenProductoTercera,
                          imagenProductoCuarta,
                          categoriaProducto,
                          productoSeleccionado.id_producto
                        )} type={"button"}                 className="ml-2 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700 hover:shadow-md transition"
                    >
                        Actualizar
                    </button>
                )}


            </form>
          </div>

          <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-gray-200 shadow-lg p-6 flex flex-col items-center text-center min-h-[300px]">
            <h2 className="text-sm font-semibold text-gray-600">Imagenes del Producto seleccionado</h2>
            {productoSeleccionado ? (
              <div className="flex flex-col gap-4 w-full mt-4 items-center">
                {[
                  productoSeleccionado.imagenProducto,
                  productoSeleccionado.imagenProductoSegunda,
                  productoSeleccionado.imagenProductoTercera,
                  productoSeleccionado.imagenProductoCuarta
                ]
                  .filter(Boolean)
                  .map((src, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden rounded-xl ring-1 ring-gray-200 bg-white transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-md">
                      <MediaCardImage imagenProducto={src} />
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm mt-4">Sin producto seleccionado</p>
            )}
          </div>
        </div>






          {/*FILTRO SELECCION DE PRODUCTOS POR CATEGORIA*/}
  <div>
      <h1>Filtrar por categoria</h1><br/>
      <select
          className="p-2 w-80 h-10 border-2 rounded-lg"
          value={categoriaProductoSeleccion}
          onChange={(e) => setcategoriaProductoSeleccion(e.target.value)}
      >
          <option value="" >-- Selecciona una categoría --</option>

          {listadoCategorias.map((categoria) => (
              <option key={categoria.id_categoriaProducto} value={categoria.id_categoriaProducto}>{categoria.descripcionCategoria}</option>

          ))}
      </select>

      <button

      onClick={()=>seleccionarPorCategoria(categoriaProductoSeleccion)}
      >
          Filtrar
      </button>





  </div>



        <br />
        <br />
        <br />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4">
          {productos.length === 0 ? (
            <div>
              <p>No hay productos para mostrar.</p>
              <button type="button" onClick={cargarProductos}>
                Cargar productos
              </button>
            </div>
          ) : (
            productos.map((producto) => (
              <div
                key={
                  producto.id_producto ??
                  producto.id ??
                  `${producto.tituloProducto}-${producto.imagenProducto}`
                }
                style={{ marginBottom: "1rem" }}
              >
                <MediaCard
                  // Props con ambos nombres por compatibilidad
                  titulo={producto.tituloProducto}
                  descripcion={producto.descripcionProducto}
                  valor={producto.valorProducto}
                  imagenProducto={producto.imagenProducto}
                  boton1={
                    <span
                      onClick={() => cargarProductoEspecifico(producto.id_producto)}
                      className="inline-block"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') cargarProductoEspecifico(producto.id_producto); }}
                    >
                      Seleccionar
                    </span>
                  }
                  boton2={
                    <span
                      onClick={() => eliminarProducto(producto.id_producto)}
                      className="inline-block"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') eliminarProducto(producto.id_producto); }}
                    >
                      Eliminar
                    </span>
                  }

                />

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

      <Toaster position="top-right" reverseOrder={false} />