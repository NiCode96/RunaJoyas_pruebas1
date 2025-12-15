// app/page.jsx
import Link from "next/link";
import Portada from "@/app/(public)/portada/page";
import Catalogo from "@/app/(public)/catalogo/page";
import footer from "@/app/(public)/footer/page";



export default function Home() {


    return (
        <main>
            <Portada></Portada>

<Catalogo></Catalogo>



        </main>
    );
}