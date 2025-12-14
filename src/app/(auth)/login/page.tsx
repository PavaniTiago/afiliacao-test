import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/server';
import { LoginForm } from '@/components/auth/LoginForm';

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

