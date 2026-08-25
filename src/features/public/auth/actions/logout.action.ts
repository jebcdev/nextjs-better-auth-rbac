"use server";

import { auth } from "@/lib/auth/auth";
import { getQueryClient } from "@/lib/query/query-client";
import { headers } from "next/headers";

export const logoutAction = async (): Promise<{
    success: boolean;
}> => {
    try {
        await auth.api.signOut({
            headers: await headers(),
        });

        const queryClient = getQueryClient();
        queryClient.invalidateQueries();
        queryClient.clear();

        return { success: true };
    } catch {
        return { success: false };
    }
};
