'use client';

import useSWR from 'swr';
import { useSession } from '@/lib/auth/client';
import { createSWRFetcher } from '@/lib/api/fetch';
import type { Member, PaginatedResponse } from '@/types/api';

const fetcher = createSWRFetcher();

export function useMembers(cursor?: string, limit = 10) {
  const { data: session } = useSession();

  const queryParams = new URLSearchParams();
  if (cursor) queryParams.set('cursor', cursor);
  queryParams.set('limit', limit.toString());

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Member>>(
    session ? `/members?${queryParams.toString()}` : null,
    fetcher
  );

  return {
    members: data?.data || [],
    nextCursor: data?.nextCursor || null,
    hasMore: data?.hasMore || false,
    isLoading,
    error,
    mutate,
  };
}

export function useMembersByAffiliate(affiliateId: string, cursor?: string, limit = 10) {
  const { data: session } = useSession();

  const queryParams = new URLSearchParams();
  if (cursor) queryParams.set('cursor', cursor);
  queryParams.set('limit', limit.toString());

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Member>>(
    session && affiliateId
      ? `/members/by-affiliate/${affiliateId}?${queryParams.toString()}`
      : null,
    fetcher
  );

  return {
    members: data?.data || [],
    nextCursor: data?.nextCursor || null,
    hasMore: data?.hasMore || false,
    isLoading,
    error,
    mutate,
  };
}
