
'use client';

import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/shared/SidebarNav';
import { Toaster } from '@/components/ui/toaster';
import { ChatbotProvider, useChatbot, Chatbot } from '@/components/shared/chatbot';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { setOpen: openChatbot } = useChatbot();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // This check runs only on the client, after hydration.
    if (isClient) {
      const isLoggedIn = !!localStorage.getItem('user_loggedin');
      setShowSidebar(isLoggedIn);
    }
  }, [isClient, pathname]);

  useEffect(() => {
    if (isClient) {
        const role = localStorage.getItem('user_role');
        const onboardingKey = role ? `${role}_onboarding_complete` : null;
        if (onboardingKey && localStorage.getItem(onboardingKey)) {
            const pathShouldOpenChatbot = pathname.startsWith('/dashboard/');
            if (pathShouldOpenChatbot) {
                 setTimeout(() => openChatbot(true), 500);
            }
        }
    }
  }, [isClient, openChatbot, pathname]);


  if (!isClient) {
    // Render a loading state on the server to avoid hydration mismatches
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-headline">Loading...</h1>
      </div>
    );
  }

  if (!showSidebar) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <Chatbot>
      <SidebarProvider>
          <Sidebar>
              <SidebarNav />
          </Sidebar>
          <SidebarInset>
              {children}
          </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </Chatbot>
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
         <ChatbotProvider>
            <AppLayout>{children}</AppLayout>
         </ChatbotProvider>
      </body>
    </html>
  );
}
