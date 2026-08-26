import {
    generateAsyncDescription,
    generateAsyncTitle,
} from "@/lib/seo";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle(),
        description: await generateAsyncDescription(),
    };
}

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-12">
            {/* Header / Brand */}
            <header className="max-w-5xl mx-auto w-full flex justify-between items-center pb-8 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-lg tracking-wide">RBAC Engine</span>
                </div>
                <nav>
                    <a 
                        href="/inicio" 
                        className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-700"
                    >
                        Iniciar Sesión
                    </a>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="max-w-3xl mx-auto text-center my-auto py-12">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 mb-4">
                    Control de Acceso Seguro
                </span>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
                    Gestión de Roles y Permisos en tiempo real
                </h1>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Plataforma centralizada para la administración de usuarios, asignación de roles dinámicos y auditoría de accesos granular.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a 
                        href="/panel-administracion" 
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-950"
                    >
                        Ir al Dashboard
                    </a>
                    <a 
                        href="/roles" 
                        className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium px-6 py-3 rounded-xl transition-all border border-slate-800"
                    >
                        Ver Estructura de Roles
                    </a>
                </div>
            </section>

            {/* Quick Overview Badges */}
            <footer className="max-w-5xl mx-auto w-full pt-8 border-t border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                        <p className="text-sm font-semibold text-white">Admin</p>
                        <p className="text-xs text-slate-400 mt-1">Acceso total, gestión de usuarios y políticas.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                        <p className="text-sm font-semibold text-white">Manager</p>
                        <p className="text-xs text-slate-400 mt-1">Gestión de recursos y reportes de equipo.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                        <p className="text-sm font-semibold text-white">User</p>
                        <p className="text-xs text-slate-400 mt-1">Acceso restringido a módulos asignados.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}