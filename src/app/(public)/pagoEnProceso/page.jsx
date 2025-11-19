export default function PagoEnProcesoPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <section className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">
                    Tu pago está siendo procesado
                </h1>

                <p className="text-gray-700 mb-2">
                    Estamos verificando la información de tu transacción.
                </p>

                <p className="text-gray-700 mb-2">
                    Este proceso puede tardar unos segundos o minutos.
                </p>

                <p className="text-gray-700 mb-6">
                    Te enviaremos una confirmación al correo que proporcionaste.
                </p>

                <a
                    href="/"
                    className="inline-block px-6 py-2 rounded-full border border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition"
                >
                    Volver al inicio
                </a>
            </section>
        </main>
    );
}