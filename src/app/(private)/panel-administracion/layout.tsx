import { AdminDashboardSideBar } from "@/features/private/admin-dashboard/components";
import { getSessionDetails } from "@/lib/auth/session-details";
import { validateAdminOrSuperAdmin } from "@/lib/auth/validate-role";
import {
    generateAsyncDescription,
    generateAsyncTitle,
} from "@/lib/seo";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Admin Dashboard"),
        description:
            await generateAsyncDescription("Admin Dashboard"),
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await validateAdminOrSuperAdmin();

    const { userName, isAdmin, isSuperAdmin, isAuthenticated } =
        await getSessionDetails();

    return (
        <div className="flex min-h-screen ">
            <AdminDashboardSideBar
                userName={userName}
                isAdmin={isAdmin}
                isSuperAdmin={isSuperAdmin}
            />
            <main className="flex-1 min-w-0 pl-1">{children}</main>
        </div>
    );
}
