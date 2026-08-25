"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { changeEmailAction } from "../actions";
import { profileQueryKey } from "./profile-keys.type";
import type { ChangeEmailInput } from "../validations";

export function useChangeEmailMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangeEmailInput) => changeEmailAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }

            queryClient.invalidateQueries({ queryKey: profileQueryKey });
            toast.success(response.message);
        },
        onError: () => {
            toast.error("Error inesperado. Intenta de nuevo.");
        },
    });
}
