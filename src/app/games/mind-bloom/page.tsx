
'use client';

import { useState, useEffect, useRef } from 'react';
import Flower from '@/components/games/mind-bloom/Flower';
import { Button } from '@/components/ui/button';
import { Music, VolumeX, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const maxGrowth = 5;

export default function MindBloomPage() {
  const [growth, setGrowth] = useState(0);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  
  const popSoundRef = useRef<HTMLAudioElement>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.2;
      if (isMusicOn) {
        backgroundMusicRef.current.play().catch(e => console.error("Music play failed", e));
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  }, [isMusicOn]);

  const handleInteraction = () => {
    if (isComplete) return;

    if (popSoundRef.current) {
        popSoundRef.current.currentTime = 0;
        popSoundRef.current.volume = 0.5;
        popSoundRef.current.play().catch(e => console.error("Pop sound failed", e));
    }
    
    setGrowth(prev => {
        const newGrowth = Math.min(prev + 1, maxGrowth);
        if (newGrowth === maxGrowth) {
            setIsComplete(true);
        }
        return newGrowth;
    });
  };

  const handleRestart = () => {
    setGrowth(0);
    setIsComplete(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-sky-100 dark:bg-sky-900/50 flex flex-col items-center justify-center">
      <audio ref={backgroundMusicRef} src="https://cdn.pixabay.com/download/audio/2022/08/03/audio_517905837b.mp3" loop />
      <audio ref={popSoundRef} src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_9c32e9d03c.mp3" />

      <div className="absolute top-4 right-4 z-10 flex gap-2">
         <Button onClick={handleRestart} variant="ghost" size="icon">
            <RefreshCcw />
            <span className="sr-only">Restart</span>
        </Button>
        <Button onClick={() => setIsMusicOn(prev => !prev)} variant="ghost" size="icon">
            {isMusicOn ? <Music /> : <VolumeX />}
            <span className="sr-only">Toggle Music</span>
        </Button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        {!isComplete ? (
             <div onClick={handleInteraction} className="cursor-pointer">
                <Flower growth={growth} />
             </div>
        ) : (
             <div className="animate-in fade-in-0">
                <Flower growth={growth} />
             </div>
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-foreground/70 pointer-events-none p-4">
            <h1 className="text-2xl font-headline">Mind Bloom</h1>
            {isComplete ? (
                <p className="animate-in fade-in-0 delay-500">You’ve created something beautiful. Take this moment of calm with you.</p>
            ) : (
                <p>Tap the sprout to help it grow.</p>
            )}
      </div>
    </div>
  );
}
