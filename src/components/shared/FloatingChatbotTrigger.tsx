
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Bot } from 'lucide-react';
import { ChatbotTrigger, useChatbot } from './chatbot';
import { generateJoke } from '@/ai/flows/joke-flow';
import { cn } from '@/lib/utils';

export default function FloatingChatbotTrigger() {
  const [joke, setJoke] = useState('How are you feeling today?');
  const [showJoke, setShowJoke] = useState(false);
  const { isOpen } = useChatbot();

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const result = await generateJoke();
        setJoke(result.joke);
      } catch (error) {
        console.error('Failed to fetch joke:', error);
        // Fallback joke
        setJoke('Why don’t scientists trust atoms? Because they make up everything!');
      }
    };

    fetchJoke(); // Fetch a single joke when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out',
        isOpen ? 'transform scale-0' : 'transform scale-100'
      )}
      onMouseEnter={() => setShowJoke(true)}
      onMouseLeave={() => setShowJoke(false)}
    >
      <Tooltip open={showJoke}>
        <TooltipTrigger asChild>
          <ChatbotTrigger>
            <Button size="icon" className="w-14 h-14 rounded-full shadow-lg">
              <Bot className="w-7 h-7" />
            </Button>
          </ChatbotTrigger>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs text-center">
          <p>{joke}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
