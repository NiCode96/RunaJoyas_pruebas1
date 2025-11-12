import Image from "next/image";

export default function MediaCardImage({ imagenProducto, tituloProducto, valorProducto }) {
  return (
    <div className="relative w-[220px] h-[220px] overflow-hidden ">
      <img
        src={imagenProducto}
        alt={tituloProducto}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}