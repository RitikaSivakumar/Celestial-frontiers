
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import MoodTracker from "@/components/dashboard/MoodTracker";
import RoutineBuilder from "@/components/dashboard/RoutineBuilder";
import WeeklyReportSummary from "@/components/dashboard/WeeklyReportSummary";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wind, Gamepad2, Users, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import SoothingSongs from "@/components/dashboard/SoothingSongs";
import { useChatbot } from '@/components/shared/chatbot';

type OnboardingStep = 'select_profession' | 'select_privacy' | 'complete';

const professions = ['Teacher', 'Engineer', 'Doctor', 'Driver', 'IT Employee'];

export default function EmployeeDashboard() {
  const router = useRouter();
  const { setOpen: openChatbot } = useChatbot();
  const [step, setStep] = useState<OnboardingStep | 'loading'>('loading');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [otherProfession, setOtherProfession] = useState('');

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('employee_onboarding_complete');
    if (onboardingComplete) {
      setStep('complete');
    } else {
      setStep('select_profession');
    }
  }, []);

  const handleProfessionSelect = (profession: string) => {
    setSelectedProfession(profession);
    if (profession !== 'Other') {
      setStep('select_privacy');
    }
  };

  const handleOtherProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherProfession(e.target.value);
  };
  
  const handleConfirmOtherProfession = () => {
    if(otherProfession.trim()){
        setSelectedProfession(otherProfession);
        setStep('select_privacy');
    }
  }

  const handlePrivacySelect = (isPublic: boolean) => {
    localStorage.setItem('employee_onboarding_complete', 'true');
    localStorage.setItem('employee_profession', selectedProfession);
    localStorage.setItem('employee_privacy', isPublic ? 'public' : 'private');
    
    if (isPublic) {
      router.push('/peer-support');
    } else {
      setStep('complete');
      setTimeout(() => openChatbot(true), 500);
    }
  };

  if (step === 'loading') {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>
  }
  
  if (step === 'select_profession') {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <Card className="w-full max-w-lg text-center">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">What is your profession?</CardTitle>
                      <CardDescription>This helps us connect you with relevant peers.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {professions.map(prof => (
                          <Button key={prof} variant="outline" onClick={() => handleProfessionSelect(prof)}>
                              {prof}
                          </Button>
                      ))}
                      <Button variant={selectedProfession === 'Other' ? 'secondary': 'outline'} onClick={() => handleProfessionSelect('Other')}>Other</Button>
                  </CardContent>
                  {selectedProfession === 'Other' && (
                     <CardContent className="flex gap-2">
                        <Input 
                            placeholder="Please specify your profession"
                            value={otherProfession}
                            onChange={handleOtherProfessionChange}
                        />
                        <Button onClick={handleConfirmOtherProfession} disabled={!otherProfession.trim()}>Confirm</Button>
                     </CardContent>
                  )}
              </Card>
          </div>
      );
  }

  if (step === 'select_privacy') {
      return (
           <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <Card className="w-full max-w-lg text-center">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">Choose Your Privacy Level</CardTitle>
                      <CardDescription>Your choice determines how you connect with support.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                     <div onClick={() => handlePrivacySelect(true)} className="p-6 border rounded-lg hover:bg-muted/50 cursor-pointer text-center">
                        <Unlock className="w-12 h-12 mx-auto text-primary mb-4"/>
                        <h3 className="font-semibold text-lg">Public Profile</h3>
                        <p className="text-sm text-muted-foreground">Connect anonymously with peers in your profession for relatable conversations.</p>
                     </div>
                      <div onClick={() => handlePrivacySelect(false)} className="p-6 border rounded-lg hover:bg-muted/50 cursor-pointer text-center">
                        <Lock className="w-12 h-12 mx-auto text-primary mb-4"/>
                        <h3 className="font-semibold text-lg">Private Profile</h3>
                        <p className="text-sm text-muted-foreground">Receive confidential one-on-one support from the EmpathiCare AI chatbot.</p>
                     </div>
                  </CardContent>
              </Card>
          </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-8 space-y-8">
        <WelcomeHeader />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <MoodTracker />
            <RoutineBuilder />
          </div>
          <div className="space-y-8">
            <WeeklyReportSummary />
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Mindfulness Activities</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Link href="/breathing" passHref>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Wind className="w-6 h-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Breathing Rhythm</h3>
                                <p className="text-sm text-muted-foreground">Sync your breath, find your calm.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/games" passHref>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Gamepad2 className="w-6 h-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Relaxation Games</h3>
                                <p className="text-sm text-muted-foreground">Unwind with a quick game.</p>
                            </div>
                        </div>
                    </Link>
                     <Link href="/peer-support" passHref>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Users className="w-6 h-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Peer Support</h3>
                                <p className="text-sm text-muted-foreground">Connect with the community.</p>
                            </div>
                        </div>
                    </Link>
                    <SoothingSongs />
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
