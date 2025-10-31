
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
import { Book, Gamepad2, Users, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import SoothingSongs from "@/components/dashboard/SoothingSongs";
import { useChatbot } from '@/components/shared/chatbot';

type OnboardingStep = 'select_education' | 'select_privacy' | 'complete' | 'loading';

const educationLevels = ['Primary', 'Secondary', 'Senior Secondary'];

export default function StudentDashboard() {
  const router = useRouter();
  const { setOpen: openChatbot } = useChatbot();
  const [step, setStep] = useState<OnboardingStep>('loading');
  const [selectedEducation, setSelectedEducation] = useState('');
  const [otherEducation, setOtherEducation] = useState('');

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('student_onboarding_complete');
    if (onboardingComplete) {
      setStep('complete');
    } else {
      setStep('select_education');
    }
  }, []);

  const handleEducationSelect = (level: string) => {
    setSelectedEducation(level);
    if (level !== 'Other') {
      setStep('select_privacy');
    }
  };

  const handleOtherEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherEducation(e.target.value);
  };
  
  const handleConfirmOtherEducation = () => {
    if(otherEducation.trim()){
        setSelectedEducation(otherEducation);
        setStep('select_privacy');
    }
  }

  const handlePrivacySelect = (isPublic: boolean) => {
    localStorage.setItem('student_onboarding_complete', 'true');
    localStorage.setItem('student_education_level', selectedEducation);
    localStorage.setItem('student_privacy', isPublic ? 'public' : 'private');
    
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
  
  if (step === 'select_education') {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <Card className="w-full max-w-lg text-center">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">What is your education level?</CardTitle>
                      <CardDescription>This helps us connect you with peers at the same stage.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      {educationLevels.map(level => (
                          <Button key={level} variant="outline" onClick={() => handleEducationSelect(level)}>
                              {level}
                          </Button>
                      ))}
                      <Button variant={selectedEducation === 'Other' ? 'secondary': 'outline'} onClick={() => handleEducationSelect('Other')}>Other</Button>
                  </CardContent>
                  {selectedEducation === 'Other' && (
                     <CardContent className="flex gap-2">
                        <Input 
                            placeholder="Please specify your education level"
                            value={otherEducation}
                            onChange={handleOtherEducationChange}
                        />
                        <Button onClick={handleConfirmOtherEducation} disabled={!otherEducation.trim()}>Confirm</Button>
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
                        <p className="text-sm text-muted-foreground">Connect anonymously with peers at your education level for relatable conversations.</p>
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
                    <CardTitle className="font-headline">Relaxation Activities</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Link href="/games" passHref>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Gamepad2 className="w-6 h-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Quick Games</h3>
                                <p className="text-sm text-muted-foreground">Unwind with a fun game.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/diary" passHref>
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <Book className="w-6 h-6 text-primary"/>
                          <div>
                              <h3 className="font-semibold">Guided Journaling</h3>
                              <p className="text-sm text-muted-foreground">Reflect on your day.</p>
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
