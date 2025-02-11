import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeletons = () => {
    return (
        <div className="p-4 space-y-2 border rounded-lg">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                    <Skeleton className="w-full h-6" />
                </div>
            ))}
        </div>
    );
};

export default TableSkeletons;
