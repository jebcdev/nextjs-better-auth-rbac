"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    updateNameSchema,
    type UpdateNameInput,
    changeEmailSchema,
    type ChangeEmailInput,
    changePasswordSchema,
    type ChangePasswordInput,
} from "@/features/private/profile/validations";
import {
    useUpdateProfileNameMutation,
    useChangeEmailMutation,
    useChangePasswordMutation,
} from "@/features/private/profile/queries";
import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";
import { Button } from "@/features/shared/components/ui/button";
import { SingleFormError } from "@/features/shared/components/ui/form-error";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";
import type { User } from "@/generated/prisma/client";

interface ProfileEditFormProps {
    user: User;
}

function NameSection({ userName }: { userName: string }) {
    const { mutate, isPending } = useUpdateProfileNameMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateNameInput>({
        resolver: zodResolver(updateNameSchema as any),
        defaultValues: { name: userName },
    });

    function onSubmit(data: UpdateNameInput) {
        mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    {...register("name")}
                />
                <SingleFormError message={errors.name?.message} />
            </div>
            <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar nombre"}
            </Button>
        </form>
    );
}

function EmailSection({ userEmail }: { userEmail: string }) {
    const { mutate, isPending } = useChangeEmailMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangeEmailInput>({
        resolver: zodResolver(changeEmailSchema as any),
        defaultValues: { email: userEmail },
    });

    function onSubmit(data: ChangeEmailInput) {
        mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...register("email")}
                />
                <SingleFormError message={errors.email?.message} />
            </div>
            {/* <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar correo"}
            </Button> */}
        </form>
    );
}

function PasswordSection() {
    const { mutate, isPending } = useChangePasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema as any),
    });

    function onSubmit(data: ChangePasswordInput) {
        mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="currentPassword">Contraseña actual</Label>
                <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Tu contraseña actual"
                    {...register("currentPassword")}
                />
                <SingleFormError message={errors.currentPassword?.message} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="newPassword">Nueva contraseña</Label>
                <Input
                    id="newPassword"
                    type="password"
                    placeholder="Nueva contraseña"
                    {...register("newPassword")}
                />
                <SingleFormError message={errors.newPassword?.message} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repite la nueva contraseña"
                    {...register("confirmPassword")}
                />
                <SingleFormError message={errors.confirmPassword?.message} />
            </div>
            <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Cambiar contraseña"}
            </Button>
        </form>
    );
}

export function ProfileEditForm({ user }: ProfileEditFormProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Información general</CardTitle>
                </CardHeader>
                <CardContent>
                    <NameSection userName={user.name} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Correo electrónico</CardTitle>
                </CardHeader>
                <CardContent>
                    <EmailSection userEmail={user.email} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contraseña</CardTitle>
                </CardHeader>
                <CardContent>
                    <PasswordSection />
                </CardContent>
            </Card>
        </div>
    );
}
