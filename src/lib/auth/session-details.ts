"use server";

import { Role, type User } from "@/generated/prisma/client";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { prismaDB } from "@/lib/db/prisma-db";
import { username } from "better-auth/plugins";

export async function fullUserDetails(): Promise<User | null> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) return null;

    const user = await prismaDB.user.findUnique({
        where: { id: session.user.id },
    });

    return user;
}

export async function getSessionDetails() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const isAuthenticated = !!session;
    const userRole = session?.user.role as Role | undefined;

    const isSuperAdmin = userRole === Role.SUPER_ADMIN;
    const isAdmin = userRole === Role.ADMIN;
    const isUser = userRole === Role.USER;

    const hasAdminAccess = isSuperAdmin || isAdmin;
    const hasUserAccess = isSuperAdmin || isAdmin || isUser;

    const currentUser = session?.user ?? null;
    const currentSession = session?.session ?? null;
    const userName = session?.user.name ?? "";

    return {
        isAuthenticated,
        isSuperAdmin,
        isAdmin,
        isUser,
        hasAdminAccess,
        hasUserAccess,
        currentUser,
        currentSession,
        userName
    };
}
