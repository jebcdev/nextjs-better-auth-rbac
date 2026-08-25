"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUsersAction } from "../actions";
import { usersQueryKey } from "./users-keys.type";

export function useGetAllUsersQuery() {
    return useQuery({
        queryKey: usersQueryKey,
        queryFn: async () => {
            const response = await getAllUsersAction();

            if (!response.success) {
                throw new Error(response.message);
            }

            return response.data.users;
        },
    });
}
