"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleUserActiveAction } from "../actions";
import { usersQueryKey } from "./users-keys.type";

interface ToggleUserActiveInput {
    userId: string;
    isActive: boolean;
}

export function useToggleUserActiveMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ToggleUserActiveInput) =>
            toggleUserActiveAction(data),
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
