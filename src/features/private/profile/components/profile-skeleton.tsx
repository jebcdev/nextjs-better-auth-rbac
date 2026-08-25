"use client";

import { Card, CardContent, CardHeader } from "@/features/shared/components/ui/card";

export function ProfileSkeleton() {
    return (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
            <div className="lg:col-span-1">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center gap-3 lg:items-start">
                            <div className="size-14 animate-pulse rounded-full bg-muted" />
                            <div className="space-y-2">
                                <div className="h-7 w-40 animate-pulse rounded bg-muted" />
                                <div className="h-4 w-52 animate-pulse rounded bg-muted" />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />
                            <div className="h-5 w-32 animate-pulse rounded-full bg-muted" />
                            <div className="h-5 w-36 animate-pulse rounded-full bg-muted" />
                        </div>
                        <div className="mt-4 h-3 w-40 animate-pulse rounded bg-muted" />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                            <div className="h-9 w-full animate-pulse rounded bg-muted" />
                            <div className="h-9 w-32 animate-pulse rounded bg-muted" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
