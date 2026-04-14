import { create } from 'zustand';
import api from '../utils/api';

/**
 * Zustand store for Notes.
 * Implements CRUD with backend persistence.
 */
export const useNoteStore = create((set, get) => ({
  notes: [],
  isLoading: false,

  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/notes');
      set({ notes: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch notes', error);
      set({ isLoading: false });
    }
  },

  createNote: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      set((state) => ({ notes: [response.data, ...state.notes] }));
      return response.data;
    } catch (error) {
      console.error('Failed to create note', error);
      throw error;
    }
  },

  updateNote: async (noteId, updates) => {
    try {
      await api.patch(`/notes/${noteId}`, updates);
      set((state) => ({
        notes: state.notes.map(n => n.id === noteId ? { ...n, ...updates } : n)
      }));
    } catch (error) {
      console.error('Failed to update note', error);
    }
  },

  deleteNote: async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      set((state) => ({
        notes: state.notes.filter(n => n.id !== noteId)
      }));
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  }
}));
