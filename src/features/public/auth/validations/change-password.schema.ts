import { z } from "zod";

// ============================================
// ESQUEMA PARA CAMBIAR CONTRASEÑA (cuando estás logueado)
// ============================================
export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: "La contraseña actual es requerida" })
      .trim()
      .min(1, { message: "La contraseña actual es requerida" }),

    newPassword: z
      .string({ message: "La nueva contraseña es requerida" })
      .trim()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(72, { message: "La contraseña no puede exceder los 72 caracteres" })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una mayúscula",
      })
      .regex(/[a-z]/, {
        message: "La contraseña debe contener al menos una minúscula",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "La contraseña debe contener al menos un carácter especial",
      }),

    confirmNewPassword: z
      .string({ message: "Debes confirmar tu nueva contraseña" })
      .trim()
      .min(1, { message: "La confirmación de contraseña es requerida" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
  });

  export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;