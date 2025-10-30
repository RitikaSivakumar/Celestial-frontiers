
'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type BubbleProps = {
  id: number;
  x: number;
  size: number;
  duration: number;
  word: string;
  onPop: (id: number) => void;
};

export default function Bubble({ id, x, size, duration, word, onPop }: BubbleProps) {
  const [isPopped, setIsPopped] = useState(false);

  const handleBubbleClick = () => {
    if (!isPopped) {
      setIsPopped(true);
      setTimeout(() => {
        onPop(id);
      }, 300); // Corresponds to pop animation duration
    }
  };

  return (
    <div
      className={cn('bubble absolute bottom-[-100px]', isPopped && 'pop')}
      style={{
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationName: 'float-up',
        animationDuration: `${duration}s`,
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',
      }}
      onClick={handleBubbleClick}
    >
      <span className="bubble-word text-sm md:text-base">{word}</span>
    </div>
  );
}
