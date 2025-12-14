'use client';

import { usePlans } from '@/lib/hooks/usePlans';
import { useAffiliates } from '@/lib/hooks/useAffiliates';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { Member } from '@/types/api';

interface MemberDetailsProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MemberDetails({ member, open, onOpenChange }: MemberDetailsProps) {
  const { plans } = usePlans();
  const { affiliates } = useAffiliates();
  const plan = plans.find((p) => p.id === member.planoId);
  const affiliate = member.afiliadoId
    ? affiliates.find((a) => a.id === member.afiliadoId)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{member.nome}</DialogTitle>
          <DialogDescription>Detalhes do membro</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-sm">{member.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Telefone</p>
            <p className="text-sm">{member.telefone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Plano</p>
            {plan ? (
              <div className="mt-1">
                <Badge variant="secondary">{plan.nome}</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  R$ {plan.precoMensal.toFixed(2)}/mês
                </p>
              </div>
            ) : (
              <p className="text-sm">N/A</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Afiliado</p>
            {affiliate ? (
              <div className="mt-1">
                <Badge variant="outline">{affiliate.nome}</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Código: {affiliate.codigo}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum afiliado associado</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

