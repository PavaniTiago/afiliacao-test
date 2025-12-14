import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3333';
const baseURL = `${BACKEND_URL}/api`;

export class ApiClient {
  private async getCookieHeader(): Promise<string> {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    if (allCookies.length === 0) {
      throw new Error('No authentication cookies found. Please login again.');
    }

    return allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  }

  private cleanEndpoint(endpoint: string): string {
    if (endpoint.startsWith('/api/')) {
      return endpoint.replace('/api/', '/');
    }
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const cookieHeader = await this.getCookieHeader();
    const url = `${baseURL}${this.cleanEndpoint(endpoint)}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
        ...options.headers,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = await response.json().catch(() => ({
          message: 'Sessão expirada ou inválida',
        }));
        throw new Error(error.message || 'Sessão expirada. Faça login novamente.');
      }

      const error = await response.json().catch(() => ({
        message: 'Erro desconhecido',
      }));
      throw new Error(error.message || `Erro: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
