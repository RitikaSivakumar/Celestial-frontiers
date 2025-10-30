'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { getZodiacSign, getAstrologicalMessage } from '@/lib/astrology';
import BirthdayCelebration from '@/components/auth/BirthdayCelebration';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; dob: Date } | null>(null);
  const [showBirthday, setShowBirthday] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const dob = new Date(data.dob);
    const today = new Date();
    
    const zodiacSign = getZodiacSign(dob);
    const astrologicalMessage = getAstrologicalMessage(zodiacSign, data.name);

    toast({
      title: `Welcome, ${data.name}!`,
      description: astrologicalMessage,
      duration: 5000,
    });
    
    setUser({ name: data.name, dob: dob });

    // Check for birthday
    if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
      setShowBirthday(true);
    } else {
      // Redirect to role selection after a short delay
      setTimeout(() => {
        router.push('/roles');
      }, 2000);
    }
  };
  
  const handleCelebrationEnd = () => {
      setShowBirthday(false);
      router.push('/roles');
  }

  if (showBirthday && user) {
    return <BirthdayCelebration name={user.name} onCelebrationEnd={handleCelebrationEnd} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">🌟 AstroBirth Connect</CardTitle>
          <CardDescription>Sign-in with the stars and celebrate you!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email / Main ID</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" {...register('dob')} />
              {errors.dob && <p className="text-destructive text-sm">{errors.dob.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Connecting...' : 'Connect with Stars'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
