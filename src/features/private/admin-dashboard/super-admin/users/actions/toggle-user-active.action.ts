"use server";

import { z } from "zod";
import { getSessionDetails } from "@/lib/auth/session-details";
import { prismaDB } from "@/lib/db/prisma-db";
import type { IGeneralResponse } from "@/features/shared/types/";

const toggleActiveSchema = z.object({
    userId: z.string().min(1, "El ID de usuario es requerido"),
    isActive: z.boolean(),
});

export async function toggleUserActiveAction(
    data: z.infer<typeof toggleActiveSchema>,
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

        const parsed = toggleActiveSchema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                error: true,
                message: "Datos inválidos",
            };
        }

        const user = await prismaDB.user.findUnique({
            where: { id: parsed.data.userId },
        });

        if (!user) {
            return {
                success: false,
                error: true,
                message: "Usuario no encontrado",
            };
        }

        await prismaDB.user.update({
            where: { id: parsed.data.userId },
            data: { isActive: parsed.data.isActive },
        });

        return {
            success: true,
            error: false,
            message: parsed.data.isActive
                ? "Usuario activado correctamente"
                : "Usuario desactivado correctamente",
            data: null,
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Error al cambiar el estado del usuario",
        };
    }
}
