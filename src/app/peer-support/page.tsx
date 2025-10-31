
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Lock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

type ChatMessage = {
  id: string;
  name: string;
  message: string;
  timestamp: Timestamp;
  userId: string;
};

export default function PeerSupportPage() {
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const firestore = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_email');
    setUserEmail(email);
    setUserName(name);

    if (email) {
      const privacy = localStorage.getItem(`user_privacy_${email}`);
      setIsPublic(privacy === 'public');
    }
    
    setIsLoading(false);
  }, []);

  const messagesQuery = useMemoFirebase(() => {
    if (!firestore || !isPublic) return null;
    return query(collection(firestore, 'peer_support_chat'), orderBy('timestamp', 'asc'));
  }, [firestore, isPublic]);

  const { data: messages, isLoading: messagesLoading } = useCollection<ChatMessage>(messagesQuery);

  const handleSendMessage = () => {
    if (newMessage.trim() && firestore && userName && userEmail && isPublic) {
      const chatCollection = collection(firestore, 'peer_support_chat');
      addDocumentNonBlocking(chatCollection, {
        name: userName,
        message: newMessage,
        timestamp: serverTimestamp(),
        userId: userEmail,
      });
      setNewMessage('');
    } else if (!isPublic) {
      toast({
        title: 'Private Profile',
        description: 'You cannot send messages with a private profile.',
        variant: 'destructive',
      });
    }
  };
  
  if (isLoading) {
      return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>
  }

  if (!isPublic) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
             <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center justify-center gap-2"><Lock /> Private Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Peer support is only available for users with a public profile. You can change your privacy settings in your dashboard to participate.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
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
                        {messagesLoading && <p>Loading messages...</p>}
                        {messages && messages.map((msg) => (
                            <div key={msg.id} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarFallback>{msg.name ? msg.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
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
                        disabled={!isPublic}
                    />
                    <Button onClick={handleSendMessage} disabled={!isPublic}>
                        <Send className="mr-2 h-4 w-4" /> Send
                    </Button>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}
