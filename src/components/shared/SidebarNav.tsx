
'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BookHeart,
  ClipboardCheck,
  BarChart3,
  Pill,
  Stethoscope,
  Bot,
  Home,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from './Icons';
import { ChatbotTrigger } from './Chatbot';

const menuItems = [
  { href: '/diary', label: 'Diary', icon: BookHeart },
  { href: '/routine', label: 'Routine', icon: ClipboardCheck },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/doctors', label: 'Doctors', icon: Stethoscope },
  { href: '/assessment', label: 'Assessment', icon: FileText },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Logo className="w-8 h-8 text-sidebar-primary" />
          <span className="text-lg font-headline font-semibold">Mindful Path</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <SidebarMenuButton
                    isActive={pathname === '/'}
                    tooltip="Home"
                    >
                    <Home />
                    <span>Home</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/general" legacyBehavior passHref>
                    <SidebarMenuButton
                    isActive={isDashboard}
                    tooltip="Dashboards"
                    >
                    <LayoutDashboard />
                    <span>Dashboards</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <ChatbotTrigger>
          <SidebarMenuButton tooltip="AI Companion">
            <Bot />
            <span>AI Companion</span>
          </SidebarMenuButton>
        </ChatbotTrigger>
      </SidebarFooter>
    </>
  );
}
