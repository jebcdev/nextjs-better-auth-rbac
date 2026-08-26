# Next.js Better Auth RBAC

> **Template de referencia** — Una implementación completa de autenticación y control de acceso basado en roles (RBAC) usando Next.js 16, Better Auth v1, Prisma ORM y React 19. Diseñada como punto de partida educativo y base para aplicaciones SaaS/empresariales.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-1.7.1-purple)](https://www.better-auth.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.9.1-2D3748?logo=prisma)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 🎯 ¿Qué es este proyecto?

Una **plantilla educativa** que demuestra una arquitectura robusta para:

- **Autenticación completa**: Login, registro, recuperación de contraseña, verificación de email
- **RBAC (Role-Based Access Control)**: 3 roles jerárquicos con permisos granulares via Better Auth Access Control
- **Panel de administración**: Gestión de usuarios (CRUD, ban/desban, roles, paginación, filtros)
- **Perfil de usuario**: Edición de nombre, email, contraseña con validación servidor
- **Arquitectura Feature-Based**: Código organizado por dominio, no por tipo técnico
- **Server Components + Client Components**: Separación clara, data fetching en servidor

> ⚠️ **Nota**: Es una *plantilla de referencia* — muestra **una** forma de hacerlo. Adáptala a tus necesidades.

---

## 🛠 Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
|------|------------|---------|-----------|
| **Framework** | Next.js | 16.3.2 | App Router, Server Components, Server Actions |
| **Runtime** | React | 19.2.8 | UI, hooks, Suspense |
| **Auth** | Better Auth | 1.7.1 | Auth headless, plugins admin/access, DB adapter |
| **Database** | Prisma ORM + PostgreSQL | 7.9.1 | Type-safe DB access, migraciones, seed |
| **Styling** | Tailwind CSS v4 | 4.3.3 | Utility-first, CSS variables, dark mode |
| **UI Primitives** | Radix UI + shadcn/ui | 1.6.7 / 4.19.0 | Componentes accesibles, sin estilos |
| **Icons** | Remixicon | 4.9.0 | Iconos ligeros, consistentes |
| **Forms** | React Hook Form + Zod | 7.86.0 / 4.4.3 | Validación schema-first |
| **Data Fetching** | TanStack Query | 5.102.2 | Server state, cache, mutations |
| **Tables** | TanStack Table | 9.1.2 | Tablas headless con sorting/pagination/filters |
| **Notifications** | Sonner | 2.0.8 | Toasts accesibles |
| **Linting** | ESLint + @tanstack/eslint-plugin-query | 10.9.0 | Calidad de código |

---

## 🏗 Arquitectura: Feature-Based Structure

```
src/
├── app/                          # Next.js App Router (routing + layouts)
│   ├── (public)/                 # Rutas públicas (landing)
│   ├── (auth)/                   # Auth group (login, register)
│   │   ├── inicio/               # /inicio - Login
│   │   └── registro/             # /registro - Registro
│   ├── (private)/                # Rutas protegidas (requieren auth)
│   │   ├── layout.tsx            # Validación sesión + redirect
│   │   ├── panel-administracion/ # Admin dashboard (ADMIN/SUPER_ADMIN)
│   │   │   ├── layout.tsx        # validateAdminOrSuperAdmin + sidebar
│   │   │   ├── page.tsx          # Dashboard home
│   │   │   └── usuarios/         # Gestión usuarios (SUPER_ADMIN)
│   │   │       ├── page.tsx      # Lista + tabla
│   │   │       ├── nuevo/        # Crear usuario
│   │   │       └── [userId]/     # Editar usuario
│   │   └── perfil/               # Perfil usuario autenticado
│   ├── api/auth/[...all]/        # Better Auth API routes
│   ├── globals.css               # Tailwind v4 + CSS variables theme
│   └── layout.tsx                # Root layout + providers + header
│
├── features/                     # 🎯 FEATURE-BASED (dominio de negocio)
│   ├── public/                   # Funcionalidades públicas
│   │   └── auth/
│   │       ├── actions/          # Server Actions (login, register, logout)
│   │       ├── components/       # LoginForm, RegisterForm
│   │       └── validations/      # Zod schemas
│   │
│   ├── private/                  # Funcionalidades autenticadas
│   │   ├── admin-dashboard/      # Panel administración
│   │   │   ├── components/       # Sidebar, Header (shared UI)
│   │   │   └── super-admin/      # Solo SUPER_ADMIN
│   │   │       └── users/
│   │   │           ├── actions/  # CRUD + ban + toggle active
│   │   │           ├── components/
│   │   │           │   ├── table/      # TanStack Table (columns, filters, pagination)
│   │   │           │   ├── new/        # CreateUserForm
│   │   │           │   └── edit/       # EditUserForm
│   │   │           ├── queries/  # TanStack Query hooks + keys
│   │   │           └── validations/ # Zod schemas (create/update)
│   │   │
│   │   └── profile/              # Perfil usuario logueado
│   │       ├── actions/          # updateName, changeEmail, changePassword
│   │       ├── components/       # ProfileView, ProfileEditForm, Skeleton
│   │       ├── queries/          # TanStack Query hooks
│   │       └── validations/      # Zod schemas
│   │
│   └── shared/                   # Código compartido cross-feature
│       ├── components/           # TanStackQueryProvider
│       ├── components/ui/        # Design System (Button, Card, Input, Badge, etc.)
│       └── types/                # IGeneralResponse, etc.
│
├── lib/                          # Utilidades y configuración core
│   ├── auth/
│   │   ├── auth.ts               # Better Auth config + Access Control + roles
│   │   ├── auth-client.ts        # Client-side auth client
│   │   ├── session-details.ts    # Server: getSessionDetails(), fullUserDetails()
│   │   └── validate-role.ts      # validateSuperAdmin(), validateAdminOrSuperAdmin()
│   ├── db/
│   │   ├── prisma-db.ts          # PrismaClient singleton
│   │   └── seeders/              # Seed scripts (super admin)
│   ├── logger/                   # Console logger wrapper
│   ├── seo/                      # Metadata generators
│   ├── utils/                    # cn(), enums-labels, slugify, upload, sleep
│   └── query/                    # queryClient config
│
├── generated/                    # Prisma Client generado (gitignored)
│   └── prisma/
│       ├── client.ts
│       └── enums.ts
│
└── components.json               # shadcn/ui config (aliases, style, theme)
```

### Principios de la arquitectura

| Principio | Implementación |
|-----------|----------------|
| **Colocación por dominio** | Todo lo de `users` vive en `features/private/admin-dashboard/super-admin/users/` |
| **Separación Server/Client** | Server Actions en `actions/`, hooks en `queries/`, UI en `components/` |
| **Barrel exports** | `index.ts` en cada carpeta para imports limpios |
| **Types co-located** | Validations, query keys, types junto a su feature |
| **Shared UI aislado** | `features/shared/components/ui/` = Design System interno |

---

## 🔐 Autenticación y RBAC

### Better Auth Configuration (`src/lib/auth/auth.ts`)

```typescript
// 1. Access Control Statements (reutiliza default de user/session)
const statement = { ...defaultStatements } as const;
const ac = createAccessControl(statement);

// 2. Roles con permisos granulares
const userRole = ac.newRole({ user: [] });

const adminRole = ac.newRole({
  user: ["list", "get", "create", "update", "delete", "set-role", "ban", "set-password", "set-email"],
  session: ["list", "revoke", "delete"],
});

const superAdminRole = ac.newRole({
  user: [...adminPermissions, "impersonate", "impersonate-admins"],
  session: ["list", "revoke", "delete"],
});

// 3. Plugin admin con roles tipados
admin({
  defaultRole: Role.USER,
  ac,
  roles: { [Role.USER]: userRole, [Role.ADMIN]: adminRole, [Role.SUPER_ADMIN]: superAdminRole },
  adminRoles: [Role.ADMIN, Role.SUPER_ADMIN],
});
```

### Jerarquía de Roles

| Rol | Permisos de Usuario | Permisos de Sesión | Acceso Admin Panel |
|-----|---------------------|---------------------|-------------------|
| **USER** | (ninguno) | (ninguno) | ❌ |
| **ADMIN** | list, get, create, update, delete, set-role, ban, set-password, set-email | list, revoke, delete | ✅ |
| **SUPER_ADMIN** | Todos + impersonate, impersonate-admins | Todos | ✅ |

### Validación de Roles (Server Components)

```typescript
// src/lib/auth/validate-role.ts
export async function validateSuperAdmin() {
  const session = await getSessionDetails();
  if (!session.isAuthenticated) redirect("/inicio");
  if (!session.isSuperAdmin) redirect("/inicio");
}

export async function validateAdminOrSuperAdmin() {
  const session = await getSessionDetails();
  if (!session.isAuthenticated) redirect("/inicio");
  if (!session.isAdmin && !session.isSuperAdmin) redirect("/inicio");
}
```

### Uso en Layouts

```tsx
// app/(private)/panel-administracion/layout.tsx
export default async function RootLayout({ children }) {
  await validateAdminOrSuperAdmin(); // Bloquea en servidor
  const { userName, isAdmin, isSuperAdmin } = await getSessionDetails();
  return (
    <div className="flex min-h-screen">
      <AdminDashboardSideBar userName={userName} isAdmin={isAdmin} isSuperAdmin={isSuperAdmin} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

---

## 🗄 Esquema de Base de Datos (Prisma)

```prisma
enum Role {
  SUPER_ADMIN
  ADMIN
  USER
}

model User {
  id            String    @id @map("id")
  name          String    @map("name")
  email         String    @unique @map("email")
  emailVerified Boolean   @default(false) @map("email_verified")
  image         String?   @map("image")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  role          String?   @default("USER") @map("role")
  banned        Boolean?  @default(false) @map("banned")
  banReason     String?   @map("ban_reason")
  banExpires    DateTime? @map("ban_expires")
  isActive      Boolean?  @default(true) @map("is_active")
  tenantId      String?   @map("tenant_id")  // Preparado para multi-tenant
  sessions      Session[]
  accounts      Account[]

  @@map("users")
}

model Session { ... }  // Better Auth standard
model Account { ... }  // OAuth accounts
model Verification { .. } // Email verification tokens
```

> **Multi-tenant ready**: Campo `tenantId` opcional en User para futura expansión SaaS.

---

## 🎨 Design System (shadcn/ui + Tailwind v4)

### Configuración (`components.json`)

```json
{
  "style": "radix-luma",
  "baseColor": "mist",
  "iconLibrary": "remixicon",
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui"
  }
}
```

### Componentes UI Disponibles (`features/shared/components/ui/`)

| Componente | Descripción |
|------------|-------------|
| `Button` | Variantes: default, destructive, outline, secondary, ghost, link |
| `Card` | Card, CardHeader, CardTitle, CardContent, CardFooter |
| `Input` / `Textarea` | Form inputs con Label integrado |
| `Select` / `Checkbox` | Form controls accesibles |
| `Badge` | Estados: default, secondary, destructive, outline |
| `Avatar` | Con fallback de iniciales |
| `DropdownMenu` | Radix-based, submenus, checkbox/radio items |
| `Dialog` / `Sheet` | Modals y sidebars móviles |
| `Table` | TanStack Table wrapper |
| `Tooltip` / `Separator` / `Collapsible` | Utilidades |
| `Sonner` / `Toaster` | Notificaciones toast |

### Temas y Fuentes

```css
/* globals.css - CSS Variables (OKLCH) */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.148 0.004 228.8);
  --primary: oklch(0.52 0.105 223.128);
  --radius: 0.45rem;
  /* ... sidebar, charts, etc. */
}

.dark {
  --background: oklch(0.148 0.004 228.8);
  --foreground: oklch(0.987 0.002 197.1);
  /* ... */
}

/* Fuentes via next/font */
--font-sans: Noto Sans (variable)
--font-heading: EB Garamond (variable)
--font-mono: JetBrains Mono
```

---

## 📱 Páginas y Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Landing page |
| `/inicio` | Público | Login (email/password) |
| `/registro` | Público | Registro nuevo usuario |
| `/perfil` | Autenticado | Perfil: vista + edición nombre/email/password |
| `/panel-administracion` | ADMIN/SUPER_ADMIN | Dashboard home |
| `/panel-administracion/usuarios` | SUPER_ADMIN | Lista usuarios (tabla + filtros + paginación) |
| `/panel-administracion/usuarios/nuevo` | SUPER_ADMIN | Crear usuario con rol |
| `/panel-administracion/usuarios/[id]` | SUPER_ADMIN | Editar usuario (rol, activo, password opcional) |

---

## 🚀 Primeros Pasos

### Prerrequisitos

- Node.js 20+
- pnpm 11+
- PostgreSQL 15+ (local o remoto)

### Instalación

```bash
# Clonar
git clone https://github.com/jebcdev/nextjs-better-auth-rbac.git
cd nextjs-better-auth-rbac

# Instalar dependencias
pnpm install

# Variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL y NEXT_PUBLIC_APP_URL

# Setup DB (crea migraciones, genera client, seed super admin)
pnpm seed

# Desarrollo
pnpm dev
```

### Variables de Entorno (`.env`)

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname?schema=public"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth (generar con: openssl rand -base64 32)
BETTER_AUTH_SECRET="tu-secret-super-seguro"
BETTER_AUTH_URL="http://localhost:3000"

# Email (opcional - para verificación/reset password)
# SMTP_HOST=""
# SMTP_PORT=""
# SMTP_USER=""
# SMTP_PASS=""
# EMAIL_FROM=""
```

### Credenciales por Defecto (seed)

```
Email:    super@email.com
Password: 123456789
Rol:      SUPER_ADMIN
```

---

## 📦 Scripts Disponibles

```bash
pnpm dev        # Next.js dev server (con clean .next)
pnpm build      # Production build
pnpm start      # Production server
pnpm lint       # ESLint
pnpm seed       # 🔄 Reset DB + migraciones + generate + seed super admin
```

> **seed** es destructivo: `prisma migrate reset --force` + `migrate dev` + `generate` + `tsx seeders`

---

## 🧪 Patrones Clave del Código

### Server Actions + TanStack Query

```typescript
// features/private/profile/actions/update-profile-name.action.ts
"use server";
export async function updateProfileNameAction(data: UpdateNameInput) {
  const session = await getSessionDetails();
  if (!session.isAuthenticated) return { success: false, error: true, message: "No autenticado" };
  
  const result = await auth.api.updateUser({ body: { name: data.name }, headers: await headers() });
  return { success: true, error: false, message: "Nombre actualizado", data: result };
}

// features/private/profile/queries/update-profile-name.query.ts
export function useUpdateProfileNameMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfileNameAction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: profileQueryKey }),
  });
}
```

### Formularios con React Hook Form + Zod

```tsx
const { register, handleSubmit, formState: { errors } } = useForm<InputType>({
  resolver: zodResolver(Schema),
  defaultValues: { ... },
});

<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register("field")} />
  <SingleFormError message={errors.field?.message} />
</form>
```

### Tablas con TanStack Table (Server-side ready)

```tsx
const table = useTable({
  features,           // sorting, pagination, filters
  data: paginatedData,
  columns,
  state: { sorting },
  onSortingChange: setSorting,
});

// UI: table.getHeaderGroups(), table.getRowModel().rows
```

### Sidebar Colapsable + Responsive

```tsx
// Desktop: aside sticky + collapsible (w-16 ↔ w-60)
// Mobile: Sheet (hamburger menu)
<TooltipProvider>
  <div className="md:hidden"> <Sheet>...</Sheet> </div>
  <aside className="hidden md:block"> <SidebarContent /> </aside>
</TooltipProvider>
```

---

## 🔧 Personalización Común

### Agregar Nuevo Rol

1. **Prisma**: `enum Role { ... NUEVO_ROL }` → `pnpm prisma migrate dev`
2. **Better Auth**: Agregar en `auth.ts` → `ac.newRole({ ... })` + `roles: { [Role.NUEVO_ROL]: nuevoRole }`
3. **Validaciones**: Actualizar schemas Zod
4. **UI**: `enums-labels.ts` + `roleLabels` en formularios
5. **Sidebar**: Agregar item con `superAdminOnly` o nuevo flag

### Cambiar Esquema de Colores

Edita `globals.css` — variables OKLCH en `:root` y `.dark`. Usa [oklch.com](https://oklch.com/) para paletas.

### Añadir OAuth Providers

```typescript
// auth.ts
socialProviders: {
  github: { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET },
  google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET },
},
```

### Multi-Tenant (Siguiente Paso)

El campo `tenantId` en User ya existe. Para activar:

1. Middleware para resolver tenant por subdominio/header
2. Scopar queries Prisma con `where: { tenantId }`
3. Agregar `tenant` a Access Control statements
4. UI: selector de tenant en header

---

## 📁 Estructura de Commits (Conventional Commits)

```bash
feat(auth): agrega login con Google OAuth
fix(admin): corrige paginación en tabla usuarios
refactor(ui): migra Button a Radix Slot pattern
docs(readme): actualiza instrucciones de seed
chore(deps): actualiza Prisma a 7.10
```

---

## 🤝 Contribuir

1. Fork del repo
2. Rama: `git checkout -b feat/mi-feature`
3. Commits convencionales (ver arriba)
4. `pnpm lint` pasa
5. PR con descripción clara

---

## 📄 Licencia

MIT — Úsalo libremente como base para tus proyectos.

---

## 🙏 Créditos y Recursos

- [Better Auth Docs](https://www.better-auth.com/) — Auth headless moderno
- [shadcn/ui](https://ui.shadcn.com/) — Componentes copiables, no libreria
- [TanStack Query](https://tanstack.com/query) — Server state management
- [TanStack Table](https://tanstack.com/table) — Headless tables
- [Prisma ORM](https://www.prisma.io/) — Type-safe database
- [Tailwind CSS v4](https://tailwindcss.com/) — Styling moderno

---

**¿Te sirvió?** ⭐ Dale star al repo en [GitHub](https://github.com/jebcdev/nextjs-better-auth-rbac) y compártelo.