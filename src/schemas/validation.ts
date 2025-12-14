import { z } from 'zod';

export const createPlanSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres'),
  precoMensal: z.number().positive('Preço deve ser positivo').max(1000000, 'Preço muito alto'),
  beneficios: z.string().min(10, 'Benefícios devem ter no mínimo 10 caracteres').max(500, 'Benefícios devem ter no máximo 500 caracteres'),
});

export const updatePlanSchema = createPlanSchema.partial();

export const createMemberSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(200, 'Nome deve ter no máximo 200 caracteres'),
  email: z.string().email('Email inválido').max(255, 'Email muito longo'),
  telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 caracteres').max(11, 'Telefone deve ter no máximo 11 caracteres'),
  planoId: z.string().uuid('ID do plano inválido'),
  afiliadoId: z.string().uuid('ID do afiliado inválido').optional(),
});

export const updateMemberSchema = z.object({
  nome: z.string().min(3).max(200).optional(),
  email: z.string().email().max(255).optional(),
  telefone: z.string().min(10).max(11).optional(),
  planoId: z.string().uuid().optional(),
  afiliadoId: z
    .union([z.string().uuid(), z.null()])
    .optional()
    .transform((val) => {
      if (val === '') return null;
      return val;
    }),
});

export const createAffiliateSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(200, 'Nome deve ter no máximo 200 caracteres'),
  codigo: z.string().min(6, 'Código deve ter no mínimo 6 caracteres').max(20, 'Código deve ter no máximo 20 caracteres').regex(/^[A-Za-z0-9]+$/, 'Código deve conter apenas letras e números'),
  userId: z.string().optional(),
});

export const updateAffiliateSchema = z.object({
  nome: z.string().min(3).max(200).optional(),
  codigo: z.string().min(6).max(20).regex(/^[A-Za-z0-9]+$/).optional(),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>;
export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
export type CreateAffiliateInput = z.infer<typeof createAffiliateSchema>;
export type UpdateAffiliateInput = z.infer<typeof updateAffiliateSchema>;

