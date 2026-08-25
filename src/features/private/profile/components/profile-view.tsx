"use client";

import type { User } from "@/generated/prisma/client";
import {
    Card,
    CardContent,
} from "@/features/shared/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/features/shared/components/ui/";
import { Badge } from "@/features/shared/components/ui/badge";

interface ProfileViewProps {
    user: User;
}

function getInitials(name: string | null): string {
    if (!name) return "--";

    return name
        .split(" ")
        .map((n) => n.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
}

function getRoleBadgeVariant(
    role: string | null,
): "default" | "secondary" | "outline" {
    switch (role) {
        case "SUPER_ADMIN":
            return "default";
        case "ADMIN":
            return "secondary";
        default:
            return "outline";
    }
}

function getRoleLabel(role: string | null): string {
    switch (role) {
        case "SUPER_ADMIN":
            return "Super Admin";
        case "ADMIN":
            return "Administrador";
        case "USER":
            return "Usuario";
        default:
            return "Sin rol";
    }
}

function getAccountStatus(user: User): {
    label: string;
    variant: "default" | "secondary" | "destructive";
} {
    if (user.banned)
        return { label: "Suspendida", variant: "destructive" };
    if (user.isActive === false)
        return { label: "Inactiva", variant: "destructive" };
    return { label: "Activa", variant: "default" };
}

function getEmailStatus(user: User): {
    label: string;
    variant: "default" | "secondary" | "outline";
} {
    return user.emailVerified
        ? { label: "Verificado", variant: "default" }
        : { label: "No verificado", variant: "outline" };
}

export function ProfileView({ user }: ProfileViewProps) {
    const accountStatus = getAccountStatus(user);
    const emailStatus = getEmailStatus(user);

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-start gap-5">
                    <Avatar size="lg">
                        {user.image ? (
                            <AvatarImage
                                src={user.image}
                                alt={user.name ?? "Usuario"}
                            />
                        ) : null}
                        <AvatarFallback className="text-lg">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold tracking-tight">
                            {user.name ?? "Usuario"}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleLabel(user.role)}
                    </Badge>
                    <Badge variant={accountStatus.variant}>
                        {accountStatus.label}
                    </Badge>
                    <Badge variant={emailStatus.variant}>
                        {emailStatus.label}
                    </Badge>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                    Miembro desde {formatDate(user.createdAt)}
                </p>
            </CardContent>
        </Card>
    );
}
