import { generateAsyncDescription, generateAsyncTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { CreateUserForm } from "@/features/private/admin-dashboard/super-admin/users/components/new";
import { validateSuperAdmin } from "@/lib/auth/validate-role";
import { AdminDashboardHeader } from "@/features/private/admin-dashboard/components";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Nuevo Usuario"),
        description: await generateAsyncDescription(
            "Crear un nuevo usuario",
        ),
    };
}

export default async function NewUserPage() {
    await validateSuperAdmin();

    return (
        <div className="container mx-auto py-8">
            <AdminDashboardHeader
                title="Creación de Usuarios"
                subtitle="Crea un Nuevo Usuario"
                action={{
                    path: "/admin-dashboard/users/",
                    icon: <ArrowLeft/>,
                    label: "Volver",
                }}
            />
            <CreateUserForm />
        </div>
    );
}
