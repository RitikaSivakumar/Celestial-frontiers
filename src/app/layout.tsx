
'use client';

import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/shared/SidebarNav';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/shared/Chatbot';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // This check runs only on the client, after hydration.
    if (localStorage.getItem('user_session')) {
      setShowSidebar(true);
    }
  }, [pathname]); // Re-check when the user navigates

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
      </body>
    </html>
  );
}
