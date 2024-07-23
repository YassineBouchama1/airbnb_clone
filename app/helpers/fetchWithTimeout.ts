

declare global {
    interface Window {
      AbortController: typeof AbortController;
    }
  }
  
  export type FetchWithTimeoutOptions = RequestInit & {
    timeout?: number;
  };
  

  //  to handle timeout issues
  export async function fetchWithTimeout(
    resource: string | URL | Request,
    options: FetchWithTimeoutOptions = {}
  ): Promise<Response> {
    const { timeout = 8000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  }