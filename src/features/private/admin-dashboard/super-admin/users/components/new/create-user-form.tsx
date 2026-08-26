"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Role } from "@/generated/prisma/enums";
import {
    createUserSchema,
    type CreateUserInput,
} from "../../validations";
import { useCreateUserMutation } from "../../queries";
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
    // [Role.TECHNICIAN]: "Técnico",
};

export function CreateUserForm() {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(
        null,
    );
    const createUserMutation = useCreateUserMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: Role.USER,
            isActive: true,
        },
    });

    const selectedRole = watch("role");
    const isActive = watch("isActive");

    const onSubmit = async (data: CreateUserInput) => {
        setServerError(null);

        createUserMutation.mutate(data, {
            onSuccess: (response) => {
                if (!response.success) {
                    setServerError(response.message);
                    return;
                }
                
                router.push("/panel-administracion/usuarios")
            },
            onError: () => {
                setServerError("Error inesperado. Intenta de nuevo.");
            },
        });
    };

    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Crear Nuevo Usuario</CardTitle>
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
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            {...register("password")}
                        />
                        <SingleFormError
                            message={errors.password?.message}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select
                            value={selectedRole}
                            onValueChange={(value) =>
                                setValue("role", value as Role, {
                                    shouldValidate: true,
                                })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={Role.SUPER_ADMIN}>
                                    {roleLabels[Role.SUPER_ADMIN]}
                                </SelectItem>
                                <SelectItem value={Role.ADMIN}>
                                    {roleLabels[Role.ADMIN]}
                                </SelectItem>
                                <SelectItem value={Role.USER}>
                                    {roleLabels[Role.USER]}
                                </SelectItem>
                                {/* <SelectItem value={Role.TECHNICIAN}>
                                    {roleLabels[Role.TECHNICIAN]}
                                </SelectItem> */}
                            </SelectContent>
                        </Select>
                        <SingleFormError
                            message={errors.role?.message}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="isActive"
                            checked={isActive}
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
                                router.push("/panel-administracion/usuarios")
                            }
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={createUserMutation.isPending}
                        >
                            {createUserMutation.isPending
                                ? "Creando..."
                                : "Crear Usuario"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
