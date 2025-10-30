'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, Stethoscope } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { useUser } from '@/firebase';

export default function WelcomeAuthPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // If user is already logged in, redirect to roles page
    if (!isUserLoading && user) {
      router.replace('/roles');
    }
  }, [user, isUserLoading, router]);


  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">{t('welcome_title')}</CardTitle>
          <CardDescription>{t('welcome_description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button className="w-full" size="lg" onClick={() => router.push('/auth/register')}>
                <UserPlus className="mr-2"/>
                {t('new_user_button')}
            </Button>
            <Button className="w-full" size="lg" variant="outline" onClick={() => router.push('/auth/login')}>
                <LogIn className="mr-2"/>
                {t('existing_user_button')}
            </Button>
            <Button className="w-full" size="lg" variant="secondary" onClick={() => router.push('/doctors/login')}>
                <Stethoscope className="mr-2"/>
                {t('doctor_button')}
            </Button>
        </CardContent>
        <CardFooter className="flex-col gap-4">
            <p className="text-xs text-muted-foreground pt-2">
                Select your role to continue.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
