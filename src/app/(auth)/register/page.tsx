import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/server';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}

