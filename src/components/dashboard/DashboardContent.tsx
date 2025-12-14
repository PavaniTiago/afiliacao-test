'use client';

import { useState } from 'react';
import { useSession } from '@/lib/auth/client';
import { performLogout } from '@/lib/auth/logout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlanList } from '@/components/plans/PlanList';
import { MemberList } from '@/components/members/MemberList';
import { AffiliateList } from '@/components/affiliates/AffiliateList';
import { AffiliateRanking } from '@/components/affiliates/AffiliateRanking';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

export function DashboardContent() {
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.success('Saindo...');
    await performLogout();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Sistema de Afiliação</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{session?.user?.name || session?.user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="plans" className="space-y-4">
          <TabsList>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="members">Membros</TabsTrigger>
            <TabsTrigger value="affiliates">Afiliados</TabsTrigger>
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
          </TabsList>
          <TabsContent value="plans">
            <PlanList />
          </TabsContent>
          <TabsContent value="members">
            <MemberList />
          </TabsContent>
          <TabsContent value="affiliates">
            <AffiliateList />
          </TabsContent>
          <TabsContent value="ranking">
            <AffiliateRanking />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

