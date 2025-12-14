import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/server';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <DashboardContent />;
}

