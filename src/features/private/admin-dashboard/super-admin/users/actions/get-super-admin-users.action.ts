"use server";

import { prismaDB } from "@/lib/db/prisma-db";
import { getSessionDetails } from "@/lib/auth/session-details";
import type { IGeneralResponse } from "@/features/shared/types/";

interface GetUsersParams {
    page: number;
    pageSize: number;
    globalFilter?: string;
    statusFilter?: "all" | "banned" | "not-banned";
}

export async function getSuperAdminUsers(
    params: GetUsersParams,
): Promise<IGeneralResponse<{ data: unknown[]; totalCount: number }>> {
    try {
        const session = await getSessionDetails();

        if (!session.isSuperAdmin) {
            return {
                success: false,
                error: true,
                message: "No autorizado. Se requiere rol SUPER_ADMIN",
            };
        }

        const { page, pageSize, globalFilter, statusFilter } = params;
        const skip = (page - 1) * pageSize;

        const where: Record<string, unknown> = {};

        if (globalFilter) {
            where.OR = [
                { email: { contains: globalFilter, mode: "insensitive" } },
                { name: { contains: globalFilter, mode: "insensitive" } },
            ];
        }

        if (statusFilter === "banned") {
            where.banned = true;
        } else if (statusFilter === "not-banned") {
            where.banned = false;
        }

        const [data, totalCount] = await Promise.all([
            prismaDB.user.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    banned: true,
                    banReason: true,
                    isActive: true,
                    createdAt: true,
                },
            }),
            prismaDB.user.count({ where }),
        ]);

        return {
            success: true,
            error: false,
            message: "Usuarios obtenidos correctamente",
            data: { data, totalCount },
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Error al obtener los usuarios",
        };
    }
}
