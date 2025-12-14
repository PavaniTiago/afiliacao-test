'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api/fetch';
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
import type { Affiliate } from '@/types/api';

const affiliateFormSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(200),
  codigo: z.string().min(6, 'Código deve ter no mínimo 6 caracteres').max(20).regex(/^[A-Za-z0-9]+$/, 'Código deve conter apenas letras e números'),
});

type AffiliateFormInput = z.infer<typeof affiliateFormSchema>;

interface AffiliateFormProps {
  affiliate?: Affiliate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AffiliateForm({
  affiliate,
  open,
  onOpenChange,
  onSuccess,
}: AffiliateFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AffiliateFormInput>({
    resolver: zodResolver(affiliateFormSchema),
    defaultValues: affiliate
      ? { nome: affiliate.nome, codigo: affiliate.codigo }
      : { nome: '', codigo: '' },
    mode: 'onChange',
  });

  useEffect(() => {
    if (affiliate) {
      form.reset({
        nome: affiliate.nome,
        codigo: affiliate.codigo,
      });
    } else if (open && !affiliate) {
      form.reset({
        nome: '',
        codigo: '',
      });
    }
  }, [affiliate, open, form]);

  const onSubmit = async (data: AffiliateFormInput) => {
    setIsLoading(true);
    try {
      const body = {
        nome: data.nome,
        codigo: data.codigo,
      };

      if (affiliate) {
        await api.put<Affiliate>(`/affiliates/${affiliate.id}`, body);
        toast.success('Afiliado atualizado com sucesso');
      } else {
        await api.post<Affiliate>('/affiliates', body);
        toast.success('Afiliado criado com sucesso');
      }

      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao salvar afiliado');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{affiliate ? 'Editar Afiliado' : 'Novo Afiliado'}</DialogTitle>
          <DialogDescription>
            {affiliate
              ? 'Atualize as informações do afiliado'
              : 'Preencha os dados do novo afiliado'}
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
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC123" {...field} />
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
                {isLoading ? 'Salvando...' : affiliate ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
