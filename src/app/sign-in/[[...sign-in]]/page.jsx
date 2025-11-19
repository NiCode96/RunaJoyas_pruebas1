"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

export default function Page() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) {
    return (
      <main className="min-h-screen grid place-items-center bg-white">
        <div className="animate-pulse text-neutral-800">Cargando…</div>
      </main>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await signIn.create({
        identifier: email.trim(),
        password: password,
      });

      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        router.push("/dashboard");
      } else {
        // factores adicionales, OTP, etc.
        setError("Se requiere un factor adicional para completar el ingreso.");
      }
    } catch (err) {
      const msg =
        err?.errors?.[0]?.message ||
        "No pudimos iniciar sesión. Revisa tus datos e inténtalo nuevamente.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOAuth(provider) {
    setError("");
    try {
      await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      const msg =
        err?.errors?.[0]?.message || "No fue posible continuar con el proveedor.";
      setError(msg);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 flex items-stretch md:items-center justify-center px-4 py-8 md:py-10">
      <div className="w-full max-w-5xl grid gap-8 md:gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
        {/* Columna izquierda: mensaje tipo start-up */}
        <section className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/80 backdrop-blur px-4 py-1.5 text-[11px] font-semibold text-sky-700 shadow-[0_4px_18px_rgba(56,189,248,0.25)]">
            <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400" />
            <span className="tracking-wide">NativeCode Developers</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-slate-900 to-neutral-700 bg-clip-text text-transparent drop-shadow-xl">
              E‑Commerce Lite
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 text-sm leading-relaxed text-neutral-600">
              Centraliza pedidos, inventario y pagos en un solo panel. Diseñado
              para marcas que quieren vender más sin pelearse con la tecnología.
            </p>
          </div>

          <div className="grid gap-4 text-sm text-neutral-700 sm:grid-cols-3 max-w-xl mx-auto md:mx-0">
            <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Gestión en tiempo real
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                Actualiza productos, stock y precios sin interrumpir tu tienda.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Pagos automáticos
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                Integración con medios de pago para cobrar sin fricción.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                Soporte cercano
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                Acompañamiento en español para crecer tu e-commerce.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] text-neutral-500">
            <span>Sin instalaciones complicadas.</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>Panel pensado para founders no técnicos.</span>
          </div>
        </section>

        {/* Columna derecha: card de login */}
        <section className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_55%)] opacity-90" />
          <div className="relative bg-white border border-neutral-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)] rounded-3xl p-6 sm:p-8 md:p-9 backdrop-blur-sm max-w-md mx-auto">
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 inline-flex h-10 px-6 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 text-xs sm:text-sm font-bold text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)]">
                Lite Version
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                Inicia sesión en tu panel
              </h2>
              <p className="mt-2 text-xs text-neutral-600">
                Administra productos, pedidos y reportes desde un solo lugar.
              </p>
            </div>

            {/* OAuth */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleOAuth("google")}
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-[.98] shadow-[0_6px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.1 29.6 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21c10.5 0 19.5-7.6 21-18v-6.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.8 16.1 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.1 29.6 3 24 3 16.1 3 9.2 7.4 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.1C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.4 5C9.1 41.7 16 45 24 45z"/>
                  <path fill="#1976D2" d="M45 24c0-1.4-.1-2.4-.4-3.5H24v8h11.3c-.5 2.6-2 4.8-4.1 6.3l6.2 5.1C40.7 37.4 45 31.4 45 24z"/>
                </svg>
                Continuar con Google
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-500">
                o ingresa con tu correo
              </span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold text-neutral-800"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none ring-0 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.25)]"
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-xs font-semibold text-neutral-800"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none ring-0 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.25)]"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-neutral-900 via-black to-neutral-700 text-white text-sm font-semibold transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] active:scale-[.97] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Ingresando…" : "Ingresar"}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-5 text-center text-[11px] text-neutral-500">
              ¿No tienes acceso? Contacta al administrador de tu tienda.
            </p>
            <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-neutral-200" />
          </div>
        </section>
      </div>
    </main>
  );
}