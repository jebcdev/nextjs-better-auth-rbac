"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Role } from "@/generated/prisma/enums";
import {
    updateUserSchema,
    type UpdateUserInput,
} from "../../validations";
import {
    useGetUserByIdQuery,
    useUpdateUserMutation,
} from "../../queries";
import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";
import { Button } from "@/features/shared/components/ui/button";
import { SingleFormError } from "@/features/shared/components/ui/form-error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/features/shared/components/ui/select";
import { Checkbox } from "@/features/shared/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";

const roleLabels: Record<Role, string> = {
    [Role.SUPER_ADMIN]: "Super Administrador",
    [Role.ADMIN]: "Administrador",
    [Role.USER]: "Usuario",
    //[Role.TECHNICIAN]: "Técnico",
};

interface EditUserFormProps {
    userId: string;
}

export function EditUserForm({ userId }: EditUserFormProps) {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(
        null,
    );
    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useGetUserByIdQuery(userId);
    const updateUserMutation = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
    } = useForm<UpdateUserInput>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            userId,
            name: (user?.name as string) ?? "",
            email: (user?.email as string) ?? "",
            role: (user?.role as Role) ?? undefined,
            isActive: (user?.isActive as boolean) ?? true,
            password: "",
        },
        values: user
            ? {
                  userId,
                  name: user.name as string,
                  email: user.email as string,
                  role: user.role as Role,
                  isActive: user.isActive as boolean,
                  password: "",
              }
            : undefined,
    });

    const isActiveValue = watch("isActive");

    const onSubmit = async (data: UpdateUserInput) => {
        setServerError(null);

        updateUserMutation.mutate(data, {
            onSuccess: (response) => {
                if (!response.success) {
                    setServerError(response.message);
                    return;
                }
                router.push("/panel-administracion/usuarios");
            },
            onError: () => {
                setServerError("Error inesperado. Intenta de nuevo.");
            },
        });
    };

    if (isLoading) {
        return (
            <Card className="max-w-lg mx-auto" key={userId}>
                <CardHeader>
                    <CardTitle>
                        Cargando datos del usuario...
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="h-10 bg-muted rounded animate-pulse" />
                        <div className="h-10 bg-muted rounded animate-pulse" />
                        <div className="h-10 bg-muted rounded animate-pulse" />
                        <div className="h-10 bg-muted rounded animate-pulse" />
                        <div className="h-10 bg-muted rounded animate-pulse" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError || !user) {
        return (
            <Card className="max-w-lg mx-auto" key={userId}>
                <CardHeader>
                    <CardTitle>Error al cargar el usuario</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-500">
                        {error?.message ??
                            "No se pudo obtener la información del usuario."}
                    </p>
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={() =>
                            router.push(
                                "/panel-administracion/usuarios",
                            )
                        }
                    >
                        Volver a usuarios
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-lg mx-auto" key={userId}>
            <CardHeader>
                <CardTitle>Editar Usuario</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-4"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            placeholder="Nombre completo"
                            {...register("name")}
                        />
                        <SingleFormError
                            message={errors.name?.message}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">
                            Correo electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            {...register("email")}
                        />
                        <SingleFormError
                            message={errors.email?.message}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Rol</Label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value ?? Role.USER}
                                    onValueChange={(value) =>
                                        field.onChange(value as Role)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccionar rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value={Role.SUPER_ADMIN}
                                        >
                                            {
                                                roleLabels[
                                                    Role.SUPER_ADMIN
                                                ]
                                            }
                                        </SelectItem>
                                        <SelectItem
                                            value={Role.ADMIN}
                                        >
                                            {roleLabels[Role.ADMIN]}
                                        </SelectItem>
                                        <SelectItem value={Role.USER}>
                                            {roleLabels[Role.USER]}
                                        </SelectItem>
                                        {/* <SelectItem
                                            value={Role.TECHNICIAN}
                                        >
                                            {
                                                roleLabels[
                                                    Role.TECHNICIAN
                                                ]
                                            }
                                        </SelectItem> */}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <SingleFormError
                            message={errors.role?.message}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            Contraseña (opcional)
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Nueva contraseña (mínimo 8 caracteres)"
                            {...register("password")}
                        />
                        <SingleFormError
                            message={errors.password?.message}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="isActive"
                            checked={isActiveValue ?? true}
                            onCheckedChange={(checked) =>
                                setValue(
                                    "isActive",
                                    checked === true,
                                    { shouldValidate: true },
                                )
                            }
                        />
                        <Label htmlFor="isActive">
                            Usuario activo
                        </Label>
                    </div>

                    {serverError && (
                        <span className="text-sm text-red-500 text-center">
                            {serverError}
                        </span>
                    )}

                    <div className="flex gap-2 justify-end pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                router.push(
                                    "/panel-administracion/usuarios",
                                )
                            }
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={updateUserMutation.isPending}
                        >
                            {updateUserMutation.isPending
                                ? "Guardando..."
                                : "Guardar Cambios"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
