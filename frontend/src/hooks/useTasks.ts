import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '../services/api';
import { useStore } from '../context/store';
import type { Task } from '../types';

export const useTasks = () => {
    const { userId, tasks, setTasks, updateTask } = useStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await taskApi.getAll(userId);
            if (response.data.success && response.data.data) {
                setTasks(response.data.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, [userId, setTasks]);

    const createTask = useCallback(async (title: string, priority: 'low' | 'medium' | 'high') => {
        try {
            await taskApi.create(userId, title, priority);
            await fetchTasks();
        } catch (err: any) {
            setError(err.message || 'Failed to create task');
        }
    }, [userId, fetchTasks]);

    const changeStatus = useCallback(async (taskId: string, status: Task['status']) => {
        try {
            await taskApi.updateStatus(taskId, status);
            updateTask(taskId, { status });
        } catch (err: any) {
            setError(err.message || 'Failed to update task');
        }
    }, [updateTask]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, loading, error, createTask, changeStatus, refetch: fetchTasks };
};
