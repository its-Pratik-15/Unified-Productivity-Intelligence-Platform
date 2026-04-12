import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../atoms/Button';

/**
 * Animated Modal organism using Framer Motion.
 */
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md' 
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full ${sizes[size]} bg-white rounded-3xl shadow-2xl border border-surface-800 overflow-hidden flex flex-col`}
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-surface-800 bg-surface-50">
              <h3 className="text-xl font-black text-surface-100 tracking-tight">{title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-surface-500" />
              </Button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto max-h-[75vh]">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-8 py-5 bg-surface-50 border-t border-surface-800 flex justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
