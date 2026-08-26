"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { getSessionDetails } from "@/lib/auth/session-details";
import { updateUserSchema, type UpdateUserInput } from "../validations";
import type { IGeneralResponse } from "@/features/shared/types/";
import { consoleLogger } from "@/lib/logger/console-logger";

export async function updateUserAction(
    data: UpdateUserInput,
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

        const parsed = updateUserSchema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                error: true,
                message: "Datos inválidos",
            };
        }

        if (
            parsed.data.role &&
            session.currentUser?.id === parsed.data.userId &&
            parsed.data.role !== "SUPER_ADMIN"
        ) {
            return {
                success: false,
                error: true,
                message: "No puedes modificar tu propio rol",
            };
        }

        // 1. Datos generales (nombre, email, rol) — SIN password
        const updateData: Record<string, unknown> = {
            name: parsed.data.name,
            email: parsed.data.email,
        };

        if (parsed.data.role) {
            updateData.role = parsed.data.role;
        }

        await auth.api.adminUpdateUser({
            body: {
                userId: parsed.data.userId,
                data: updateData,
            },
            headers: await headers(),
        });

        // 2. Password, aparte, solo si viene y cumple longitud mínima
        if (parsed.data.password && parsed.data.password.length >= 8) {
            await auth.api.setUserPassword({
                body: {
                    userId: parsed.data.userId,
                    newPassword: parsed.data.password,
                },
                headers: await headers(),
            });
        }

        return {
            success: true,
            error: false,
            message: "Usuario actualizado correctamente",
            data: null,
        };
    } catch (error) {
        consoleLogger("updateUserAction", "error", error);
        return {
            success: false,
            error: true,
            message: "Error al actualizar el usuario",
        };
    }
}