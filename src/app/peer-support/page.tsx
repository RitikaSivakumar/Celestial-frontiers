
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialMessages = [
  {
    name: 'Ritika',
    message: 'Hey everyone, just wanted to share that I’ve been feeling a bit overwhelmed with work lately. It’s been tough to switch off.',
    avatar: '/r-avatar.png',
    fallback: 'R'
  },
  {
    name: 'Prasheetha',
    message: 'I hear you, Ritika. I’ve been there. Have you tried setting aside a specific time to disconnect? Like no screens after 9 PM?',
    avatar: '/p-avatar.png',
    fallback: 'P'
  },
  {
    name: 'Ritika',
    message: 'That’s a great idea, Prasheetha. I haven’t been disciplined about it, but I’ll give it a try tonight. Thanks for the suggestion!',
    avatar: '/r-avatar.png',
    fallback: 'R'
  },
   {
    name: 'Prasheetha',
    message: 'You’ve got this! One day at a time. We’re all here for you. 💛',
    avatar: '/p-avatar.png',
    fallback: 'P'
  },
];

export default function PeerSupportPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send to a backend.
      // Here, we just add it to our local state for a mock effect.
      setMessages([...messages, { 
          name: 'You', 
          message: newMessage,
          avatar: '',
          fallback: 'Y'
        }]);
      setNewMessage('');
    }
  }

  return (
    <div className="p-4 md:p-8 flex flex-col h-full">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-headline">Community Forum</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Connect with a community that understands. This is a safe space for mutual support.
            </p>
        </header>

        <Card className="w-full max-w-3xl mx-auto flex flex-col flex-1">
            <CardHeader>
                <CardTitle className="font-headline">#General-Support</CardTitle>
                <CardDescription>A space to share and listen.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={msg.avatar} />
                                    <AvatarFallback>{msg.fallback}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{msg.name}</p>
                                    <div className="p-3 bg-muted rounded-lg mt-1">
                                        <p className="text-sm">{msg.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                 <div className="flex w-full items-center space-x-2">
                    <Input 
                        type="text" 
                        placeholder="Type your message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                        <Send className="mr-2 h-4 w-4" /> Send
                    </Button>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}
