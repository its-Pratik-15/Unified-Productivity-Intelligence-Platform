import { create } from 'zustand';
import api from '../utils/api';

/**
 * Zustand store for Notifications.
 * Implements the Strategy Pattern integration from the backend.
 */
export const useNotificationStore = create((set, get) => ({
  notifications: [],
  activeStrategy: 'email', // Default strategy
  isLoading: false,

  setStrategy: (strategy) => set({ activeStrategy: strategy }),

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/notifications');
      set({ notifications: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      set({ isLoading: false });
    }
  },

  sendNotification: async (title, message) => {
    const { activeStrategy } = get();
    try {
      const response = await api.post('/notifications/send', {
        title,
        message,
        strategy: activeStrategy
      });
      
      // Update history locally
      set((state) => ({ 
        notifications: [response.data, ...state.notifications] 
      }));
      
      return response.data;
    } catch (error) {
      console.error('Failed to send notification', error);
      throw error;
    }
  }
}));
