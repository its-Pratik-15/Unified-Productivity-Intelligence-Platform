import { create } from 'zustand';

/**
 * Zustand store for UI state (Sidebar, Notifications, Theme).
 */
export const useUIStore = create((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  
  notifications: [],
  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }]
    }));
    // Auto-remove after 3 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    }, 3000);
  },
}));
