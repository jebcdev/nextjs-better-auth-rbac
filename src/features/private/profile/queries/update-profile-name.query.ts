"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProfileNameAction } from "../actions";
import { profileQueryKey } from "./profile-keys.type";
import type { UpdateNameInput } from "../validations";

export function useUpdateProfileNameMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateNameInput) => updateProfileNameAction(data),
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
