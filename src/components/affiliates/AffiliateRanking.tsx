'use client';

import { useAffiliateRanking } from '@/lib/hooks/useAffiliates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Trophy } from 'lucide-react';

export function AffiliateRanking() {
  const { ranking, isLoading, error } = useAffiliateRanking();

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">Erro ao carregar ranking</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <CardTitle>Ranking de Afiliados</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : ranking.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum afiliado no ranking
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posição</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Código</TableHead>
                <TableHead className="text-right">Indicações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranking.map((item, index) => (
                <TableRow key={item.affiliate.id}>
                  <TableCell>
                    <Badge variant={index === 0 ? 'default' : 'secondary'}>
                      #{index + 1}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.affiliate.nome}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.affiliate.codigo}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {item.indicationCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

