"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { updateNameSchema, type UpdateNameInput } from "../validations";
import type { IGeneralResponse } from "@/features/shared/types/";

export async function updateProfileNameAction(
    data: UpdateNameInput,
): Promise<IGeneralResponse<null>> {
    try {
        const parsed = updateNameSchema.safeParse(data);

        if (!parsed.success) {
            return {
                success: false,
                error: true,
                message: "Datos inválidos",
            };
        }

        await auth.api.updateUser({
            body: {
                name: parsed.data.name,
            },
            headers: await headers(),
        });

        return {
            success: true,
            error: false,
            message: "Nombre actualizado correctamente",
            data: null,
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Error al actualizar el nombre",
        };
    }
}
