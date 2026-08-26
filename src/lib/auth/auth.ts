import { betterAuth, User } from "better-auth";
import { admin } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { nextCookies } from "better-auth/next-js";
import { Role } from "@/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

// 1. Statement: reutiliza los permisos default de "user" y "session"
const statement = {
    ...defaultStatements,
} as const;

const ac = createAccessControl(statement);

// 2. Roles: define qué puede hacer cada uno
const userRole = ac.newRole({
    user: [],
});

const adminRole = ac.newRole({
    user: [
        "list", "get", "create", "update", "delete",
        "set-role", "ban", "set-password", "set-email",
    ],
    session: ["list", "revoke", "delete"],
});

const superAdminRole = ac.newRole({
    user: [
        "list", "get", "create", "update", "delete",
        "set-role", "ban", "set-password", "set-email",
        "impersonate", "impersonate-admins",
    ],
    session: ["list", "revoke", "delete"],
});

const auth = betterAuth({
    database: prismaAdapter(prismaDB, { provider: "postgresql" }),

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
                input: false,
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
                input: true,
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
                            role: Role.USER,
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
            ac,
            roles: {
                [Role.USER]: userRole,
                [Role.ADMIN]: adminRole,
                [Role.SUPER_ADMIN]: superAdminRole,
            },
            adminRoles: [Role.ADMIN, Role.SUPER_ADMIN],
        }),
        nextCookies(),
    ],
});

export { auth, type User };