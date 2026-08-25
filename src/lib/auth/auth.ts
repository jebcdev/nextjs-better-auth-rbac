import { betterAuth, User } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { nextCookies } from "better-auth/next-js";
import { Role } from "@/generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

const auth = betterAuth({
    database: prismaAdapter(prismaDB, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        autoSignIn: true,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: Role.USER,
                input: false, // No permitir que el cliente lo setee directamente
            },
            isActive: {
                type: "boolean",
                required: false,
                defaultValue: true,
                input: false,
            },
            tenantId: {
                type: "string",
                required: false,
                defaultValue: null,
                input: true, // Permitir asignarlo al registrar
            },
        },
    },

    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            role: Role.USER,     // Siempre forzar rol por defecto
                            isActive: true,
                        },
                    };
                },
            },
        },
    },

    plugins: [
        admin({
            defaultRole: Role.USER,
            // Roles que tienen acceso al panel de admin
            adminUserRoles: ["SUPER_ADMIN", "ADMIN"],
        }),
        nextCookies(),
    ],
});

export { auth,type User };