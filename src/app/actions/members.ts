'use server';

import { revalidatePath } from 'next/cache';
import { memberService } from '@/lib/api/services/member.service';
import { createMemberSchema, updateMemberSchema } from '@/schemas/validation';
import type { ApiResponse, Member, CreateMemberDto, UpdateMemberDto } from '@/types/api';

export async function createMember(
  data: CreateMemberDto
): Promise<ApiResponse<Member>> {
  try {
    const validated = createMemberSchema.parse(data);
    const member = await memberService.create(validated);
    revalidatePath('/dashboard');
    return { success: true, data: member };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar membro',
    };
  }
}

export async function updateMember(
  id: string,
  data: UpdateMemberDto
): Promise<ApiResponse<Member>> {
  try {
    const validated = updateMemberSchema.parse(data);
    const member = await memberService.update(id, validated);
    revalidatePath('/dashboard');
    return { success: true, data: member };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao atualizar membro',
    };
  }
}

export async function deleteMember(id: string): Promise<ApiResponse<void>> {
  try {
    await memberService.delete(id);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar membro',
    };
  }
}

