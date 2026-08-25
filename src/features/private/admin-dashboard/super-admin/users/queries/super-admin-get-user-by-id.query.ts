"use client";

import { useQuery } from "@tanstack/react-query";
import { getSuperAdminGetUserByIdAction } from "../actions";
import { userDetailQueryKey } from "./users-keys.type";

export function useGetUserByIdQuery(userId: string) {
    return useQuery({
        queryKey: userDetailQueryKey(userId),
        queryFn: async () => {
            const response = await getSuperAdminGetUserByIdAction(userId);

            if (!response.success || !response.data) {
                throw new Error(response.message);
            }

            return response.data as {
                id: string;
                name: string;
                email: string;
                role: string;
                isActive: boolean;
                banned: boolean | null;
                banReason: string | null;
                banExpires: number | null;
            };
        },
        enabled: !!userId,
    });
}
