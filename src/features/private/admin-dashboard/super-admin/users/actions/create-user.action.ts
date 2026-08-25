"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { getSessionDetails } from "@/lib/auth/session-details";
import { createUserSchema, type CreateUserInput } from "../validations";
import type { IGeneralResponse } from "@/features/shared/types/";

export async function createUserAction(
    data: CreateUserInput,
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

        const parsed = createUserSchema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                error: true,
                message: "Datos inválidos",
            };
        }

        await auth.api.createUser({
            body: {
                name: parsed.data.name,
                email: parsed.data.email,
                password: parsed.data.password,
                role: parsed.data.role as any,
                data: {
                    isActive: parsed.data.isActive,
                },
            },
            headers: await headers(),
        });

        return {
            success: true,
            error: false,
            message: "Usuario creado correctamente",
            data: null,
        };
    } catch (error) {
        const message =
            error instanceof Error &&
            (error.message.includes("email") || error.message.includes("already"))
                ? "El correo electrónico ya está registrado"
                : "Error al crear el usuario";

        return {
            success: false,
            error: true,
            message,
        };
    }
}
