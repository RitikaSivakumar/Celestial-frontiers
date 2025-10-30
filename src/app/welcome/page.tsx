
'use client';

import { useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background to-muted text-center">
      <div className="animate-pulse-slow mb-8">
        <Logo className="w-24 h-24 text-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">
        Welcome to Medfinity
      </h1>
      <p className="text-lg text-muted-foreground mb-2">
        Your Companion for Emotional Wellbeing
      </p>
      <p className="text-md text-muted-foreground max-w-md mx-auto mb-12">
        Let’s begin your journey toward balance and happiness.
      </p>
      <Button size="lg" onClick={() => router.push('/signin')}>
        Get Started
      </Button>
    </div>
  );
}
