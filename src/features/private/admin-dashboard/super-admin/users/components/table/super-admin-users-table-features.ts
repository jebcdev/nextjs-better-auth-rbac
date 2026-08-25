import {
    tableFeatures,
    rowSortingFeature,
    columnVisibilityFeature,
    createSortedRowModel,
} from "@tanstack/react-table";

export const features = tableFeatures({
    rowSortingFeature,
    columnVisibilityFeature,
    sortedRowModel: createSortedRowModel(),
});

export type Features = typeof features;