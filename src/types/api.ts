export interface Plan {
  id: string;
  nome: string;
  precoMensal: number;
  beneficios: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  planoId: string;
  afiliadoId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Affiliate {
  id: string;
  nome: string;
  codigo: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AffiliateRanking {
  affiliate: Affiliate;
  indicationCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CreatePlanDto {
  nome: string;
  precoMensal: number;
  beneficios: string;
}

export interface UpdatePlanDto {
  nome?: string;
  precoMensal?: number;
  beneficios?: string;
}

export interface CreateMemberDto {
  nome: string;
  email: string;
  telefone: string;
  planoId: string;
  afiliadoId?: string;
}

export interface UpdateMemberDto {
  nome?: string;
  email?: string;
  telefone?: string;
  planoId?: string;
  afiliadoId?: string | null;
}

export interface CreateAffiliateDto {
  nome: string;
  codigo: string;
}

export interface UpdateAffiliateDto {
  nome?: string;
  codigo?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

