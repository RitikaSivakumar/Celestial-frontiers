import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/shared/SidebarNav';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/shared/Chatbot';

export const metadata: Metadata = {
  title: 'Mindful Path',
  description: 'Your companion for mental wellness.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
            <Chatbot>
              <Sidebar>
                <SidebarNav />
              </Sidebar>
              <SidebarInset>{children}</SidebarInset>
            </Chatbot>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
