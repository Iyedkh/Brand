import React from 'react';

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-neutral-200/50 ${className}`}></div>
);

export const ProductSkeleton = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="aspect-3/4 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);
