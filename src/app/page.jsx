// app/page.jsx
import Link from "next/link";
import Portada from "@/app/portada/page";
import Catalogo from "@/app/catalogo/page";

export default function Home() {
    return (
        <main>

            <Portada></Portada>

<Catalogo></Catalogo>

            <Link href="/dashboard">Ir al Dashboard</Link>
        </main>
    );
}