export default function PrincipalPageDashboard() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-blue-950"
      style={{ backgroundImage: "url('/bienvenida.png')" }}
    >
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-[Michroma] text-blue-950">
          NativeCode Dashboard
        </h1>
        <p className="text-lg md:text-2xl text-blue-700 font-light">
          Comercio Electrónico — Bienvenido al panel principal
        </p>
        <div className="mt-8">
          <span className="inline-block bg-blue-50 px-6 py-3 rounded-xl border border-blue-200 text-blue-900 text-sm tracking-wider uppercase hover:bg-blue-100">
            <a
              href="https://wa.me/56966091038"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Contacto soporte NativeCode
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}