
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Bot } from 'lucide-react';
import { ChatbotTrigger, useChatbot } from './chatbot';
import { cn } from '@/lib/utils';

export default function FloatingChatbotTrigger() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { isOpen } = useChatbot();

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out',
        isOpen ? 'transform scale-0' : 'transform scale-100'
      )}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Tooltip open={showTooltip}>
        <TooltipTrigger asChild>
          <ChatbotTrigger>
            <Button size="icon" className="w-14 h-14 rounded-full shadow-lg">
              <Bot className="w-7 h-7" />
            </Button>
          </ChatbotTrigger>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs text-center">
          <p>Chat with EmpathiCare</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
