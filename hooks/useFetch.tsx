import { useState, useCallback } from 'react';
const API_URL = 'http://192.168.1.5:3000'; // Your server IP

interface FetchOptions extends RequestInit {
  body?: any;
}

interface FetchResult<T> {
  fetchData: (url: string, options?: FetchOptions) => Promise<T>;
  loading: boolean;
  error: string | null;
}

const useFetch = <T = any>(): FetchResult<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (url: string, options: FetchOptions = {}): Promise<T> => {
    setLoading(true);
    setError(null);
console.log(API_URL+url)
    try {
      const response = await fetch(API_URL+url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: T = await response.json();
      setLoading(false);
      return data;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(errorMessage);
      setLoading(false);
      throw e;
    }
  }, []);

  return { fetchData, loading, error };
};

export default useFetch;