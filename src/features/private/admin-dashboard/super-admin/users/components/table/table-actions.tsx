"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/features/shared/components/ui/button";
import { Eye, Pencil, Prohibit, CheckCircle } from "@phosphor-icons/react";
import {
    useBanUserMutation,
    useUnbanUserMutation,
} from "@/features/private/admin-dashboard/super-admin/users/queries";

interface UserRow {
    id: string;
    banned: boolean | null;
}

interface TableActionsProps {
    user: UserRow;
}

export function TableActions({ user }: TableActionsProps) {
    const router = useRouter();
    const banMutation = useBanUserMutation();
    const unbanMutation = useUnbanUserMutation();

    const handleBan = () =>
        banMutation.mutate({ userId: user.id });
    const handleUnban = () =>
        unbanMutation.mutate({ userId: user.id });

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon-xs"
                onClick={() =>
                    router.push(`/admin-dashboard/users/${user.id}`)
                }
                title="Ver detalle"
            >
                <Eye className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon-xs"
                onClick={() =>
                    router.push(`/admin-dashboard/users/${user.id}`)
                }
                title="Editar"
            >
                <Pencil className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon-xs"
                onClick={user.banned ? handleUnban : handleBan}
                title={user.banned ? "Restaurar usuario" : "Suspender usuario"}
                className={user.banned ? "text-green-500" : "text-red-500"}
                disabled={banMutation.isPending || unbanMutation.isPending}
            >
                {user.banned ? (
                    <CheckCircle className="h-4 w-4" />
                ) : (
                    <Prohibit className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
}
