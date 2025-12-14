'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPlanSchema, type CreatePlanInput } from '@/schemas/validation';
import { api, ApiError } from '@/lib/api/fetch';
import type { Plan } from '@/types/api';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface PlanFormProps {
  plan?: Plan;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function PlanForm({ plan, open, onOpenChange, onSuccess }: PlanFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CreatePlanInput>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: plan
      ? {
          nome: plan.nome,
          precoMensal: plan.precoMensal,
          beneficios: plan.beneficios,
        }
      : {
          nome: '',
          precoMensal: 0,
          beneficios: '',
        },
  });

  useEffect(() => {
    if (plan) {
      form.reset({
        nome: plan.nome,
        precoMensal: plan.precoMensal,
        beneficios: plan.beneficios,
      });
    }
  }, [plan, form]);

  const onSubmit = async (data: CreatePlanInput) => {
    setIsLoading(true);
    try {
      const body = {
        nome: data.nome,
        precoMensal: data.precoMensal,
        beneficios: data.beneficios,
      };

      if (plan) {
        await api.put<Plan>(`/plans/${plan.id}`, body);
        toast.success('Plano atualizado com sucesso');
      } else {
        await api.post<Plan>('/plans', body);
        toast.success('Plano criado com sucesso');
      }

      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao salvar plano');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? 'Editar Plano' : 'Novo Plano'}</DialogTitle>
          <DialogDescription>
            {plan ? 'Atualize as informações do plano' : 'Preencha os dados do novo plano'}
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
                    <Input placeholder="Plano Premium" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="precoMensal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Mensal</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="99.90"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="beneficios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefícios</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acesso completo a todas as funcionalidades"
                      {...field}
                    />
                  </FormControl>
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
                {isLoading ? 'Salvando...' : plan ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
