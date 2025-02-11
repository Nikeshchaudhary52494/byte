import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
    return (
        <div className="grid max-w-5xl gap-6 mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="w-full rounded-lg h-28" />
                ))}
            </div>
            <div className="mt-6">
                <Skeleton className="w-full h-40 rounded-lg" />
            </div>
        </div>
    );
};

export default DashboardSkeleton;
