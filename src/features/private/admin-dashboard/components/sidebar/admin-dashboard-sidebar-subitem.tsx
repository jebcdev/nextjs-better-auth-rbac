"use client";

import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    Collapsible,
    CollapsibleContent,
} from "@/features/shared/components/ui";

interface SubItem {
    icon: LucideIcon;
    label: string;
    path: string;
}

interface Props {
    icon: LucideIcon;
    label: string;
    path?: string; // 👈 Hacemos path opcional
    subItems: SubItem[];
    isCollapsed: boolean;
    onNavigate?: () => void;
}

export const AdminDashboardSidebarSubItem = ({
    icon: Icon,
    label,
    path,
    subItems,
    isCollapsed,
    onNavigate,
}: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const stripTrailingSlash = (p: string) => p.replace(/\/+$/, '');
        const normalizedPathname = stripTrailingSlash(pathname);
        const normalizedPath = path ? stripTrailingSlash(path) : undefined;

        const isActive =
            (normalizedPath != null && normalizedPathname.startsWith(normalizedPath)) ||
            subItems.some((item) => normalizedPathname.startsWith(stripTrailingSlash(item.path)));
        setIsOpen(isActive);
    }, [pathname, subItems, path]);

    // Versión colapsada (solo muestra el icono con tooltip)
    if (isCollapsed) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    {path ? (
                        <Link
                            href={path}
                            onClick={onNavigate}
                            className="flex h-10 w-10 items-center justify-center rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                            <Icon className="h-5 w-5" />
                        </Link>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                            <Icon className="h-5 w-5" />
                        </div>
                    )}
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    // Versión expandida (con sub-items)
    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                    if (path) {
                        router.push(path);
                    } else {
                        setIsOpen(!isOpen);
                    }
                    if (onNavigate) onNavigate();
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                )}
            </button>
            <CollapsibleContent className="ml-4 pl-2 border-l border-sidebar-border">
                <div className="flex flex-col gap-1 py-1">
                    {subItems.map((subItem) => {
                        const isActive = pathname.startsWith(subItem.path);
                        return (
                            <Link
                                key={subItem.path}
                                href={subItem.path}
                                onClick={onNavigate}
                                data-active={isActive}
                                className="flex items-center gap-3 rounded-md px-3 py-1.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                            >
                                <subItem.icon className="h-4 w-4 shrink-0" />
                                <span>{subItem.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};