"use server";

import { getSessionDetails } from "@/lib/auth/session-details";
import { redirect } from "next/navigation"; 
import { consoleLogger } from "../logger/console-logger";

export async function validateSuperAdmin() {
    const session = await getSessionDetails();

    if (!session.isAuthenticated) {
        redirect("/login");
    }
    // console.clear();
    // consoleLogger({ isSuperAdmin: session.isSuperAdmin });
    if (!session.isSuperAdmin) {
        redirect("/");
    }

    return session.currentUser;
}

export async function validateAdminOrSuperAdmin() {
    const session = await getSessionDetails();

    if (!session.isAuthenticated) {
        redirect("/login");
    }

    if (!session.isAdmin && !session.isSuperAdmin) {
        redirect("/");
    }

    return session.currentUser;
}
