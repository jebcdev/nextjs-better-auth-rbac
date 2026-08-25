"use client";

import { Button } from "@/features/shared/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/features/shared/components/ui/select";

interface TablePaginationProps {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    onPageChange: (pageIndex: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

export function TablePagination({
    pageIndex,
    pageSize,
    pageCount,
    onPageChange,
    onPageSizeChange,
}: TablePaginationProps) {
    return (
        <div className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center gap-2">
                <Select
                    value={String(pageSize)}
                    onValueChange={(value) => onPageSizeChange(Number(value))}
                >
                    <SelectTrigger className="w-[130px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 25, 50, 100].map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {size} por página
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pageIndex - 1)}
                    disabled={pageIndex === 0}
                >
                    Anterior
                </Button>
                <span className="text-xs text-muted-foreground">
                    Página {pageIndex + 1} de {pageCount}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pageIndex + 1)}
                    disabled={pageIndex >= pageCount - 1}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}
