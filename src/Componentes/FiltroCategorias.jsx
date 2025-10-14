import {Select} from "@mui/material";

export  default function FiltroCategorias({categoriasProductos = [], id_categoriaProducto = "", seleccionarCategoria = () =>{}}) {
    return(
        <div>
            <br/><br/><br/>

            <div className="flex flex-col items-start gap-2">
              <label className="text-gray-700 font-semibold text-sm">Filtrar por Categorías</label>
              <select
                className="w-80 h-11 px-4 rounded-xl border border-blue-500 bg-white text-gray-800 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                value={id_categoriaProducto}
                onChange={(e)=> seleccionarCategoria(e.target.value) }
              >
                {categoriasProductos.map((categoria) => (
                  <option
                    key={categoria.id_categoriaProducto}
                    value={categoria.id_categoriaProducto}
                  >
                    {categoria.descripcionCategoria}
                  </option>
                ))}
              </select>
            </div>

            <br/><br/><br/>
        </div>
    )
}