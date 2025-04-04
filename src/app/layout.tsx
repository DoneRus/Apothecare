import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '../providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ApotheCare - Online Pharmacy',
  description: 'Your trusted online pharmacy for all your healthcare needs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        
        {/* ApotheCare Chatbot Integration */}
        <div id="deployment-ef250951-ff15-4297-9818-ccd956d1d2dc"></div>
        <script src="https://studio.pickaxe.co/api/embed/bundle.js" defer></script>
      </body>
    </html>
  );
}
