import { useState, useEffect, useCallback } from 'react';
import { integrationApi } from '../services/api';
import { useStore } from '../context/store';

export const useIntegrations = () => {
    const { userId, integrations, setIntegrations } = useStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchIntegrations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await integrationApi.getAll(userId);
            if (response.data.success && response.data.data) {
                setIntegrations(response.data.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch integrations');
        } finally {
            setLoading(false);
        }
    }, [userId, setIntegrations]);

    const connectIntegration = useCallback(async (provider: 'slack' | 'outlook', token: string) => {
        try {
            await integrationApi.connect(userId, provider, token);
            await fetchIntegrations();
        } catch (err: any) {
            setError(err.message || 'Failed to connect integration');
        }
    }, [userId, fetchIntegrations]);

    const disconnectIntegration = useCallback(async (provider: string) => {
        try {
            await integrationApi.disconnect(userId, provider);
            await fetchIntegrations();
        } catch (err: any) {
            setError(err.message || 'Failed to disconnect integration');
        }
    }, [userId, fetchIntegrations]);

    useEffect(() => {
        fetchIntegrations();
    }, [fetchIntegrations]);

    return { integrations, loading, error, connectIntegration, disconnectIntegration, refetch: fetchIntegrations };
};
