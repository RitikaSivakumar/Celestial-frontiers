
'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
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
  Wind,
  Gamepad2,
  LogOut,
  Users,
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
  { href: '/breathing', label: 'Breathing', icon: Wind },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/peer-support', label: 'Peer Support', icon: Users },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard = pathname.startsWith('/dashboard');

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    router.push('/signin');
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Logo className="w-8 h-8 text-sidebar-primary" />
          <span className="text-lg font-headline font-semibold">Medfinity</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/roles">
                    <SidebarMenuButton
                    isActive={pathname === '/roles'}
                    tooltip="Home"
                    >
                    <Home />
                    <span>Home</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/general">
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
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
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
        <SidebarSeparator />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
