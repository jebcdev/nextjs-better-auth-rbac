"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserAction } from "../actions";
import { usersQueryKey } from "./users-keys.type";
import type { UpdateUserInput } from "../validations";

export function useUpdateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserInput) => updateUserAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }

            queryClient.invalidateQueries({ queryKey: usersQueryKey });
            toast.success(response.message);
        },
        onError: () => {
            toast.error("Error inesperado. Intenta de nuevo.");
        },
    });
}
