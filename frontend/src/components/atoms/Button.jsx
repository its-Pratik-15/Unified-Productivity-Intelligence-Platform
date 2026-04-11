import { motion } from 'framer-motion';
import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Premium Button component with micro-interactions and neutral SaaS styling.
 */
export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20',
    secondary: 'bg-white text-surface-100 hover:bg-surface-50 border border-surface-800 shadow-sm',
    ghost: 'bg-transparent text-surface-500 hover:bg-primary-50 hover:text-primary-600',
    danger: 'bg-accent-rose text-white hover:bg-red-600 shadow-lg shadow-accent-rose/20',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      disabled={isLoading || props.disabled}
      className={twMerge(
        'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
});

Button.displayName = 'Button';
