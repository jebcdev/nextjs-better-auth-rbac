"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { features } from "./super-admin-users-table-features";
import { Badge } from "@/features/shared/components/ui/badge";
import { TableActions } from "./";
import {  getRoleLabel } from "@/lib/utils/enums-labels";
import { Role } from "@/generated/prisma/enums";


interface UserRow {
    id: string;
    email: string;
    name: string;
    role: Role;
    banned: boolean | null;
    isActive: boolean | null;
    createdAt: string;
}

const columnHelper = createColumnHelper<typeof features, UserRow>();

export const columns = columnHelper.columns([
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <TableActions user={row.original} />,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="font-medium">{row.original.email}</span>
        ),
    },
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => row.original.name || "—",
    },
    {
        accessorKey: "role",
        header: "Rol",
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.role === Role.SUPER_ADMIN
                        ? "destructive"
                        : "secondary"
                }
            >
                {getRoleLabel(row.original.role)}
            </Badge>
        ),
    },
    {
        accessorKey: "banned",
        header: "Estado",
        cell: ({ row }) => (
            <Badge
                variant={row.original.banned ? "destructive" : "default"}
            >
                {row.original.banned ? "Suspendido" : "Activo"}
            </Badge>
        ),
    },
]);
