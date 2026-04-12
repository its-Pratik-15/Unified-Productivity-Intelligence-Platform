export const Skeleton = ({ className = '' }) => {
    return (
        <div
            className={`animate-pulse bg-[#334155] rounded ${className}`}
        />
    );
};

export const SkeletonCard = () => (
    <div className="bg-[#1E293B] rounded-lg p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
    </div>
);

export const SkeletonList = ({ count = 3 }) => (
    <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
);
