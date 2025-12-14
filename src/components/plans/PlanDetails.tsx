'use client';

import { useMembers } from '@/lib/hooks/useMembers';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import type { Plan } from '@/types/api';

interface PlanDetailsProps {
  plan: Plan;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlanDetails({ plan, open, onOpenChange }: PlanDetailsProps) {
  const { members, isLoading } = useMembers();
  const planMembers = members.filter((m) => m.planoId === plan.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{plan.nome}</DialogTitle>
          <DialogDescription>Detalhes do plano</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Preço Mensal</p>
            <p className="text-2xl font-bold">
              R$ {plan.precoMensal.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Benefícios</p>
            <p className="text-sm">{plan.beneficios}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Membros ({planMembers.length})
            </p>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : planMembers.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum membro associado a este plano
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {planMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.nome}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.telefone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

