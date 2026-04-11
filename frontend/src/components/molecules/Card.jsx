import { motion } from 'framer-motion';
import React from 'react';
import { twMerge } from 'tailwind-merge'; 

/**
 * Premium Card component with white background and subtle motion.
 */
export const Card = ({ 
  children, 
  className, 
  title, 
  subtitle,
  footer,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={twMerge(
        'bg-surface-900 rounded-2xl border border-surface-800 shadow-sm overflow-hidden flex flex-col transition-all duration-300',
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-6 py-5 border-b border-surface-800/50">
          {title && <h3 className="text-xl font-bold text-surface-100 leading-none">{title}</h3>}
          {subtitle && <p className="text-sm text-surface-500 mt-2">{subtitle}</p>}
        </div>
      )}
      
      <div className="flex-1 p-6">
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-surface-50/50 border-t border-surface-800/50">
          {footer}
        </div>
      )}
    </motion.div>
  );
};
