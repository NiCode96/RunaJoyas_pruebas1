// app/page.jsx
import Link from "next/link";
import Portada from "@/app/portada/page";

export default function Home() {
    return (
        <main>

            <Portada></Portada>



            <Link href="/dashboard">Ir al Dashboard</Link>
        </main>
    );
}