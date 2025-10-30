'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Wind, Play, Pause } from 'lucide-react';

type Phase = 'Initial' | 'Inhale' | 'Hold' | 'Exhale' | 'Finished';

const phaseDurations: Record<Exclude<Phase, 'Initial' | 'Finished'>, number> = {
  Inhale: 4,
  Hold: 2,
  Exhale: 6,
};

const totalRounds = 5;

export default function BreathingPage() {
  const [phase, setPhase] = useState<Phase>('Initial');
  const [round, setRound] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && round < totalRounds) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev > 1) {
            return prev - 1;
          }

          // Move to next phase
          if (phase === 'Initial' || phase === 'Exhale') {
            setPhase('Inhale');
            setRound(prevRound => prevRound + 1);
            return phaseDurations.Inhale;
          } else if (phase === 'Inhale') {
            setPhase('Hold');
            return phaseDurations.Hold;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return phaseDurations.Exhale;
          }
          return 0;
        });
      }, 1000);
    } else if (round >= totalRounds && isActive) {
      setPhase('Finished');
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, round]);

  const handleStart = () => {
    setIsActive(true);
    setRound(0);
    setPhase('Initial');
    setCountdown(0);
  };
  
  const handlePause = () => {
    setIsActive(false);
  }

  const handleReset = () => {
    setIsActive(false);
    setRound(0);
    setPhase('Initial');
    setCountdown(0);
  }

  const getPhaseInfo = () => {
    switch (phase) {
      case 'Inhale':
        return { text: 'Inhale...', color: 'bg-blue-300' };
      case 'Hold':
        return { text: 'Hold', color: 'bg-yellow-300' };
      case 'Exhale':
        return { text: 'Exhale...', color: 'bg-green-300' };
      case 'Finished':
         return { text: 'Well done!', color: 'bg-primary' };
      default:
        return { text: 'Ready?', color: 'bg-muted' };
    }
  };
  
  const {text: phaseText, color: phaseColor} = getPhaseInfo();

  return (
    <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
            <Wind /> Calming Breath
          </CardTitle>
        </CardHeader>
        <CardContent>
          {phase === 'Initial' ? (
             <div className="space-y-4 my-8">
                 <p className="text-muted-foreground">
                    Let’s begin a calming breathing exercise. Inhale slowly for 4 seconds, hold the breath for 2 seconds, then exhale gently for 6 seconds. We’ll repeat this cycle for 5 rounds.
                 </p>
                 <p className="text-muted-foreground">
                    When you’re ready, press ‘Start’ and follow the rhythm. Focus on letting each breath flow smoothly, and allow any tension to melt away with each exhale.
                 </p>
             </div>
          ) : (
            <div className="my-8">
              <div className="relative w-48 h-48 mx-auto">
                <div 
                    className={cn(
                        "absolute inset-0 rounded-full transition-all duration-1000 ease-linear",
                        phaseColor
                    )}
                    style={{ 
                        transform: `scale(${phase === 'Inhale' || phase === 'Finished' ? '1' : '0.5'})`
                    }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <p className="text-2xl font-semibold">{phaseText}</p>
                  {isActive && phase !== 'Finished' && <p className="text-5xl font-bold">{countdown}</p>}
                   {phase === 'Finished' && <p className="mt-2 text-sm">You've completed {totalRounds} rounds.</p>}
                </div>
              </div>
               {phase !== 'Finished' && <p className="mt-6 text-muted-foreground">Round {round} of {totalRounds}</p>}
            </div>
          )}

          <div className="flex justify-center gap-4">
            {phase === 'Initial' && (
              <Button onClick={handleStart} size="lg">
                <Play className="mr-2"/> Start
              </Button>
            )}
            
            {isActive && phase !== 'Finished' && (
                <Button onClick={handlePause} size="lg" variant="outline">
                    <Pause className="mr-2"/> Pause
                </Button>
            )}
            
            {(!isActive && phase !== 'Initial' && phase !== 'Finished') && (
                 <Button onClick={() => setIsActive(true)} size="lg">
                    <Play className="mr-2"/> Resume
                </Button>
            )}

            {(phase === 'Finished' || (!isActive && phase !== 'Initial')) && (
                 <Button onClick={handleReset} size="lg" variant="secondary">
                    Start Over
                </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
