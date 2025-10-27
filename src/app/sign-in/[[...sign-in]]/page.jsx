// Muestra el formulario de login de Clerk en /sign-in
import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <SignIn redirectUrl="/dashboard"/>
        </main>
    );
}