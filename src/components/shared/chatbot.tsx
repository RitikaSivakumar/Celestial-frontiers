'use client';

import { useState, useRef, useEffect, createContext, useContext } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User } from 'lucide-react';
import { analyzeSentimentAndSuggestActivity } from '@/ai/flows/ai-chatbot-mood-analysis';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type FormValues = z.infer<typeof formSchema>;

type Message = {
  id: number;
  text: React.ReactNode;
  sender: 'user' | 'bot';
};

type ChatbotContextType = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <ChatbotContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a Chatbot provider');
  }
  return context;
}

export function Chatbot({ children }: { children: React.ReactNode }) {
  const {isOpen, setOpen} = useChatbot();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm EmpathiCare, your AI companion. How are you feeling today?",
      sender: 'bot',
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const userInput = data.message;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userInput, sender: 'user' },
    ]);
    setIsBotTyping(true);
    reset();

    try {
      const result = await analyzeSentimentAndSuggestActivity({ userInput });
      let botResponse: React.ReactNode;

      if (result && result.response) {
        botResponse = (
          <div>
            <p>{result.response}</p>
          </div>
        );
      } else {
        botResponse = "I'm not sure how to respond to that. Could you tell me more?";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botResponse, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('AI analysis failed:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Sorry, I had trouble understanding. Please try again.',
          sender: 'bot',
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      {children}
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="font-headline flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            EmpathiCare
          </SheetTitle>
          <SheetDescription>
            Talk about your feelings. I am here to listen and help.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isBotTyping && (
               <div className="flex items-end gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[80%] rounded-lg p-3 text-sm bg-muted">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-foreground rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-6 bg-background border-t">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
            <Input
              {...register('message')}
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              disabled={isSubmitting}
            />
            <Button type="submit" size="icon" disabled={isSubmitting}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ChatbotTrigger({ children }: { children: React.ReactNode }) {
  return <SheetTrigger asChild>{children}</SheetTrigger>;
}
