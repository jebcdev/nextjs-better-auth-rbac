"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { UserIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react";
import type { User } from "@/lib/auth/auth";

import { Button } from "@/features/shared/components/ui/button";
import {
    Avatar,
    AvatarFallback,
} from "@/features/shared/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/features/shared/components/ui/dropdown-menu";
import { logoutAction } from "@/features/public/auth/actions/logout.action";

export interface HeaderNavOption {
    icon: LucideIcon;
    label: string;
    href: string;
}

interface GeneralHeaderProps {
    currentUser: User | null;
    isAdmin: boolean;
    isSuperAdmin: boolean;
}

const navOptions: HeaderNavOption[] = [
    { icon: UserIcon, label: "Perfil", href: "/perfil" },
];

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function GeneralHeader({
    currentUser,
    isAdmin,
    isSuperAdmin,
}: GeneralHeaderProps) {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();
        router.push("/");
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
            <div className="mx-auto flex h-12 max-w-7xl items-center px-4">
                <Link
                    href="/"
                    className="flex-1 text-center text-sm font-medium hover:text-muted-foreground transition-colors md:flex-none md:text-left"
                >
                    Inicio
                </Link>

                <div className="hidden flex-1 md:block" />

                <div className="flex items-center gap-2">
                    {currentUser ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <Avatar size="sm">
                                        <AvatarFallback>
                                            {getInitials(
                                                currentUser.name ??
                                                    "",
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-40"
                            >
                                {navOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <DropdownMenuItem
                                            key={option.href}
                                            asChild
                                        >
                                            <Link href={option.href}>
                                                <Icon />
                                                {option.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    );
                                })}
                                {(isAdmin || isSuperAdmin) && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/panel-administracion">
                                            <ShieldCheckIcon />
                                            Admin
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={handleLogout}
                                >
                                    <LogOutIcon />
                                    Cerrar sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/inicio">
                                    Iniciar sesión
                                </Link>
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                asChild
                            >
                                <Link href="/registro">Registro</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
