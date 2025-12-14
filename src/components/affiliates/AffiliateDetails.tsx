'use client';

import { useMembersByAffiliate } from '@/lib/hooks/useMembers';
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
import type { Affiliate } from '@/types/api';

interface AffiliateDetailsProps {
  affiliate: Affiliate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AffiliateDetails({
  affiliate,
  open,
  onOpenChange,
}: AffiliateDetailsProps) {
  const { members, isLoading } = useMembersByAffiliate(affiliate.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{affiliate.nome}</DialogTitle>
          <DialogDescription>Detalhes do afiliado</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Código</p>
            <Badge variant="secondary" className="mt-1">
              {affiliate.codigo}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Membros Indicados ({members.length})
            </p>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : members.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum membro indicado por este afiliado
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
                  {members.map((member) => (
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

