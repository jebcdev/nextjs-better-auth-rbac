"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
    RegisterData,
    RegisterSchema,
} from "@/features/public/auth/validations";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types";
import { User } from "@/lib/auth/auth";

export const registerAction = async (
    userData: RegisterData,
): Promise<IGeneralResponse<User>> => {
    try {
        const validatedData = RegisterSchema.safeParse(userData);

        if (!validatedData.success) {
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };
        }

        const { name, email, password } = validatedData.data;

        const response = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: process.env.NEXT_PUBLIC_APP_URL!,
            },
            headers: await headers(),
        });

        consoleLogger({ usuarioRecienRegistrado: response });

        return {
            success: true,
            error: false,
            message: "Usuario registrado exitosamente",
            data: response.user,
        };
    } catch (error) {
        consoleLogger({ error });

        const message =
            error instanceof Error &&
            error.message?.toLowerCase().includes("already")
                ? "El email ya está registrado"
                : "Error al registrar usuario, intenta nuevamente";

        return {
            success: false,
            error: true,
            message,
        };
    }
};
