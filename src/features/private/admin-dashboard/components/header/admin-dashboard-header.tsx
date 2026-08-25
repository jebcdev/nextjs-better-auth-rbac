"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";

import { Button } from "@/features/shared/components/ui";
import { JSX } from "react/jsx-runtime";

interface HeaderAction {
    path: string;
    icon: JSX.Element;
    label: string;
}

interface Props {
    title: string;
    subtitle: string;
    action?: HeaderAction;
}

export const AdminDashboardHeader = ({
    title,
    subtitle,
    action,
}: Props) => {
    

    return (
        <>
            <div className="mb-1 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold">
                        {title}
                    </h3>
                    <p className="text-sm italic text-muted-foreground">
                        {subtitle}
                    </p>
                </div>
                {action && action.icon && (
                    <Link href={action.path}>
                        <Button
                            variant="default"
                            size="sm"
                            className="gap-2"
                        >
                            {action.icon}
                            {action.label}
                        </Button>
                    </Link>
                )}
            </div>
            <hr className="mb-2" />
        </>
    );
};
