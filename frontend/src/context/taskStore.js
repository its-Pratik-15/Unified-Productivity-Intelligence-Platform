import { create } from 'zustand';
import api from '../utils/api';

/**
 * Zustand store for Tasks state.
 * Implements logic for recursive task trees and backend persistence.
 */
export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/tasks');
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      set((state) => ({ tasks: [...state.tasks, response.data] }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      await api.patch(`/tasks/${taskId}`, updates);
      set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteTask: async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter(t => t.id !== taskId)
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Helper to get nested tasks for the TaskTree component
  getTaskTree: () => {
    const { tasks } = get();
    const taskMap = {};
    const rootTasks = [];

    // Initialize map
    tasks.forEach(task => {
      taskMap[task.id] = { ...task, children: [] };
    });

    // Build hierarchy
    tasks.forEach(task => {
      if (task.parentId && taskMap[task.parentId]) {
        taskMap[task.parentId].children.push(taskMap[task.id]);
      } else if (!task.parentId) {
        rootTasks.push(taskMap[task.id]);
      }
    });

    return rootTasks;
  }
}));
