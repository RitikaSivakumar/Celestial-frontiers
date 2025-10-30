
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, RefreshCw, X } from 'lucide-react';
import { shuffle } from 'lodash';

const initialPairs = [
  { emotion: 'Calm', color: 'bg-blue-400', id: 'blue' },
  { emotion: 'Happy', color: 'bg-yellow-300', id: 'yellow' },
  { emotion: 'Joy', color: 'bg-pink-400', id: 'pink' },
  { emotion: 'Energy', color: 'bg-orange-400', id: 'orange' },
];

const motivationalQuote = "Every color is a feeling, every feeling a shade of you.";

type Item = {
    type: 'emotion' | 'color';
    value: string;
    id: string;
}

export default function MoodMatchPage() {
  const [emotions, setEmotions] = useState<Item[]>([]);
  const [colors, setColors] = useState<Item[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<Item | null>(null);
  const [selectedColor, setSelectedColor] = useState<Item | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [incorrectPair, setIncorrectPair] = useState<[string, string] | null>(null);
  
  const correctSoundRef = useRef<HTMLAudioElement>(null);

  const setupGame = () => {
    const shuffledPairs = shuffle(initialPairs);
    setEmotions(shuffle(shuffledPairs.map(p => ({ type: 'emotion', value: p.emotion, id: p.id }))));
    setColors(shuffle(shuffledPairs.map(p => ({ type: 'color', value: p.color, id: p.id }))));
    setMatchedPairs([]);
    setSelectedEmotion(null);
    setSelectedColor(null);
  };

  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    if (selectedEmotion && selectedColor) {
      if (selectedEmotion.id === selectedColor.id) {
        // Correct match
        setMatchedPairs(prev => [...prev, selectedEmotion.id]);
        correctSoundRef.current?.play();
      } else {
        // Incorrect match
        setIncorrectPair([selectedEmotion.id, selectedColor.id]);
        setTimeout(() => setIncorrectPair(null), 500);
      }
      setSelectedEmotion(null);
      setSelectedColor(null);
    }
  }, [selectedEmotion, selectedColor]);

  const handleItemClick = (item: Item) => {
    if (matchedPairs.includes(item.id)) return;

    if (item.type === 'emotion') {
      setSelectedEmotion(item);
    } else {
      setSelectedColor(item);
    }
  };

  const isComplete = matchedPairs.length === initialPairs.length;

  const getCardClasses = (item: Item) => {
    const isSelected = selectedEmotion?.id === item.id || selectedColor?.id === item.id;
    const isMatched = matchedPairs.includes(item.id);
    const isIncorrect = incorrectPair?.includes(item.id);

    return cn(
      'cursor-pointer transition-all duration-200',
      isMatched ? 'opacity-50 cursor-default' : 'hover:scale-105 hover:shadow-md',
      isSelected ? 'ring-2 ring-primary scale-105' : '',
      isIncorrect ? 'animate-shake bg-destructive/20' : ''
    );
  };

  if (isComplete) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-muted/30 p-4">
            <Card className="p-8 text-center max-w-lg animate-in fade-in-0 zoom-in-95">
                <div className="text-5xl mb-4">🎉</div>
                <h1 className="text-3xl font-headline mb-4">Well Done!</h1>
                <p className="text-xl text-muted-foreground mb-8">"{motivationalQuote}"</p>
                <Button onClick={setupGame}>
                    <RefreshCw className="mr-2"/>
                    Play Again
                </Button>
            </Card>
        </div>
    )
  }

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <audio ref={correctSoundRef} src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3c3c727a3.mp3" />
      <header className="text-center mb-8">
        <h1 className="text-4xl font-headline">Mood Match</h1>
        <p className="text-muted-foreground mt-2">Match the emotion words with their colors.</p>
      </header>

      <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Emotions</h2>
          {emotions.map(item => (
            <Card key={item.id} className={getCardClasses(item)} onClick={() => handleItemClick(item)}>
              <CardContent className="p-4 flex justify-center items-center h-20">
                <span className="font-semibold text-lg">{item.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Colors</h2>
          {colors.map(item => (
            <Card key={item.id} className={getCardClasses(item)} onClick={() => handleItemClick(item)}>
              <CardContent className={cn("p-4 h-20 rounded-md", item.value)} />
            </Card>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
