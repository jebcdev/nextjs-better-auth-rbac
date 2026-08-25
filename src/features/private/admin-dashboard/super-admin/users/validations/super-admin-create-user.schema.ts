import { z } from "zod";
import { Role } from "@/generated/prisma/enums";

export const createUserSchema = z.object({
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
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
    role: z
        .nativeEnum(Role, { error: "El rol no es válido" })
        .default(Role.USER)
        .optional(),
    isActive: z
        .boolean()
        .default(true)
        .optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
