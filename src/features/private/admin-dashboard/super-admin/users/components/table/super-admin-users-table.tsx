"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    useTable,
    flexRender,
    type SortingState,
} from "@tanstack/react-table";
import { features } from "./super-admin-users-table-features";
import { Role } from "@/generated/prisma/enums";
import { getSuperAdminUsers } from "../../actions/get-super-admin-users.action";
import { usersQueryKey } from "../../queries/users-keys.type";
import { columns } from "./super-admin-users-table-columns";
import { TableFilters } from "./table-filters";
import { TablePagination } from "./table-pagination";
import Loading from "@/app/loading";
import ErrorPage from "@/app/error";
import NotFound from "@/app/not-found";

interface UserRow {
    id: string;
    email: string;
    name: string;
    role: string;
    banned: boolean | null;
    isActive: boolean | null;
    createdAt: string;
}

export function SuperAdminUsersTable() {
    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "all" | "banned" | "not-banned"
    >("all");
    const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading, isError } = useQuery({
        queryKey: usersQueryKey,
        queryFn: async () => {
            const result = await getSuperAdminUsers({
                page: 1,
                pageSize: 10000,
            });
            if (!result.success) {
                throw new Error(result.message);
            }
            return result.data.data as UserRow[];
        },
    });

    const users = data;

    const filteredData = useMemo(() => {
        if (!users) return [];
        return users.filter((user) => {
            if (statusFilter === "banned" && user.banned !== true) return false;
            if (statusFilter === "not-banned" && user.banned === true) return false;
            if (roleFilter !== "all" && user.role !== roleFilter) return false;
            if (globalFilter) {
                const q = globalFilter.toLowerCase();
                if (
                    !user.name?.toLowerCase().includes(q) &&
                    !user.email?.toLowerCase().includes(q) &&
                    !user.role?.toLowerCase().includes(q)
                ) return false;
            }
            return true;
        });
    }, [users, statusFilter, roleFilter, globalFilter]);

    const pageCount = Math.ceil(filteredData.length / pageSize);

    const safePageIndex = Math.min(pageIndex, Math.max(0, pageCount - 1));

    const paginatedData = useMemo(() => {
        const start = safePageIndex * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, safePageIndex, pageSize]);

    const table = useTable({
        features,
        data: paginatedData,
        columns: columns as any,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    });

    if (isLoading) {
        return <Loading message="Cargando usuarios" />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    if (!users || users.length === 0) {
        return <NotFound />;
    }

    return (
        <div className="space-y-4">
            <TableFilters
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                roleFilter={roleFilter}
                onRoleFilterChange={setRoleFilter}
            />
            <div className="overflow-x-auto rounded-md border">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-8 text-sm text-muted-foreground"
                                >
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-t hover:bg-muted/30 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-4 py-3 text-sm"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <TablePagination
                pageIndex={safePageIndex}
                pageSize={pageSize}
                pageCount={pageCount}
                onPageChange={setPageIndex}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPageIndex(0);
                }}
            />
        </div>
    );
}
