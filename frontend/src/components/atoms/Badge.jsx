import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Reusable Badge component for status and priority indicators.
 */
export const Badge = ({ 
  children, 
  variant = 'default',
  className,
  ...props 
}) => {
  const variants = {
    default: 'bg-surface-800 text-surface-300 border-surface-700/50',
    primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    success: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20',
    danger: 'bg-accent-rose/10 text-accent-rose border-accent-rose/20',
    warning: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20',
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
