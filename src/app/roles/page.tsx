
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonStanding, School, Briefcase, Bot } from 'lucide-react';
import Link from 'next/link';

const roles = [
  { name: 'Student', icon: <School className="w-12 h-12" />, href: '/dashboard/student' },
  { name: 'Employee', icon: <Briefcase className="w-12 h-12" />, href: '/dashboard/employee' },
  { name: 'Senior Citizen', icon: <PersonStanding className="w-12 h-12" />, href: '/dashboard/senior' },
  { name: 'General', icon: <Bot className="w-12 h-12" />, href: '/dashboard/general' },
];

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline mb-4">Welcome to Medfinity</h1>
        <p className="text-2xl text-muted-foreground">Please select a role for a personalized experience.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {roles.map(role => (
          <Link href={role.href} key={role.name} passHref>
            <Card className="w-64 h-64 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-primary transition-all duration-200 cursor-pointer">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full text-primary">
                  {role.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-2xl">{role.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
