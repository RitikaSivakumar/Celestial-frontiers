
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Bubble from '@/components/games/bubble-pop/Bubble';
import './styles.css';
import { Button } from '@/components/ui/button';
import { Music, VolumeX } from 'lucide-react';

type BubbleData = {
  id: number;
  x: number;
  size: number;
  duration: number;
  word: string;
};

const positiveWords = [
  'Calm', 'Peace', 'Joy', 'Hope', 'Breathe', 'Relax', 'Love', 'Happy', 'Shine'
];

export default function BubblePopPage() {
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [score, setScore] = useState(0);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const counterRef = useRef(0);
  const popSoundRef = useRef<HTMLAudioElement>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      counterRef.current += 1;
      const newBubble: BubbleData = {
        id: counterRef.current,
        x: Math.random() * 90,
        size: Math.random() * 80 + 40,
        duration: Math.random() * 8 + 5,
        word: positiveWords[Math.floor(Math.random() * positiveWords.length)],
      };
      setBubbles(prev => [...prev, newBubble]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.volume = 0.3;
        if (isMusicOn) {
            backgroundMusicRef.current.play().catch(e => console.error("Music play failed", e));
        } else {
            backgroundMusicRef.current.pause();
        }
      }
  }, [isMusicOn]);

  const handlePop = useCallback((id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setScore(prev => prev + 1);
    if(popSoundRef.current){
        popSoundRef.current.currentTime = 0;
        popSoundRef.current.volume = 0.5;
        popSoundRef.current.play().catch(e => console.error("Pop sound failed", e));
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-blue-100 dark:bg-blue-900/50">
       <audio ref={backgroundMusicRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop />
       <audio ref={popSoundRef} src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_9c32e9d03c.mp3" />

      <div className="absolute top-4 left-4 z-10 text-foreground font-bold text-xl p-2 bg-background/50 rounded-lg">
        Score: {score}
      </div>
       <Button onClick={() => setIsMusicOn(prev => !prev)} variant="ghost" size="icon" className="absolute top-4 right-4 z-10">
        {isMusicOn ? <Music /> : <VolumeX />}
        <span className="sr-only">Toggle Music</span>
      </Button>

      {bubbles.map(bubble => (
        <Bubble key={bubble.id} {...bubble} onPop={handlePop} />
      ))}
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-foreground/70">
            <h1 className="text-2xl font-headline">Bubble Pop</h1>
            <p>Tap the bubbles and feel the calm.</p>
       </div>
    </div>
  );
}
