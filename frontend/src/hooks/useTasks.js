import { useEffect, useCallback } from 'react';
import { useTaskStore } from '../context/taskStore';

/**
 * Custom hook for task-related business logic.
 * Optimizes re-renders using useCallback.
 */
export const useTasks = () => {
  const { 
    tasks, 
    isLoading, 
    fetchTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    getTaskTree 
  } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    taskTree: getTaskTree(),
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks
  };
};
