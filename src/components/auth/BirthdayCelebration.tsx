
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BirthdayCelebrationProps = {
  name: string;
  onCelebrationEnd: () => void;
};

type CelebrationStep = 'selectFlavor' | 'showCake' | 'cakeCut';

const cakeFlavors = [
    { name: 'Chocolate', color: 'bg-[#5D4037]' },
    { name: 'Vanilla', color: 'bg-[#F3E5AB]' },
    { name: 'Strawberry', color: 'bg-[#F48FB1]' },
    { name: 'Blueberry', color: 'bg-[#90CAF9]' },
];

export default function BirthdayCelebration({ name, onCelebrationEnd }: BirthdayCelebrationProps) {
  const [step, setStep] = useState<CelebrationStep>('selectFlavor');
  const [selectedFlavor, setSelectedFlavor] = useState(cakeFlavors[0]);
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (step === 'cakeCut') {
        const timer = setTimeout(() => {
            onCelebrationEnd();
        }, 4000);
        return () => clearTimeout(timer);
    }
  }, [step, onCelebrationEnd]);

  useEffect(() => {
    if (step === 'showCake' && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            ctx.fillStyle = '#bdc3c7';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'destination-out';
        }
    }
  }, [step]);


  const handleFlavorSelect = (flavor: typeof cakeFlavors[0]) => {
    setSelectedFlavor(flavor);
    setStep('showCake');
  };
  
  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientX - rect.left : e.nativeEvent.clientX - rect.left;
    const y = 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientY - rect.top : e.nativeEvent.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, true);
    ctx.fill();
    
    // Check if enough has been revealed
     if (!isRevealed) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const transparentPixels = Array.from(imageData.data).filter((_, i) => (i + 1) % 4 === 0).filter(alpha => alpha === 0);
      const revealedPercentage = transparentPixels.length / (canvas.width * canvas.height);
      
      if (revealedPercentage > 0.5) {
        setIsRevealed(true);
        setTimeout(() => setStep('cakeCut'), 1000);
      }
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'selectFlavor':
        return (
           <div className="space-y-6">
             <div className="text-6xl animate-bounce [animation-delay:-0.2s]">🎂</div>
              <p className="text-muted-foreground">It's your special day! First, choose your favorite cake flavor.</p>
              <div className="grid grid-cols-2 gap-4">
                  {cakeFlavors.map(flavor => (
                    <Button key={flavor.name} onClick={() => handleFlavorSelect(flavor)} variant="outline">
                        {flavor.name}
                    </Button>
                  ))}
              </div>
           </div>
        );
      case 'showCake':
        return (
          <div className="space-y-4">
             <p className="text-muted-foreground">Make a wish! Scratch or swipe to cut your {selectedFlavor.name.toLowerCase()} cake.</p>
             <div className="relative w-64 h-48 mx-auto">
                <div className={cn("absolute inset-0 flex items-center justify-center text-6xl rounded-lg", selectedFlavor.color)}>
                    🍰
                </div>
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full cursor-grab"
                    onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                    onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
                    onMouseMove={e => e.buttons === 1 && handleScratch(e)}
                    onTouchMove={handleScratch}
                />
             </div>
          </div>
        );
        case 'cakeCut':
            return (
                <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-5">
                    <div className="text-6xl">🎉</div>
                    <p className="text-lg font-semibold">May your day be filled with light, love, and laughter!</p>
                    <p className="text-muted-foreground">Redirecting you to your personalized dashboard...</p>
                </div>
            );
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md text-center animate-in fade-in-0 zoom-in-95">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Happy Birthday, {name}!</CardTitle>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}

    