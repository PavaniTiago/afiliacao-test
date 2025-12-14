import { apiClient } from '@/lib/api/client';
import type { Plan, PaginatedResponse, CreatePlanDto, UpdatePlanDto } from '@/types/api';

export const planService = {
  async create(data: CreatePlanDto): Promise<Plan> {
    return apiClient.post<Plan>('/api/plans', data);
  },

  async list(params?: {
    cursor?: string;
    limit?: number;
  }): Promise<PaginatedResponse<Plan>> {
    const queryParams = new URLSearchParams();
    if (params?.cursor) queryParams.set('cursor', params.cursor);
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const query = queryParams.toString();
    return apiClient.get<PaginatedResponse<Plan>>(
      `/api/plans${query ? `?${query}` : ''}`
    );
  },

  async getById(id: string): Promise<Plan> {
    return apiClient.get<Plan>(`/api/plans/${id}`);
  },

  async update(id: string, data: UpdatePlanDto): Promise<Plan> {
    return apiClient.put<Plan>(`/api/plans/${id}`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/plans/${id}`);
  },
};
