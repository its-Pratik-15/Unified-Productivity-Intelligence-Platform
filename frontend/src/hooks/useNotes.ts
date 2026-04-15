import { useState, useEffect, useCallback } from 'react';
import { noteApi } from '../services/api';
import { useStore } from '../context/store';

export const useNotes = () => {
    const { userId, notes, setNotes } = useStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await noteApi.getAll(userId);
            if (response.data.success && response.data.data) {
                setNotes(response.data.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    }, [userId, setNotes]);

    const createNote = useCallback(async (title: string, content: string) => {
        try {
            await noteApi.create(userId, title, content);
            await fetchNotes();
        } catch (err: any) {
            setError(err.message || 'Failed to create note');
        }
    }, [userId, fetchNotes]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return { notes, loading, error, createNote, refetch: fetchNotes };
};
