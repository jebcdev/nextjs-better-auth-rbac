"use server";


import type { User } from "@/generated/prisma/client";
import {fullUserDetails} from '@/lib/auth/session-details';

export async function getProfile(): Promise<User | null> {
    const user = await fullUserDetails();
    return user;
}
