"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
    LoginSchema,
    LoginData,
} from "@/features/public/auth/validations";
import { prismaDB } from "@/lib/db/prisma-db";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types/";
import { User } from "@/lib/auth/auth";

export const loginAction = async (
    userData: LoginData,
): Promise<IGeneralResponse<User>> => {
    try {
        const validatedData = LoginSchema.safeParse(userData);

        if (!validatedData.success) {
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };
        }

        const userExists = await prismaDB.user.findFirst({
            where: { email: validatedData.data.email },
        });

        if (!userExists) {
            return {
                success: false,
                error: true,
                message: "El email o la contraseña son incorrectos",
            };
        }

        if (!userExists.isActive || userExists.banned) {
            return {
                success: false,
                error: true,
                message: "La cuenta de usuario no está activa",
            };
        }

        const response = await auth.api.signInEmail({
            body: {
                email: validatedData.data.email,
                password: validatedData.data.password,
                callbackURL: process.env.NEXT_PUBLIC_APP_URL!,
            },
            headers: await headers(),
        });

        // consoleLogger({ usuarioRecienLogeado: response });

        return {
            success: true,
            error: false,
            message: "Usuario iniciado sesión exitosamente",
            data: response.user,
        };
    } catch (error) {
        consoleLogger({ error });
        return {
            success: false,
            error: true,
            message: "Error al iniciar sesión, intenta nuevamente",
        };
    }
};
