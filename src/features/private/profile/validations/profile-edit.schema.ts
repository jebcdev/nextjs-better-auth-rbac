import { z } from "zod";

export const updateNameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "El nombre es requerido")
        .max(100, "El nombre no puede tener más de 100 caracteres"),
});

export type UpdateNameInput = z.infer<typeof updateNameSchema>;

export const changeEmailSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("El email no es válido"),
});

export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, "La contraseña actual es requerida"),
        newPassword: z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres"),
        confirmPassword: z
            .string()
            .min(1, "Debes confirmar la nueva contraseña"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
