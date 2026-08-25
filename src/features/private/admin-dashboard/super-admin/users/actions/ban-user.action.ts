"use server";

import { z } from "zod";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { getSessionDetails } from "@/lib/auth/session-details";
import type { IGeneralResponse } from "@/features/shared/types/";
import { consoleLogger } from "@/lib/logger/console-logger";

const banUserSchema = z.object({
    userId: z.string().min(1, "El ID de usuario es requerido"),
    banReason: z.string().optional(),
});

const unbanUserSchema = z.object({
    userId: z.string().min(1, "El ID de usuario es requerido"),
});

export async function banUserAction(
    data: z.infer<typeof banUserSchema>,
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

        const parsed = banUserSchema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                error: true,
                message: "Datos inválidos",
            };
        }

        await auth.api.banUser({
            body: {
                userId: parsed.data.userId,
                banReason: parsed.data.banReason,
            },
            headers: await headers(),
        });

        return {
            success: true,
            error: false,
            message: "Usuario suspendido correctamente",
            data: null,
        };
    } catch (error) {
        consoleLogger("banUserAction error:", error);
        return {
            success: false,
            error: true,
            message: "Error al suspender el usuario",
        };
    }
}

export async function unbanUserAction(
    data: z.infer<typeof unbanUserSchema>,
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

        const parsed = unbanUserSchema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                error: true,
                message: "Datos inválidos",
            };
        }

        await auth.api.unbanUser({
            body: {
                userId: parsed.data.userId,
            },
            headers: await headers(),
        });

        return {
            success: true,
            error: false,
            message: "Usuario restaurado correctamente",
            data: null,
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Error al restaurar el usuario",
        };
    }
}
