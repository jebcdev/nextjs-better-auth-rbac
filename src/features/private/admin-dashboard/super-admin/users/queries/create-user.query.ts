"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUserAction } from "../actions";
import { usersQueryKey } from "./users-keys.type";
import type { CreateUserInput } from "../validations";

export function useCreateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserInput) => createUserAction(data),
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
