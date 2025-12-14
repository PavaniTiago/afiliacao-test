'use client';

import useSWR from 'swr';
import { useSession } from '@/lib/auth/client';
import { createSWRFetcher } from '@/lib/api/fetch';
import type { Plan, PaginatedResponse } from '@/types/api';

const fetcher = createSWRFetcher();

export function usePlans(cursor?: string, limit = 10) {
  const { data: session } = useSession();

  const queryParams = new URLSearchParams();
  if (cursor) queryParams.set('cursor', cursor);
  queryParams.set('limit', limit.toString());

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Plan>>(
    session ? `/plans?${queryParams.toString()}` : null,
    fetcher
  );

  return {
    plans: data?.data || [],
    nextCursor: data?.nextCursor || null,
    hasMore: data?.hasMore || false,
    isLoading,
    error,
    mutate,
  };
}
