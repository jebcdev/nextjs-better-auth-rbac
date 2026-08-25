import { z } from "zod";
import { Role } from "@/generated/prisma/enums";

export const updateUserSchema = z.object({
    userId: z
        .string()
        .min(1, "El ID de usuario es requerido"),
    name: z
        .string()
        .trim()
        .min(1, "El nombre es requerido")
        .max(100, "El nombre no puede tener más de 100 caracteres"),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("El email no es válido"),
    role: z
        .nativeEnum(Role, { error: "El rol no es válido" })
        .optional(),
    isActive: z
        .boolean()
        .optional(),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .optional()
        .or(z.literal("")),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
