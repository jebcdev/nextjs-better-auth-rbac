"use server";

import { Role } from "@/generated/prisma/client";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { prismaDB } from "@/lib/db/prisma-db";

export async function getSessionDetails() {
    const session = await auth.api.getSession({ headers: await headers() });

    const isAuthenticated = !!session;
    const userRole = session?.user.role as Role | undefined;
    const userId = session?.user?.id;

    const isSuperAdmin = userRole === Role.SUPER_ADMIN;
    const isAdmin = userRole === Role.ADMIN;
    
    const isUser = userRole === Role.USER;

    const hasAdminAccess = isSuperAdmin || isAdmin;
    

    const currentUser = session?.user ?? null;
    const currentSession = session?.session ?? null;

    const fullUserDetails = userId
        ? await prismaDB.user.findUnique({
            where: { id: userId },
            
        })
        : null;

    return {
        isAuthenticated,
        isSuperAdmin,
        isAdmin,
        isUser,
        hasAdminAccess,
        currentUser,
        currentSession,
        fullUserDetails,
    };
}

// Exportar fullUserDetails como una función independiente
export async function fullUserDetails() {
    const session = await getSessionDetails();
    return session.fullUserDetails;
}