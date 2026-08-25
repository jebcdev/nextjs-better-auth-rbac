"use client";

import {
    Building2,
    Globe2,
    LayoutDashboard,
    LogOut,
    MapPin,
    Menu,
    PanelRightClose,
    PanelRightOpen,
    Users,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { logoutAction } from "@/features/public/auth/actions";
import {
    Button,
    Separator,
    Sheet,
    SheetContent,
    SheetTrigger,
    TooltipProvider,
} from "@/features/shared/components/ui";

import {
    AdminDashboardSidebarItem,
    AdminDashboardSidebarSubItem,
} from "./";

interface SubItem {
    icon: LucideIcon;
    label: string;
    path: string;
    superAdminOnly?: boolean;
}

interface SidebarItem {
    icon: LucideIcon;
    label: string;
    path: string; // Opcional, si tiene subItems
    subItems?: SubItem[];
    superAdminOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
    {
        icon: Users,
        label: "Usuarios",
        path: "/admin-dashboard/users",
        superAdminOnly: true,
    },
    {
        icon: Globe2, // Asegúrate de importar los iconos
        label: "Ubicaciones",
        path: "/admin-dashboard/ubicaciones/",
        subItems: [
            {
                icon: Globe2,
                label: "Países",
                path: "/admin-dashboard/ubicaciones/paises",
            },
            {
                icon: MapPin,
                label: "Departamentos",
                path: "/admin-dashboard/ubicaciones/departamentos",
            },
            {
                icon: Building2,
                label: "Ciudades",
                path: "/admin-dashboard/ubicaciones/ciudades",
            },
        ],
    },
];

interface Props {
    userName: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
}

function SidebarContent({
    userName,
    isSuperAdmin,
    isCollapsed,
    onToggleCollapse,
    onNavigate,
}: Props & {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    onNavigate?: () => void;
}) {
    const filteredItems = sidebarItems.filter(
        (item) => !item.superAdminOnly || isSuperAdmin,
    );

    return (
        <div
            data-collapsed={isCollapsed}
            className="flex h-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground transition-all duration-200 data-[collapsed=true]:w-16 data-[collapsed=false]:w-60"
        >
            <div className="flex items-center justify-between gap-2 border-b border-sidebar-border">
                {!isCollapsed && (
                    <Link
                        href="/admin-dashboard"
                        onClick={onNavigate}
                        className="flex items-center gap-2 truncate text-sm font-medium hover:opacity-80"
                    >
                        <LayoutDashboard className="h-4 w-4 shrink-0" />
                        <span className="truncate">{userName}</span>
                    </Link>
                )}
                {isCollapsed && (
                    <Link
                        href="/admin-dashboard"
                        onClick={onNavigate}
                        className="flex items-center justify-center"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                    </Link>
                )}
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onToggleCollapse}
                    className="shrink-0"
                >
                    {isCollapsed ? (
                        <PanelRightOpen className="h-4 w-4" />
                    ) : (
                        <PanelRightClose className="h-4 w-4" />
                    )}
                </Button>
            </div>
            <Separator />

            <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2 [&::-webkit-scrollbar]:hidden">
                <nav className="flex flex-col gap-1">
                    {filteredItems.map((item) => {
                        // Si tiene subItems, renderiza el componente con sub-items
                        if (
                            item.subItems &&
                            item.subItems.length > 0
                        ) {
                            // Filtrar subItems según permisos
                            const filteredSubItems =
                                item.subItems.filter(
                                    (sub) =>
                                        !sub.superAdminOnly ||
                                        isSuperAdmin,
                                );

                            if (filteredSubItems.length === 0)
                                return null;

                            return (
                                <AdminDashboardSidebarSubItem
                                    key={item.label}
                                    icon={item.icon}
                                    label={item.label}
                                    path={item.path}
                                    subItems={filteredSubItems}
                                    isCollapsed={isCollapsed}
                                    onNavigate={onNavigate}
                                />
                            );
                        }

                        // Si no tiene subItems, renderiza el item normal
                        return (
                            <AdminDashboardSidebarItem
                                key={item.path}
                                icon={item.icon}
                                label={item.label}
                                path={item.path!}
                                isCollapsed={isCollapsed}
                                onNavigate={onNavigate}
                            />
                        );
                    })}
                </nav>
            </div>
            <div className="mt-auto border-t border-sidebar-border p-3">
                <form
                    action={async (
                        _formData: FormData,
                    ): Promise<void> => {
                        await logoutAction();
                    }}
                >
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        size={isCollapsed ? "icon-sm" : "default"}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!isCollapsed && (
                            <span>Cerrar sesi&oacute;n</span>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export const AdminDashboardSideBar = ({
    userName,
    isAdmin,
    isSuperAdmin,
}: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const toggleCollapse = () => setIsCollapsed((prev) => !prev);
    const closeSheet = () => setIsSheetOpen(false);

    return (
        <TooltipProvider>
            {/* Mobile hamburger - visible only on small screens */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <Sheet
                    open={isSheetOpen}
                    onOpenChange={setIsSheetOpen}
                >
                    <SheetTrigger asChild>
                        <Button
                            size="icon"
                            className="h-10 w-10 rounded-md shadow-lg bg-background"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        <SidebarContent
                            userName={userName}
                            isAdmin={isAdmin}
                            isSuperAdmin={isSuperAdmin}
                            isCollapsed={false}
                            onToggleCollapse={() => {}}
                            onNavigate={closeSheet}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop sidebar - hidden on mobile */}
            <aside className="sticky top-0 hidden h-screen overflow-hidden md:block">
                <div className="h-full w-fit overflow-hidden">
                    <SidebarContent
                        userName={userName}
                        isAdmin={isAdmin}
                        isSuperAdmin={isSuperAdmin}
                        isCollapsed={isCollapsed}
                        onToggleCollapse={toggleCollapse}
                    />
                </div>
            </aside>
        </TooltipProvider>
    );
};
