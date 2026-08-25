"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { getSessionDetails } from "@/lib/auth/session-details";
import type { IGeneralResponse } from "@/features/shared/types/";

export async function getSuperAdminGetUserByIdAction(
    userId: string,
): Promise<IGeneralResponse<unknown>> {
    try {
        const session = await getSessionDetails();

        if (!session.isSuperAdmin) {
            return {
                success: false,
                error: true,
                message: "No autorizado. Se requiere rol SUPER_ADMIN",
            };
        }

        const result = await auth.api.listUsers({
            headers: await headers(),
            query: {},
        });

        const user = (result.users as Array<{ id: string }>)?.find((u) => u.id === userId);

        if (!user) {
            return {
                success: false,
                error: true,
                message: "Usuario no encontrado",
            };
        }

        return {
            success: true,
            error: false,
            message: "Usuario obtenido correctamente",
            data: user,
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Error al obtener el usuario",
        };
    }
}
