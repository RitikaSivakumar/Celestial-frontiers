
'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Music, RefreshCcw, VolumeX } from 'lucide-react';

export default function ZenGardenPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const lastPos = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Draw initial sand
    ctx.fillStyle = '#f0e6d6'; // Light sand color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSandTexture(ctx, canvas.width, canvas.height);
    
  }, []);

  const drawSandTexture = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.fillStyle = 'rgba(0,0,0,0.03)';
      for(let i=0; i<50000; i++){
          const x = Math.random() * width;
          const y = Math.random() * height;
          ctx.fillRect(x, y, 1, 1);
      }
  }

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e.nativeEvent) {
      if (e.nativeEvent.touches.length === 0) return null;
      return {
        x: e.nativeEvent.touches[0].clientX - rect.left,
        y: e.nativeEvent.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.nativeEvent.clientX - rect.left,
      y: e.nativeEvent.clientY - rect.top,
    };
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPosition(e);
    if (!pos) return;
    setIsDrawing(true);
    lastPos.current = pos;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const pos = getPosition(e);
    if (!pos) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !lastPos.current) return;

    ctx.strokeStyle = '#d2c4a8'; // Darker sand color for grooves
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };
  
   const handleReset = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        
        let progress = 0;
        const animate = () => {
            if (progress >= 1) {
                ctx.fillStyle = '#f0e6d6';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                drawSandTexture(ctx, canvas.width, canvas.height);
                return;
            }
            ctx.fillStyle = 'rgba(240, 230, 214, 0.2)'; // semi-transparent sand
            ctx.fillRect(0, 0, canvas.width * progress, canvas.height);
            progress += 0.02;
            requestAnimationFrame(animate);
        }
        animate();
    };

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.3;
        if (isMusicOn) {
            audioRef.current.play().catch(e => console.error("Music play failed", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isMusicOn]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#d2c4a8]">
       <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/08/03/audio_517905837b.mp3" loop />

      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      
      <div className="absolute top-4 right-4 z-10 flex gap-2">
         <Button onClick={handleReset} variant="ghost" size="icon">
            <RefreshCcw />
            <span className="sr-only">Reset Garden</span>
        </Button>
        <Button onClick={() => setIsMusicOn(prev => !prev)} variant="ghost" size="icon">
            {isMusicOn ? <Music /> : <VolumeX />}
            <span className="sr-only">Toggle Music</span>
        </Button>
      </div>
      
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-foreground/70 pointer-events-none">
            <h1 className="text-2xl font-headline">Zen Garden</h1>
            <p>Draw in the sand and find your calm.</p>
       </div>
    </div>
  );
}
