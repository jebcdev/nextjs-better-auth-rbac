"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePasswordAction } from "../actions";
import type { ChangePasswordInput } from "../validations";

export function useChangePasswordMutation() {
    return useMutation({
        mutationFn: (data: ChangePasswordInput) => changePasswordAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success(response.message);
        },
        onError: () => {
            toast.error("Error inesperado. Intenta de nuevo.");
        },
    });
}
