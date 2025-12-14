import {
  createPlanSchema,
  updatePlanSchema,
  createMemberSchema,
  updateMemberSchema,
  createAffiliateSchema,
  updateAffiliateSchema,
} from '@/schemas/validation';

describe('Plan Schemas', () => {
  describe('createPlanSchema', () => {
    it('should validate a valid plan', () => {
      const validPlan = {
        nome: 'Plano Premium',
        precoMensal: 99.90,
        beneficios: 'Acesso completo a todas as funcionalidades',
      };

      const result = createPlanSchema.safeParse(validPlan);
      expect(result.success).toBe(true);
    });

    it('should reject a plan with short name', () => {
      const invalidPlan = {
        nome: 'AB',
        precoMensal: 99.90,
        beneficios: 'Acesso completo a todas as funcionalidades',
      };

      const result = createPlanSchema.safeParse(invalidPlan);
      expect(result.success).toBe(false);
    });

    it('should reject a plan with negative price', () => {
      const invalidPlan = {
        nome: 'Plano Premium',
        precoMensal: -10,
        beneficios: 'Acesso completo a todas as funcionalidades',
      };

      const result = createPlanSchema.safeParse(invalidPlan);
      expect(result.success).toBe(false);
    });

    it('should reject a plan with short benefits', () => {
      const invalidPlan = {
        nome: 'Plano Premium',
        precoMensal: 99.90,
        beneficios: 'Curto',
      };

      const result = createPlanSchema.safeParse(invalidPlan);
      expect(result.success).toBe(false);
    });
  });

  describe('updatePlanSchema', () => {
    it('should validate partial plan data', () => {
      const partialPlan = {
        nome: 'Novo Nome',
      };

      const result = updatePlanSchema.safeParse(partialPlan);
      expect(result.success).toBe(true);
    });

    it('should validate empty object', () => {
      const result = updatePlanSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});

describe('Member Schemas', () => {
  describe('createMemberSchema', () => {
    it('should validate a valid member', () => {
      const validMember = {
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11987654321',
        planoId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = createMemberSchema.safeParse(validMember);
      expect(result.success).toBe(true);
    });

    it('should validate a member with affiliate', () => {
      const validMember = {
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11987654321',
        planoId: '123e4567-e89b-12d3-a456-426614174000',
        afiliadoId: '123e4567-e89b-12d3-a456-426614174001',
      };

      const result = createMemberSchema.safeParse(validMember);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidMember = {
        nome: 'João Silva',
        email: 'invalid-email',
        telefone: '11987654321',
        planoId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = createMemberSchema.safeParse(invalidMember);
      expect(result.success).toBe(false);
    });

    it('should reject short phone number', () => {
      const invalidMember = {
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '123456',
        planoId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = createMemberSchema.safeParse(invalidMember);
      expect(result.success).toBe(false);
    });

    it('should reject invalid UUID for planoId', () => {
      const invalidMember = {
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11987654321',
        planoId: 'not-a-uuid',
      };

      const result = createMemberSchema.safeParse(invalidMember);
      expect(result.success).toBe(false);
    });
  });

  describe('updateMemberSchema', () => {
    it('should validate partial member data', () => {
      const partialMember = {
        nome: 'Novo Nome',
      };

      const result = updateMemberSchema.safeParse(partialMember);
      expect(result.success).toBe(true);
    });

    it('should allow null for afiliadoId', () => {
      const memberWithNullAffiliate = {
        afiliadoId: null,
      };

      const result = updateMemberSchema.safeParse(memberWithNullAffiliate);
      expect(result.success).toBe(true);
    });
  });
});

describe('Affiliate Schemas', () => {
  describe('createAffiliateSchema', () => {
    it('should validate a valid affiliate', () => {
      const validAffiliate = {
        nome: 'João Afiliado',
        codigo: 'ABC123',
      };

      const result = createAffiliateSchema.safeParse(validAffiliate);
      expect(result.success).toBe(true);
    });

    it('should reject short code', () => {
      const invalidAffiliate = {
        nome: 'João Afiliado',
        codigo: 'AB',
      };

      const result = createAffiliateSchema.safeParse(invalidAffiliate);
      expect(result.success).toBe(false);
    });

    it('should reject code with special characters', () => {
      const invalidAffiliate = {
        nome: 'João Afiliado',
        codigo: 'ABC@123',
      };

      const result = createAffiliateSchema.safeParse(invalidAffiliate);
      expect(result.success).toBe(false);
    });

    it('should accept optional userId', () => {
      const affiliateWithUserId = {
        nome: 'João Afiliado',
        codigo: 'ABC123',
        userId: 'user-123',
      };

      const result = createAffiliateSchema.safeParse(affiliateWithUserId);
      expect(result.success).toBe(true);
    });
  });

  describe('updateAffiliateSchema', () => {
    it('should validate partial affiliate data', () => {
      const partialAffiliate = {
        nome: 'Novo Nome',
      };

      const result = updateAffiliateSchema.safeParse(partialAffiliate);
      expect(result.success).toBe(true);
    });

    it('should validate empty object', () => {
      const result = updateAffiliateSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should validate code update', () => {
      const codeUpdate = {
        codigo: 'NEWCODE123',
      };

      const result = updateAffiliateSchema.safeParse(codeUpdate);
      expect(result.success).toBe(true);
    });
  });
});

