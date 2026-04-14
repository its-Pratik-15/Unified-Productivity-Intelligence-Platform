import axios from 'axios';
import type { ApiResponse, Task, Note, Integration, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Users
export const userApi = {
    create: (email: string, name?: string) =>
        api.post<ApiResponse<User>>('/users', { email, name }),
    get: (userId: string) =>
        api.get<ApiResponse<User>>(`/users/${userId}`),
};

// Tasks
export const taskApi = {
    create: (userId: string, title: string, priority: 'low' | 'medium' | 'high') =>
        api.post<ApiResponse<Task>>('/tasks', { userId, title, priority }),
    getAll: (userId: string) =>
        api.get<ApiResponse<Task[]>>(`/tasks/${userId}`),
    updateStatus: (taskId: string, status: 'pending' | 'in-progress' | 'completed') =>
        api.patch<ApiResponse<void>>(`/tasks/${taskId}/status`, { status }),
};

// Notes
export const noteApi = {
    create: (userId: string, title: string, content: string) =>
        api.post<ApiResponse<Note>>('/notes', { userId, title, content }),
    getAll: (userId: string) =>
        api.get<ApiResponse<Note[]>>(`/notes/${userId}`),
    update: (noteId: string, title: string, content: string) =>
        api.patch<ApiResponse<void>>(`/notes/${noteId}`, { title, content }),
};

// Notifications
export const notificationApi = {
    send: (type: 'email' | 'sms' | 'slack', message: string, recipient: string) =>
        api.post<ApiResponse<void>>('/notifications/send', { type, message, recipient }),
};

// Integrations
export const integrationApi = {
    connect: (userId: string, provider: 'slack' | 'outlook', token: string) =>
        api.post<ApiResponse<void>>('/integrations/connect', { userId, provider, token }),
    disconnect: (userId: string, provider: string) =>
        api.post<ApiResponse<void>>('/integrations/disconnect', { userId, provider }),
    getAll: (userId: string) =>
        api.get<ApiResponse<Integration[]>>(`/integrations/${userId}`),
};

export default api;
