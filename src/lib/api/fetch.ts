const baseURL = '/api/proxy';

export interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function cleanEndpoint(endpoint: string): string {
  let cleaned = endpoint;
  if (cleaned.startsWith('/api/')) {
    cleaned = cleaned.replace('/api/', '/');
  }
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const cleanedEndpoint = cleanEndpoint(endpoint);
  const url = `${baseURL}${cleanedEndpoint}`;

  const { body, ...restOptions } = options;

  const response = await fetch(url, {
    ...restOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...restOptions.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    if (response.status === 401) {
      const error = await response.json().catch(() => ({
        message: 'Sessão expirada ou inválida',
      }));
      throw new ApiError(
        error.message || 'Sessão expirada. Faça login novamente.',
        401
      );
    }

    const error = await response.json().catch(() => ({
      message: 'Erro na requisição',
    }));

    throw new ApiError(
      error.message || `Erro: ${response.status}`,
      response.status,
      error.errors
    );
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown) =>
    apiFetch<T>(endpoint, { method: 'POST', body: data }),

  put: <T>(endpoint: string, data?: unknown) =>
    apiFetch<T>(endpoint, { method: 'PUT', body: data }),

  delete: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: 'DELETE' }),
};

export function createSWRFetcher() {
  return async <T>(url: string): Promise<T> => {
    return apiFetch<T>(url, { method: 'GET' });
  };
}
