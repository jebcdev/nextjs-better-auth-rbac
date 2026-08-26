import { generateAsyncDescription, generateAsyncTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { SuperAdminUsersTable } from "@/features/private/admin-dashboard/super-admin/users/components/table";
import { validateSuperAdmin } from "@/lib/auth/validate-role";
import { AdminDashboardHeader } from "@/features/private/admin-dashboard/components";
import { UserPlus } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Gestión de Usuarios"),
        description: await generateAsyncDescription(
            "Panel de administración de usuarios",
        ),
    };
}

export default async function UsersPage() {
    await validateSuperAdmin();

    return (
        <div className="container mx-auto py-8">
            <AdminDashboardHeader
                title="Gestión de Usuarios"
                subtitle="Gestiona los Usuarios del Sistema"
                action={{
                    path: "/panel-administracion/usuarios/nuevo",
                    icon: <UserPlus/>,
                    label: "Nuevo usuario",
                }}
            />
            <SuperAdminUsersTable />
        </div>
    );
}
