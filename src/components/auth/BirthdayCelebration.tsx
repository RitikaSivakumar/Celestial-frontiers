'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type BirthdayCelebrationProps = {
  name: string;
  onCelebrationEnd: () => void;
};

export default function BirthdayCelebration({ name, onCelebrationEnd }: BirthdayCelebrationProps) {
  const [cakeCut, setCakeCut] = useState(false);

  useEffect(() => {
    if(cakeCut){
        const timer = setTimeout(() => {
            onCelebrationEnd();
        }, 4000);
        return () => clearTimeout(timer);
    }
  }, [cakeCut, onCelebrationEnd]);

  const handleCutCake = () => {
    setCakeCut(true);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md text-center animate-in fade-in-0 zoom-in-95">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">🎉 Happy Birthday, {name}! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!cakeCut ? (
            <>
              <div className="text-6xl animate-bounce [animation-delay:-0.2s]">🎂</div>
              <p className="text-muted-foreground">Make a wish and cut the cake!</p>
              <Button onClick={handleCutCake} size="lg">
                Cut the Cake
              </Button>
            </>
          ) : (
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-5">
              <div className="text-6xl">🍰</div>
              <p className="text-lg font-semibold">May your day be filled with light, love, and laughter!</p>
              <p className="text-muted-foreground">Redirecting you to your dashboard...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
