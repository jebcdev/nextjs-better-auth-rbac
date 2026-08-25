"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
    changePasswordSchema,
    type ChangePasswordInput,
} from "../validations";
import type { IGeneralResponse } from "@/features/shared/types/";

export async function changePasswordAction(
    data: ChangePasswordInput,
): Promise<IGeneralResponse<null>> {
    try {
        const parsed = changePasswordSchema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                error: true,
                message: "Datos inválidos",
            };
        }

        await auth.api.changePassword({
            body: {
                currentPassword: parsed.data.currentPassword,
                newPassword: parsed.data.newPassword,
                revokeOtherSessions: true,
            },
            headers: await headers(),
        });

        return {
            success: true,
            error: false,
            message: "Contraseña actualizada correctamente",
            data: null,
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Error al actualizar la contraseña",
        };
    }
}
