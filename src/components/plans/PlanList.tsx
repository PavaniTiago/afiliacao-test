'use client';

import { useState } from 'react';
import { usePlans } from '@/lib/hooks/usePlans';
import { PlanForm } from './PlanForm';
import { PlanDetails } from './PlanDetails';
import { deletePlan } from '@/app/actions/plans';
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
import type { Plan } from '@/types/api';

export function PlanList() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { plans, isLoading, error, mutate } = usePlans();

  const handleCreate = () => {
    setEditingPlan(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este plano?')) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deletePlan(id);
      if (!result.success) {
        toast.error(result.error || 'Erro ao deletar plano');
        return;
      }
      toast.success('Plano deletado com sucesso');
      mutate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao deletar plano');
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
          <p className="text-destructive">Erro ao carregar planos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Planos</CardTitle>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Plano
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : plans.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhum plano cadastrado
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço Mensal</TableHead>
                  <TableHead>Benefícios</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.nome}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        R$ {plan.precoMensal.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {plan.beneficios}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPlan(plan)}
                        >
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(plan)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(plan.id)}
                          disabled={deletingId === plan.id}
                        >
                          {deletingId === plan.id ? (
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

      <PlanForm
        plan={editingPlan}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={handleSuccess}
      />

      {selectedPlan && (
        <PlanDetails
          plan={selectedPlan}
          open={!!selectedPlan}
          onOpenChange={(open) => !open && setSelectedPlan(null)}
        />
      )}
    </>
  );
}

