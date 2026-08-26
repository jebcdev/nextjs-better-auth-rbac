import { Role } from "@/generated/prisma/enums";

// ─── ROLE ─────────────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<Role, string> = {
    [Role.SUPER_ADMIN]: "Super Admin",
    [Role.ADMIN]: "Administrador",
    [Role.USER]: "Usuario",
    
};

export function getRoleLabel(role: Role): string {
    return ROLE_LABELS[role];
}
