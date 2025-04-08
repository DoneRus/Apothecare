import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | ApotheCare',
  description: 'Your trusted online pharmacy for all healthcare needs',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 