"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { changeEmailSchema, type ChangeEmailInput } from "../validations";
import type { IGeneralResponse } from "@/features/shared/types/";

export async function changeEmailAction(
    data: ChangeEmailInput,
): Promise<IGeneralResponse<null>> {
    try {
        const parsed = changeEmailSchema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                error: true,
                message: "Datos inválidos",
            };
        }

        await auth.api.changeEmail({
            body: {
                newEmail: parsed.data.email,
            },
            headers: await headers(),
        });

        return {
            success: true,
            error: false,
            message: "Correo electrónico actualizado correctamente",
            data: null,
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Error al actualizar el correo electrónico",
        };
    }
}
