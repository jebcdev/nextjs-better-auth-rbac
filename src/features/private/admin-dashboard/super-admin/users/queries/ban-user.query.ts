"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { banUserAction, unbanUserAction } from "../actions";
import { usersQueryKey } from "./users-keys.type";
import { consoleLogger } from "@/lib/logger/console-logger";

interface BanUserInput {
    userId: string;
    banReason?: string;
}

interface UnbanUserInput {
    userId: string;
}

export function useBanUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BanUserInput) => banUserAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                consoleLogger("useBanUserMutation error:", response);
                toast.error(response.message);
                return;
            }

            queryClient.invalidateQueries({
                queryKey: usersQueryKey,
            });
            toast.success(response.message);
        },
        onError: (error) => {
            consoleLogger("useBanUserMutation error:", error);
            toast.error("Error inesperado. Intenta de nuevo.");
        },
    });
}

export function useUnbanUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UnbanUserInput) => unbanUserAction(data),
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);
                return;
            }

            queryClient.invalidateQueries({
                queryKey: usersQueryKey,
            });
            toast.success(response.message);
        },
        onError: (error) => {
            consoleLogger("useUnbanUserMutation error:", error);
            toast.error("Error inesperado. Intenta de nuevo.");
        },
    });
}
