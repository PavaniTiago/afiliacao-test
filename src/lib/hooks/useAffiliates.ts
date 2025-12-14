'use client';

import useSWR from 'swr';
import { useSession } from '@/lib/auth/client';
import { createSWRFetcher } from '@/lib/api/fetch';
import type { Affiliate, AffiliateRanking, PaginatedResponse } from '@/types/api';

const fetcher = createSWRFetcher();

export function useAffiliates(cursor?: string, limit = 10) {
  const { data: session } = useSession();

  const queryParams = new URLSearchParams();
  if (cursor) queryParams.set('cursor', cursor);
  queryParams.set('limit', limit.toString());

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Affiliate>>(
    session ? `/affiliates?${queryParams.toString()}` : null,
    fetcher
  );

  return {
    affiliates: data?.data || [],
    nextCursor: data?.nextCursor || null,
    hasMore: data?.hasMore || false,
    isLoading,
    error,
    mutate,
  };
}

export function useAffiliateRanking(cursor?: string, limit = 10) {
  const { data: session } = useSession();

  const queryParams = new URLSearchParams();
  if (cursor) queryParams.set('cursor', cursor);
  queryParams.set('limit', limit.toString());

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<AffiliateRanking>>(
    session ? `/affiliates/ranking?${queryParams.toString()}` : null,
    fetcher
  );

  return {
    ranking: data?.data || [],
    nextCursor: data?.nextCursor || null,
    hasMore: data?.hasMore || false,
    isLoading,
    error,
    mutate,
  };
}
