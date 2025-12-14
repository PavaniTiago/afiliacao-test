import { apiClient } from '@/lib/api/client';
import type { Member, PaginatedResponse, CreateMemberDto, UpdateMemberDto } from '@/types/api';

export const memberService = {
  async create(data: CreateMemberDto): Promise<Member> {
    return apiClient.post<Member>('/api/members', data);
  },

  async list(params?: {
    cursor?: string;
    limit?: number;
  }): Promise<PaginatedResponse<Member>> {
    const queryParams = new URLSearchParams();
    if (params?.cursor) queryParams.set('cursor', params.cursor);
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const query = queryParams.toString();
    return apiClient.get<PaginatedResponse<Member>>(
      `/api/members${query ? `?${query}` : ''}`
    );
  },

  async listByAffiliate(
    affiliateId: string,
    params?: { cursor?: string; limit?: number }
  ): Promise<PaginatedResponse<Member>> {
    const queryParams = new URLSearchParams();
    if (params?.cursor) queryParams.set('cursor', params.cursor);
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const query = queryParams.toString();
    return apiClient.get<PaginatedResponse<Member>>(
      `/api/members/by-affiliate/${affiliateId}${query ? `?${query}` : ''}`
    );
  },

  async getById(id: string): Promise<Member> {
    return apiClient.get<Member>(`/api/members/${id}`);
  },

  async update(id: string, data: UpdateMemberDto): Promise<Member> {
    return apiClient.put<Member>(`/api/members/${id}`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/members/${id}`);
  },
};

