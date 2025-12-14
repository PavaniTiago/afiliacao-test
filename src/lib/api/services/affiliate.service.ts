import { apiClient } from '@/lib/api/client';
import type { Affiliate, AffiliateRanking, PaginatedResponse, CreateAffiliateDto, UpdateAffiliateDto } from '@/types/api';

export const affiliateService = {
  async create(data: CreateAffiliateDto): Promise<Affiliate> {
    return apiClient.post<Affiliate>('/api/affiliates', data);
  },

  async list(params?: {
    cursor?: string;
    limit?: number;
  }): Promise<PaginatedResponse<Affiliate>> {
    const queryParams = new URLSearchParams();
    if (params?.cursor) queryParams.set('cursor', params.cursor);
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const query = queryParams.toString();
    return apiClient.get<PaginatedResponse<Affiliate>>(
      `/api/affiliates${query ? `?${query}` : ''}`
    );
  },

  async getRanking(params?: {
    cursor?: string;
    limit?: number;
  }): Promise<PaginatedResponse<AffiliateRanking>> {
    const queryParams = new URLSearchParams();
    if (params?.cursor) queryParams.set('cursor', params.cursor);
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const query = queryParams.toString();
    return apiClient.get<PaginatedResponse<AffiliateRanking>>(
      `/api/affiliates/ranking${query ? `?${query}` : ''}`
    );
  },

  async getById(id: string): Promise<Affiliate> {
    return apiClient.get<Affiliate>(`/api/affiliates/${id}`);
  },

  async update(id: string, data: UpdateAffiliateDto): Promise<Affiliate> {
    return apiClient.put<Affiliate>(`/api/affiliates/${id}`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/affiliates/${id}`);
  },
};
