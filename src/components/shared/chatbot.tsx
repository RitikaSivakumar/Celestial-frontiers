
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
import { Send, Bot, User, Mic, Video, Loader2 } from 'lucide-react';
import { analyzeSentimentAndSuggestActivity } from '@/ai/flows/ai-chatbot-mood-analysis';
import { analyzeAudio } from '@/ai/flows/analyze-audio-flow';
import { analyzeVideo } from '@/ai/flows/analyze-video-flow';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

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
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm EmpathiCare, your AI companion. How are you feeling today? You can talk to me, send a video, or type a message.",
      sender: 'bot',
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingMedia, setIsProcessingMedia] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const addMessage = (text: React.ReactNode, sender: 'user' | 'bot') => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender }]);
  };

  const handleTextSubmit: SubmitHandler<FormValues> = async (data) => {
    const userInput = data.message;
    addMessage(userInput, 'user');
    setIsBotTyping(true);
    reset();

    try {
      const result = await analyzeSentimentAndSuggestActivity({ userInput });
      addMessage(result.response, 'bot');
    } catch (error) {
      console.error('AI analysis failed:', error);
      addMessage('Sorry, I had trouble understanding. Please try again.', 'bot');
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleAudioSubmit = async (audioBlob: Blob) => {
    setIsProcessingMedia(true);
    addMessage('Processing your voice note...', 'user');

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const audioDataUri = reader.result as string;
      try {
        const result = await analyzeAudio({ audioDataUri });
        const botResponse = (
          <div>
            <p>I heard: "{result.transcription}"</p>
            <p className="mt-2 font-semibold">It sounds like you're feeling {result.mood}.</p>
          </div>
        );
        addMessage(botResponse, 'bot');
      } catch (error) {
        console.error('Audio analysis failed:', error);
        addMessage('I had trouble analyzing your voice note. Could you try again?', 'bot');
      } finally {
        setIsProcessingMedia(false);
      }
    };
  };
  
   const handleVideoSubmit = async (videoBlob: Blob) => {
    setIsProcessingMedia(true);
    addMessage('Analyzing your video note...', 'user');

    const reader = new FileReader();
    reader.readAsDataURL(videoBlob);
    reader.onloadend = async () => {
      const videoDataUri = reader.result as string;
      try {
        const result = await analyzeVideo({ videoDataUri });
        const botResponse = (
          <div>
            <p>From your video, I understood: "{result.transcription}"</p>
            <p className="mt-2 font-semibold">My observation: {result.observation}</p>
            <p className="mt-1">You seem to be feeling <span className="font-bold">{result.mood}</span>.</p>
          </div>
        );
        addMessage(botResponse, 'bot');
      } catch (error) {
        console.error('Video analysis failed:', error);
        addMessage('I had trouble analyzing your video. Please try again.', 'bot');
      } finally {
        setIsProcessingMedia(false);
      }
    };
  };

  const startRecording = async (type: 'audio' | 'video') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' });
      
      if (type === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.hidden = false;
      }
      
      const options = type === 'video' ? { mimeType: 'video/webm; codecs=vp9' } : { mimeType: 'audio/webm' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          toast({
            title: 'Unsupported media format',
            description: `Your browser does not support the ${options.mimeType} format.`,
            variant: 'destructive',
          });
          return;
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options);
      const chunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: options.mimeType });
        if (type === 'audio') {
          handleAudioSubmit(blob);
        } else {
          handleVideoSubmit(blob);
        }
        stream.getTracks().forEach(track => track.stop());
        if(videoRef.current) videoRef.current.hidden = true;
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast({
        title: 'Permission Denied',
        description: `Please enable ${type} permissions in your browser.`,
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const isBusy = isSubmitting || isBotTyping || isRecording || isProcessingMedia;

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
        
        <video ref={videoRef} hidden autoPlay muted className="w-full aspect-video bg-black" />
        
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
             {isProcessingMedia && (
                <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <Loader2 className="animate-spin" />
                    <span>Analyzing...</span>
                </div>
             )}
          </div>
        </ScrollArea>
        <div className="p-6 bg-background border-t">
          {isRecording && (
            <Button onClick={stopRecording} className="w-full mb-2" variant="destructive">
              Stop Recording
            </Button>
          )}
          <form onSubmit={handleSubmit(handleTextSubmit)} className="flex items-center gap-2">
            <Input
              {...register('message')}
              placeholder="Type or use mic/video..."
              className="flex-1"
              autoComplete="off"
              disabled={isBusy}
            />
            <Button type="button" size="icon" variant="ghost" onClick={() => startRecording('audio')} disabled={isBusy}><Mic /></Button>
            <Button type="button" size="icon" variant="ghost" onClick={() => startRecording('video')} disabled={isBusy}><Video /></Button>
            <Button type="submit" size="icon" disabled={isBusy}>
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
