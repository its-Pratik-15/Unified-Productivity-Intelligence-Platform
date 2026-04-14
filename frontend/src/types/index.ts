export type User = {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
}

export type Task = {
    id: string;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    userId: string;
    parentId?: string;
    children?: Task[];
    createdAt: string;
}

export type Note = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export type Notification = {
    id: string;
    type: string;
    message: string;
    status: 'read' | 'unread';
    createdAt: string;
}

export type Integration = {
    id: string;
    userId: string;
    provider: 'slack' | 'outlook';
    status: 'connected' | 'disconnected';
    configJson: string;
    lastSyncAt?: string;
    createdAt: string;
}

export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
