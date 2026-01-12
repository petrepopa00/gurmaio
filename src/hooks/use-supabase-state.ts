import { useState, useEffect, useCallback } from 'react';
import { SupabaseService } from '@/lib/supabase-service';

export function useSupabaseState<T>(
  fetchFn: () => Promise<T>,
  defaultValue: T,
  dependencies: any[] = []
): [T, (value: T | ((prev: T) => T)) => void, () => void, boolean, Error | null] {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, ...dependencies]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateData = useCallback((value: T | ((prev: T) => T)) => {
    setData((prev) => {
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
      return newValue;
    });
  }, []);

  const deleteData = useCallback(() => {
    setData(defaultValue);
  }, [defaultValue]);

  return [data, updateData, deleteData, loading, error];
}
