'use client';

import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/shared/SidebarNav';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/shared/Chatbot';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FirebaseClientProvider, useUser } from '@/firebase';

function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // This check runs only on the client, after hydration.
    if (!isUserLoading && user) {
      setShowSidebar(true);
    } else if (!isUserLoading && !user) {
      setShowSidebar(false);
    }
  }, [user, isUserLoading, pathname]);

  if (isUserLoading && !showSidebar) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-headline">Loading...</h1>
        </div>
      )
  }

  return (
    <>
      {showSidebar ? (
        <SidebarProvider>
          <Chatbot>
            <Sidebar>
              <SidebarNav />
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
          </Chatbot>
        </SidebarProvider>
      ) : (
        children
      )}
      <Toaster />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Medfinity</title>
        <meta name="description" content="Your companion for mental wellness." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AppLayout>{children}</AppLayout>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
