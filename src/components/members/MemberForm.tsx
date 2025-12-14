'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api/fetch';
import { usePlans } from '@/lib/hooks/usePlans';
import { useAffiliates } from '@/lib/hooks/useAffiliates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { Member, CreateMemberDto, UpdateMemberDto } from '@/types/api';

const memberFormSchema = z.object({
  nome: z.string().min(3).max(200),
  email: z.string().email().max(255),
  telefone: z.string().min(10).max(11),
  planoId: z.string().uuid(),
  afiliadoId: z.union([z.string().uuid(), z.null()]).optional(),
});

type MemberFormInput = z.infer<typeof memberFormSchema>;

interface MemberFormProps {
  member?: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function MemberForm({ member, open, onOpenChange, onSuccess }: MemberFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { plans } = usePlans();
  const { affiliates } = useAffiliates();
  const form = useForm<MemberFormInput>({
    resolver: zodResolver(memberFormSchema) as any,
    defaultValues: member
      ? {
          nome: member.nome,
          email: member.email,
          telefone: member.telefone,
          planoId: member.planoId,
          afiliadoId: member.afiliadoId || undefined,
        }
      : {
          nome: '',
          email: '',
          telefone: '',
          planoId: undefined,
          afiliadoId: undefined,
        },
  });

  useEffect(() => {
    if (member) {
      form.reset({
        nome: member.nome,
        email: member.email,
        telefone: member.telefone,
        planoId: member.planoId,
        afiliadoId: member.afiliadoId || undefined,
      });
    }
  }, [member, form]);

  const onSubmit = async (data: MemberFormInput) => {
    setIsLoading(true);
    try {
      const body: CreateMemberDto | UpdateMemberDto = member
        ? {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            planoId: data.planoId,
            afiliadoId: data.afiliadoId && typeof data.afiliadoId === 'string' && data.afiliadoId.trim() !== ''
              ? data.afiliadoId
              : null,
          }
        : {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            planoId: data.planoId,
            ...(data.afiliadoId && { afiliadoId: data.afiliadoId }),
          };

      if (member) {
        await api.put<Member>(`/members/${member.id}`, body);
        toast.success('Membro atualizado com sucesso');
      } else {
        await api.post<Member>('/members', body);
        toast.success('Membro criado com sucesso');
      }

      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof ApiError && error.errors) {
        const errorMessages = Object.entries(error.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('\n');
        toast.error(`Erro de validação:\n${errorMessages}`);
      } else if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao salvar membro');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{member ? 'Editar Membro' : 'Novo Membro'}</DialogTitle>
          <DialogDescription>
            {member ? 'Atualize as informações do membro' : 'Preencha os dados do novo membro'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="João Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="joao@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="11987654321" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plano</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || undefined}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um plano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.nome} - R$ {plan.precoMensal.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="afiliadoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Afiliado (Opcional)</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const newValue = value === '__none__' ? undefined : value;
                      field.onChange(newValue);
                    }}
                    defaultValue={field.value || '__none__'}
                    value={field.value || '__none__'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um afiliado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="__none__">Nenhum</SelectItem>
                      {affiliates.map((affiliate) => (
                        <SelectItem key={affiliate.id} value={affiliate.id}>
                          {affiliate.nome} ({affiliate.codigo})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : member ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
