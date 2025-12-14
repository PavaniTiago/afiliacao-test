'use server';

import { revalidatePath } from 'next/cache';
import { affiliateService } from '@/lib/api/services/affiliate.service';
import { createAffiliateSchema, updateAffiliateSchema } from '@/schemas/validation';
import type { ApiResponse, Affiliate, CreateAffiliateDto, UpdateAffiliateDto } from '@/types/api';

export async function createAffiliate(
  data: CreateAffiliateDto
): Promise<ApiResponse<Affiliate>> {
  try {
    const validated = createAffiliateSchema.parse(data);
    const affiliate = await affiliateService.create(validated);
    revalidatePath('/dashboard');
    return { success: true, data: affiliate };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar afiliado',
    };
  }
}

export async function updateAffiliate(
  id: string,
  data: UpdateAffiliateDto
): Promise<ApiResponse<Affiliate>> {
  try {
    const validated = updateAffiliateSchema.parse(data);
    const affiliate = await affiliateService.update(id, validated);
    revalidatePath('/dashboard');
    return { success: true, data: affiliate };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao atualizar afiliado',
    };
  }
}

export async function deleteAffiliate(id: string): Promise<ApiResponse<void>> {
  try {
    await affiliateService.delete(id);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar afiliado',
    };
  }
}

