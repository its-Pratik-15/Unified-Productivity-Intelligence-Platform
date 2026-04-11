import React from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

/**
 * Navigation item molecule for sidebar with active state animations.
 */
export const NavItem = ({ to, icon: Icon, label, isCollapsed = false }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={twMerge(
            'relative group flex items-center px-4 py-3 transition-all duration-300 mx-2 mb-1 rounded-xl',
            isActive 
              ? 'text-primary-500 bg-primary-500/10 font-bold' 
              : 'text-surface-500 hover:text-primary-500 hover:bg-slate-100/50'
          )}
        >
          {/* Sliding indicator */}
          {isActive && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute left-0 w-1.5 h-6 bg-primary-500 rounded-r-full"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}

          <Icon className={twMerge(
            'w-5 h-5 flex-shrink-0 transition-colors',
            isActive ? 'text-primary-500' : 'group-hover:text-primary-400'
          )} />

          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-4 font-medium whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-surface-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200 border border-surface-700/50 z-50 whitespace-nowrap shadow-xl">
              {label}
            </div>
          )}
        </div>
      )}
    </NavLink>
  );
};
