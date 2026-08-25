"use server";

import { prismaDB } from "@/lib/db/prisma-db";
import { getSessionDetails } from "@/lib/auth/session-details";
import { updateTag } from "next/cache";
import type { IGeneralResponse } from "@/features/shared/types";
import { consoleLogger } from "@/lib/logger/console-logger";

export async function toggleUserBan(
    userId: string,
): Promise<IGeneralResponse<null>> {
    try {
        const session = await getSessionDetails();

        if (!session.isSuperAdmin) {
            return {
                success: false,
                error: true,
                message: "No autorizado. Se requiere rol SUPER_ADMIN",
            };
        }

        const user = await prismaDB.user.findUnique({
            where: { id: userId },
            select: { banned: true },
        });

        if (!user) {
            return {
                success: false,
                error: true,
                message: "Usuario no encontrado",
            };
        }

        await prismaDB.user.update({
            where: { id: userId },
            data: { banned: user.banned ? false : true },
        });

        updateTag("super-admin-users");

        return {
            success: true,
            error: false,
            message: user.banned
                ? "Usuario restaurado correctamente"
                : "Usuario suspendido correctamente",
            data: null,
        };
    } catch (error) {
        consoleLogger("toggleUserBan error:", error);
        return {
            success: false,
            error: true,
            message: "Error al cambiar el estado del usuario",
        };
    }
}
