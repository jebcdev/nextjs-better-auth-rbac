import { generateAsyncDescription, generateAsyncTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { EditUserForm } from "@/features/private/admin-dashboard/super-admin/users/components/edit";
import { validateSuperAdmin } from "@/lib/auth/validate-role";
import { AdminDashboardHeader } from "@/features/private/admin-dashboard/components";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Editar Usuario"),
        description: await generateAsyncDescription(
            "Editar los datos de un usuario",
        ),
    };
}

interface PageProps {
    params: Promise<{ userId: string }>;
}

export default async function EditUserPage({ params }: PageProps) {
    const { userId } = await params;

    await validateSuperAdmin();

    return (
        <div className="container mx-auto py-8">
            <AdminDashboardHeader
                title="Edición de Usuarios"
                subtitle="Gestiona los datos del usuario"
                action={{
                    path: "/panel-administracion/usuarios/",
                    icon: <ArrowLeft />,
                    label: "Volver",
                }}
            />
            <EditUserForm userId={userId} />
        </div>
    );
}
