import type { Metadata } from "next";
import { redirect } from "next/navigation";



import {
    generateAsyncDescription,
    generateAsyncTitle,
} from "@/lib/seo";
import { getSessionDetails } from "@/lib/auth/session-details";
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Acceso a la Plataforma"),
        description: await generateAsyncDescription(
            "Inicia Sesión o Regístrate en El Sistema",
        ),
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const sessionDetails = await getSessionDetails();
    if(sessionDetails.isAuthenticated) return redirect("/");
        
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-50 antialiased">
            <div className="w-full max-w-md space-y-6">
                {/* Mensaje Informativo */}
                <header className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Acceso a la Plataforma
                    </h1>
                    <p className="text-sm text-slate-600">
                        Sistema de gestión de usuarios con roles y permisos. Proyecto de demostración desarrollado con Next.js, TypeScript, Tailwind CSS, Zod, React Hook Form, NextAuth.js, Prisma y PostgreSQL.
                    </p>
                </header>

                {/* Tarjeta donde se renderiza el formulario */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                    {children}
                </div>
            </div>
        </main>
    );
}