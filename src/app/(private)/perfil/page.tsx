import { Suspense } from "react";
import { generateAsyncDescription, generateAsyncTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { getProfile } from "@/features/private/profile/queries";
import { ProfileView, ProfileSkeleton, ProfileEditForm } from "@/features/private/profile/components";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Perfil"),
        description: await generateAsyncDescription("Perfil"),
    };
}

async function ProfileContent() {
    const user = await getProfile();

    if (!user) {
    return (
        <main className="mx-auto max-w-5xl py-10">
            <p className="text-center text-sm text-muted-foreground">
                No se pudo cargar la información del perfil.
            </p>
        </main>
    );
    }

    return (
        <main className="mx-auto max-w-5xl py-10 lg:grid lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
            <div className="lg:col-span-1">
                <ProfileView user={user} />
            </div>
            <div className="lg:col-span-2 space-y-6">
                <ProfileEditForm user={user} />
            </div>
        </main>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <ProfileContent />
        </Suspense>
    );
}
