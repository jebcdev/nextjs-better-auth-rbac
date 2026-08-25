"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/features/shared/components/ui";

interface Props {
    icon: LucideIcon;
    label: string;
    path: string;
    isCollapsed: boolean;
    onNavigate?: () => void;
}

export const AdminDashboardSidebarItem = ({
    icon: Icon,
    label,
    path,
    isCollapsed,
    onNavigate,
}: Props) => {
    const pathname = usePathname();
    const isActive = pathname.startsWith(path);

    if (isCollapsed) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={path}
                        onClick={onNavigate}
                        data-active={isActive}
                        className="flex h-10 w-10 items-center justify-center rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                    >
                        <Icon className="h-5 w-5" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    return (
        <Link
            href={path}
            onClick={onNavigate}
            data-active={isActive}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
        >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
        </Link>
    );
};
