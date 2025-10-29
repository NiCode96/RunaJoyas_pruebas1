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
        <div className="animate-pulse text-gray-500">Cargando…</div>
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
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-neutral-200 shadow-[0_18px_60px_rgba(0,0,0,0.08)] rounded-2xl p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            Native e-Commerce
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Accede a tu panel para gestionar tu tienda
            </p>
          </div>

          {/* OAuth */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuth("google")}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 active:scale-[.99]"
              type="button"
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
            <span className="text-xs text-neutral-500">o con tu correo</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl border border-neutral-200 bg-white px-4 text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.06)]"
                placeholder="tu@correo.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl border border-neutral-200 bg-white px-4 text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.06)]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-xl bg-neutral-900 text-white font-semibold transition hover:bg-black active:scale-[.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
            >
              {submitting ? "Ingresando…" : "Ingresar"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-neutral-500">
            ¿No tienes acceso? Contacta al administrador.
          </p>
        </div>
      </div>
    </main>
  );
}