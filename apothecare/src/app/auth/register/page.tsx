import { Metadata } from 'next';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthForm from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Register | ApotheCare',
  description: 'Create a new ApotheCare account',
};

export default function RegisterPage() {
  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join ApotheCare for exclusive benefits"
    >
      <AuthForm type="register" />
    </AuthLayout>
  );
} 