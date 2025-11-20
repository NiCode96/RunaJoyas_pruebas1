export default function PrincipalPageDashboard() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-blue-950"
      style={{ backgroundImage: "url('/bienvenida.png')" }}
    >
      <div className="text-center space-y-6 bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-blue-100">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-[Michroma] text-blue-950">
          NativeCode
        </h1>
        <p className="text-lg md:text-2xl text-blue-800 font-medium tracking-wide">
          E-Commerce <span className="text-blue-500">· Lite</span>
        </p>
        <div className="mt-8">
          <span className="inline-block px-6 py-3 rounded-xl border border-blue-300 text-blue-950 text-sm tracking-wider uppercase font-semibold bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 shadow-md hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-lg transition-all duration-300">
            <a
              href="https://wa.me/56966091038"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              Contacto soporte NativeCode
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}