import { Metadata } from 'next';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthForm from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Login | ApotheCare',
  description: 'Login to your ApotheCare account',
};

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your ApotheCare account"
    >
      <AuthForm type="login" />
    </AuthLayout>
  );
} 