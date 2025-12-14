'use client';

import { useState } from 'react';
import { useAffiliates } from '@/lib/hooks/useAffiliates';
import { AffiliateForm } from './AffiliateForm';
import { AffiliateDetails } from './AffiliateDetails';
import { deleteAffiliate } from '@/app/actions/affiliates';
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
import type { Affiliate } from '@/types/api';

export function AffiliateList() {
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { affiliates, isLoading, error, mutate } = useAffiliates();

  const handleCreate = () => {
    setEditingAffiliate(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (affiliate: Affiliate) => {
    setEditingAffiliate(affiliate);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este afiliado?')) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteAffiliate(id);
      if (!result.success) {
        toast.error(result.error || 'Erro ao deletar afiliado');
        return;
      }
      toast.success('Afiliado deletado com sucesso');
      mutate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao deletar afiliado');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSuccess = () => {
    mutate();
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">Erro ao carregar afiliados</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Afiliados</CardTitle>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Afiliado
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : affiliates.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhum afiliado cadastrado
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {affiliates.map((affiliate) => (
                  <TableRow key={affiliate.id}>
                    <TableCell className="font-medium">{affiliate.nome}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{affiliate.codigo}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedAffiliate(affiliate)}
                        >
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(affiliate)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(affiliate.id)}
                          disabled={deletingId === affiliate.id}
                        >
                          {deletingId === affiliate.id ? (
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

      <AffiliateForm
        affiliate={editingAffiliate}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={handleSuccess}
      />

      {selectedAffiliate && (
        <AffiliateDetails
          affiliate={selectedAffiliate}
          open={!!selectedAffiliate}
          onOpenChange={(open) => !open && setSelectedAffiliate(null)}
        />
      )}
    </>
  );
}

