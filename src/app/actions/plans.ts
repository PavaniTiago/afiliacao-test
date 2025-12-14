'use server';

import { revalidatePath } from 'next/cache';
import { planService } from '@/lib/api/services/plan.service';
import { createPlanSchema, updatePlanSchema } from '@/schemas/validation';
import type { ApiResponse, Plan, CreatePlanDto, UpdatePlanDto } from '@/types/api';

export async function createPlan(
  data: CreatePlanDto
): Promise<ApiResponse<Plan>> {
  try {
    const validated = createPlanSchema.parse(data);
    const plan = await planService.create(validated);
    revalidatePath('/dashboard');
    return { success: true, data: plan };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar plano',
    };
  }
}

export async function updatePlan(
  id: string,
  data: UpdatePlanDto
): Promise<ApiResponse<Plan>> {
  try {
    const validated = updatePlanSchema.parse(data);
    const plan = await planService.update(id, validated);
    revalidatePath('/dashboard');
    return { success: true, data: plan };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao atualizar plano',
    };
  }
}

export async function deletePlan(id: string): Promise<ApiResponse<void>> {
  try {
    await planService.delete(id);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar plano',
    };
  }
}

