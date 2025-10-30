
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, Stethoscope } from 'lucide-react';
import { useEffect } from 'react';
import LanguageSelector from '@/components/shared/LanguageSelector';

export default function WelcomeAuthPage() {
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to roles page
    if (localStorage.getItem('user_session')) {
      router.replace('/roles');
    }
  }, [router]);


  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Welcome to Medfinity</CardTitle>
          <CardDescription>Please select your role to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button className="w-full" size="lg" onClick={() => router.push('/auth/register')}>
                <UserPlus className="mr-2"/>
                New User
            </Button>
            <Button className="w-full" size="lg" variant="outline" onClick={() => router.push('/auth/login')}>
                <LogIn className="mr-2"/>
                Existing User
            </Button>
            <Button className="w-full" size="lg" variant="secondary" onClick={() => router.push('/doctors/login')}>
                <Stethoscope className="mr-2"/>
                Doctor
            </Button>
        </CardContent>
        <CardFooter className="flex-col gap-4">
            <LanguageSelector />
            <p className="text-xs text-muted-foreground pt-2">
                Select your preferred language to personalize your experience.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
