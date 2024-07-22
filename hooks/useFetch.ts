import { useState } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'; // Define other HTTP methods as needed

interface FetchHookResponse<T> {
  isLoading: boolean;
  response: T | null;
  error: string | null;
  fetchData: (url: string, method?: HttpMethod, body?: object) => Promise<void>;
}

const useFetch = <T>() : FetchHookResponse<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string, method: HttpMethod = 'GET', body?: object) => {
    setIsLoading(true);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const result = await fetch(url, options);
      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || 'Fetch failed');
      }

      setResponse(data);
      setError(null);
    } catch (error:any) {
      setError(error.message);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, response, error, fetchData };
};

export default useFetch;
