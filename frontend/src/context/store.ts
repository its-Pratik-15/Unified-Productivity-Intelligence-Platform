import { create } from 'zustand';
import type { Task, Note, Integration } from '../types';

interface AppState {
    userId: string;
    tasks: Task[];
    notes: Note[];
    integrations: Integration[];
    darkMode: boolean;

    setUserId: (userId: string) => void;
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note) => void;
    setIntegrations: (integrations: Integration[]) => void;
    toggleDarkMode: () => void;
}

export const useStore = create<AppState>((set) => ({
    userId: '11de5271-5576-4919-9aee-9becb471afc1', // Default test user
    tasks: [],
    notes: [],
    integrations: [],
    darkMode: true,

    setUserId: (userId) => set({ userId }),

    setTasks: (tasks) => set({ tasks }),

    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task]
    })),

    updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
        )
    })),

    setNotes: (notes) => set({ notes }),

    addNote: (note) => set((state) => ({
        notes: [...state.notes, note]
    })),

    setIntegrations: (integrations) => set({ integrations }),

    toggleDarkMode: () => set((state) => ({
        darkMode: !state.darkMode
    })),
}));
