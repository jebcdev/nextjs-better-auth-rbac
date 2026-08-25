"use client";

import { Input } from "@/features/shared/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/features/shared/components/ui/select";
import { Button } from "@/features/shared/components/ui/button";
import { Role } from "@/generated/prisma/enums";

interface TableFiltersProps {
    globalFilter: string;
    onGlobalFilterChange: (value: string) => void;
    statusFilter: "all" | "banned" | "not-banned";
    onStatusFilterChange: (value: "all" | "banned" | "not-banned") => void;
    roleFilter: "all" | Role;
    onRoleFilterChange: (value: "all" | Role) => void;
}

const roleOptions: { value: "all" | Role; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: Role.SUPER_ADMIN, label: "Super Admin" },
    { value: Role.ADMIN, label: "Admin" },
    // { value: Role.TECHNICIAN, label: "Técnico" },
    { value: Role.USER, label: "Usuario" },
];

export function TableFilters({
    globalFilter,
    onGlobalFilterChange,
    statusFilter,
    onStatusFilterChange,
    roleFilter,
    onRoleFilterChange,
}: TableFiltersProps) {
    return (
        <div className="flex items-center gap-4 flex-wrap">
            <Input
                placeholder="Buscar por email o nombre..."
                value={globalFilter}
                onChange={(e) => onGlobalFilterChange(e.target.value)}
                className="max-w-sm"
            />
            <Select
                value={statusFilter}
                onValueChange={(value: "all" | "banned" | "not-banned") =>
                    onStatusFilterChange(value)
                }
            >
                <SelectTrigger className="w-45">
                    <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="banned">Suspendidos</SelectItem>
                    <SelectItem value="not-banned">Activos</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
                {roleOptions.map((option) => (
                    <Button
                        key={option.value}
                        size="sm"
                        variant={roleFilter === option.value ? "default" : "outline"}
                        onClick={() => onRoleFilterChange(option.value)}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
