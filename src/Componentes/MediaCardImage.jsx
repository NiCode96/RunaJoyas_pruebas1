import Image from 'next/image';

export default function MediaCardImage({ imagenProducto}) {

    return (
        <div >
            <img src={imagenProducto} alt={imagenProducto} className="rounded-2xl h-64 w-64 " />
        </div>

    );
}