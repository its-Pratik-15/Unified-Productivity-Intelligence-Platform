import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../organisms/Sidebar';
import { useUIStore } from '../../context/uiStore';
import { Toaster } from 'sonner';

/**
 * Main Layout template providing the application shell.
 */
export const MainLayout = () => {
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <div className="flex min-h-screen bg-surface-50 overflow-hidden">
      {/* Toast Notifications */}
      <Toaster 
        theme="light" 
        position="top-right" 
        expand={false} 
        richColors 
        toastOptions={{
          style: {
            background: '#ffffff',
            border: '1px solid #E5E7EB',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }
        }}
      />

      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar} 
      />

      <main 
        className="flex-1 relative flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: isSidebarCollapsed ? 80 : 280 }}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
