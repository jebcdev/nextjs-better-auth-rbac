import { z } from "zod";

// ============================================
// ESQUEMA DE LOGIN
// ============================================
export const LoginSchema = z.object({
  email: z
    .string({ message: "El email es requerido" })
    .trim()
    .email({ message: "Formato de email inválido" })
    .toLowerCase()
    .max(255, { message: "El email no puede exceder los 255 caracteres" }),

  password: z
    .string({ message: "La contraseña es requerida" })
    .trim()
    .min(1, { message: "La contraseña es requerida" }),
});

export type LoginData = z.infer<typeof LoginSchema>;