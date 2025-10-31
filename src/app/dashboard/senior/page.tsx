
'use client';

import { Phone, Heart, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import SymptomChecker from '@/components/dashboard/SymptomChecker';
import { useChatbot } from '@/components/shared/chatbot';
import { useFirestore, useUser, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';


export default function SeniorDashboard() {
  const { setOpen: openChatbot } = useChatbot();
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const handleEmergencyCall = () => {
    if (!firestore || !user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to send an alert.',
        variant: 'destructive',
      });
      return;
    }

    const alertsCollection = collection(firestore, 'emergencyAlerts');
    addDocumentNonBlocking(alertsCollection, {
      userId: user.uid,
      timestamp: serverTimestamp(),
      status: 'new',
    });

    toast({
      title: 'Emergency Alert Sent',
      description: 'All doctors have been notified of your request.',
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">
          Hello there 👋, I’m happy to see you today.
        </h1>
        <p className="text-muted-foreground text-lg">
          Remember to take a moment for yourself. You are not alone.
        </p>
      </header>

      <SymptomChecker />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><BookOpen/> Start Reflection</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Share your thoughts or feelings in your private journal.</p>
                <Link href="/diary" passHref>
                    <Button className="w-full">Open Journal</Button>
                </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Heart/> Talk to Someone</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Connect with family, a caregiver, or a support line.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button asChild variant="outline" className="flex-1">
                      <a href="tel:6282152384">Call Family</a>
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => openChatbot(true)}>
                      Message Caregiver
                    </Button>
                </div>
            </CardContent>
          </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-headline mb-4 text-center">Assessments & Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><FileText/> PHQ-9 & GAD-7</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Check in on your emotional well-being with a simple questionnaire.</p>
                    <Link href="/assessment" passHref>
                      <Button variant="secondary" className="w-full">Start Assessment</Button>
                    </Link>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><Phone/> Emergency & Support</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Quick access to help when you need it most.</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="destructive" className="flex-1" onClick={handleEmergencyCall}>Call Doctor</Button>
                      <Button variant="destructive" className="flex-1">Helpline</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    