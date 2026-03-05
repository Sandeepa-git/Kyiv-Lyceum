'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    saveSiteContent,
    defaultContent,
    type SiteContent,
    subscribeToSiteContent
} from '@/lib/firestore';

export function useSiteContent() {
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = subscribeToSiteContent((data) => {
            setContent(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { content, loading, error };
}

export function useAdminContent() {
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        let unsubscribe: () => void;

        // Only setup listener if we haven't loaded yet
        if (loading) {
            unsubscribe = subscribeToSiteContent((data) => {
                setContent(data);
                setLoading(false);
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [loading]);

    const updateContent = useCallback((updater: (prev: SiteContent) => SiteContent) => {
        setContent(prev => updater(prev));
        setSaveSuccess(false);
    }, []);

    const save = useCallback(async () => {
        try {
            setSaving(true);
            setError(null);
            await saveSiteContent(content);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            setError('Failed to save content');
            console.error(err);
        } finally {
            setSaving(false);
        }
    }, [content]);

    return { content, loading, saving, error, saveSuccess, updateContent, save };
}
