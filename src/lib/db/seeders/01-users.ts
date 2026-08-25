import { prismaDB } from "@/lib/db/prisma-db";
import { auth } from "@/lib/auth/auth";
import { Role } from "@/generated/prisma/enums";

export const seedUsers = async () => {
    try {
        console.log("🗑️  Cleaned existing data...");

        // 0. Super admin global — sin tenantId (gestiona toda la plataforma)
        const superAdmin = await auth.api.signUpEmail({
            body: {
                name: "Super Admin",
                email: "super@email.com",
                password: "123456789",
            },
        });

        await prismaDB.user.update({
            where: { id: superAdmin.user.id },
            data: {
                role: Role.SUPER_ADMIN,
                isActive: true,
                // Sin tenantId — es global
            },
        });

        console.log("✅ Super admin created → super@email.com");
    } catch (error) {
        console.error("❌ Error seeding tenants:", error);
        throw error;
    }
};
