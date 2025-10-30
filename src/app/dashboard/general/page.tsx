
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import MoodTracker from "@/components/dashboard/MoodTracker";
import RoutineBuilder from "@/components/dashboard/RoutineBuilder";
import MedicationReminders from "@/components/dashboard/MedicationReminders";
import WeeklyReportSummary from "@/components/dashboard/WeeklyReportSummary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Users, Lock, Unlock, PersonStanding, Heart } from "lucide-react";
import Link from "next/link";
import { useChatbot } from '@/components/shared/Chatbot';

type OnboardingStep = 'select_gender' | 'select_marital_status' | 'select_privacy' | 'complete' | 'loading';
type Gender = 'Male' | 'Female';
type MaritalStatus = 'Married' | 'Unmarried';

export default function GeneralDashboard() {
  const router = useRouter();
  const { setOpen: openChatbot } = useChatbot();
  const [step, setStep] = useState<OnboardingStep>('loading');
  const [gender, setGender] = useState<Gender | null>(null);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(null);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('general_onboarding_complete');
    if (onboardingComplete) {
      setStep('complete');
    } else {
      setStep('select_gender');
    }
  }, []);

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    setStep('select_marital_status');
  };

  const handleMaritalStatusSelect = (status: MaritalStatus) => {
    setMaritalStatus(status);
    setStep('select_privacy');
  };

  const handlePrivacySelect = (isPublic: boolean) => {
    localStorage.setItem('general_onboarding_complete', 'true');
    localStorage.setItem('general_gender', gender || '');
    localStorage.setItem('general_marital_status', maritalStatus || '');
    localStorage.setItem('general_privacy', isPublic ? 'public' : 'private');
    
    if (isPublic) {
      router.push('/peer-support');
    } else {
      setStep('complete');
      setTimeout(() => openChatbot(true), 500);
    }
  };

  if (step === 'loading') {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  if (step === 'select_gender') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">What is your gender?</CardTitle>
            <CardDescription>This helps us connect you with relevant peers.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleGenderSelect('Male')}>
              <PersonStanding className="mr-2" /> Male
            </Button>
            <Button variant="outline" onClick={() => handleGenderSelect('Female')}>
              <PersonStanding className="mr-2" /> Female
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'select_marital_status') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">What is your marital status?</CardTitle>
            <CardDescription>This allows for more relatable conversations.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleMaritalStatusSelect('Married')}>
              <Heart className="mr-2" /> Married
            </Button>
            <Button variant="outline" onClick={() => handleMaritalStatusSelect('Unmarried')}>
              <Heart className="mr-2" /> Unmarried
            </Button>
          </CardContent>
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
              <p className="text-sm text-muted-foreground">Connect anonymously with peers of similar gender and marital status.</p>
            </div>
            <div onClick={() => handlePrivacySelect(false)} className="p-6 border rounded-lg hover:bg-muted/50 cursor-pointer text-center">
              <Lock className="w-12 h-12 mx-auto text-primary mb-4"/>
              <h3 className="font-semibold text-lg">Private Profile</h3>
              <p className="text-sm text-muted-foreground">Receive confidential support from the EmpathiCare AI chatbot.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-8 space-y-8">
        <WelcomeHeader />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <MoodTracker />
            <MedicationReminders />
          </div>
          <div className="flex flex-col gap-8">
            <RoutineBuilder />
            <WeeklyReportSummary />
          </div>
        </div>
        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/peer-support" passHref>
            <div className="flex items-center gap-4 p-6 cursor-pointer">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-headline text-xl">Peer-to-Peer Support</h3>
                <p className="text-muted-foreground">
                  Connect with others, share experiences, and find support in a safe community.
                </p>
              </div>
            </div>
          </Link>
        </Card>
      </main>
    </div>
  );
}
