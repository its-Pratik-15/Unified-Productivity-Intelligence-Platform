import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Reusable Skeleton loader component for async UI states.
 */
export const Skeleton = ({ className, circle = false, ...props }) => {
  return (
    <div
      className={twMerge(
        'animate-pulse bg-surface-800 rounded-lg',
        circle ? 'rounded-full' : 'rounded-lg',
        className
      )}
      {...props}
    />
  );
};
