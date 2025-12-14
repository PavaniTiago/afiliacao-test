'use client';

import { useState } from 'react';
import { useMembers } from '@/lib/hooks/useMembers';
import { usePlans } from '@/lib/hooks/usePlans';
import { useAffiliates } from '@/lib/hooks/useAffiliates';
import { MemberForm } from './MemberForm';
import { MemberDetails } from './MemberDetails';
import { deleteMember } from '@/app/actions/members';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Member } from '@/types/api';

export function MemberList() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { members, isLoading, error, mutate } = useMembers();
  const { plans } = usePlans();
  const { affiliates } = useAffiliates();

  const handleCreate = () => {
    setEditingMember(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este membro?')) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteMember(id);
      if (!result.success) {
        toast.error(result.error || 'Erro ao deletar membro');
        return;
      }
      toast.success('Membro deletado com sucesso');
      mutate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao deletar membro');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSuccess = () => {
    mutate();
  };

  const getPlanName = (planId: string) => {
    return plans.find((p) => p.id === planId)?.nome || 'N/A';
  };

  const getAffiliateName = (affiliateId: string | null) => {
    if (!affiliateId) return 'N/A';
    return affiliates.find((a) => a.id === affiliateId)?.nome || 'N/A';
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">Erro ao carregar membros</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Membros</CardTitle>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Membro
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : members.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhum membro cadastrado
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Afiliado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.nome}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.telefone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getPlanName(member.planoId)}</Badge>
                    </TableCell>
                    <TableCell>
                      {member.afiliadoId ? (
                        <Badge variant="outline">{getAffiliateName(member.afiliadoId)}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                        >
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(member)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                          disabled={deletingId === member.id}
                        >
                          {deletingId === member.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <MemberForm
        member={editingMember}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={handleSuccess}
      />

      {selectedMember && (
        <MemberDetails
          member={selectedMember}
          open={!!selectedMember}
          onOpenChange={(open) => !open && setSelectedMember(null)}
        />
      )}
    </>
  );
}

