"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { getSessionDetails } from "@/lib/auth/session-details";
import type { IGeneralResponse } from "@/features/shared/types/";

export async function getAllUsersAction(): Promise<
    IGeneralResponse<{ users: unknown[] }>
> {
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

        return {
            success: true,
            error: false,
            message: "Usuarios obtenidos correctamente",
            data: {
                users: result.users,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Error al obtener los usuarios",
        };
    }
}
