export default function PagoRechazadoPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <section className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Pago rechazado
                </h1>

                <p className="text-gray-700 mb-2">
                    Tu pago no pudo ser procesado.
                </p>

                <p className="text-gray-700 mb-2">
                    Por favor contacta a tu banco o intenta nuevamente más tarde.
                </p>

                <p className="text-gray-700 mb-6">
                    Si tienes dudas, puedes comunicarte con nuestro equipo de soporte.
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