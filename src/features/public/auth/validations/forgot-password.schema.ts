import { z } from "zod";

// ============================================
// ESQUEMA PARA RESTABLECER CONTRASEÑA
// ============================================
export const ForgotPasswordSchema = z.object({
  email: z
    .string({ message: "El email es requerido" })
    .trim()
    .email({ message: "Formato de email inválido" })
    .toLowerCase(),
});

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;