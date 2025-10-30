'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { getZodiacSign, getAstrologicalMessage } from '@/lib/astrology';
import BirthdayCelebration from '@/components/auth/BirthdayCelebration';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date',
  }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; dob: Date } | null>(null);
  const [showBirthday, setShowBirthday] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const dob = new Date(data.dob);
    const today = new Date();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        // Store additional user info in Firestore
        const userProfileRef = doc(firestore, 'users', firebaseUser.uid);
        const language = localStorage.getItem('user_language') || 'en';
        
        setDocumentNonBlocking(userProfileRef, {
            email: data.email,
            preferredLanguage: language,
            birthDate: data.dob,
            name: data.name,
        }, { merge: true });


        const zodiacSign = getZodiacSign(dob);
        const astrologicalMessage = getAstrologicalMessage(zodiacSign, data.name);

        toast({
          title: `Welcome, ${data.name}!`,
          description: astrologicalMessage,
          duration: 5000,
        });

        setUser({ name: data.name, dob });

        const handleRedirect = () => {
          setTimeout(() => {
              router.push('/roles');
          }, 2000);
        };

        if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
          setShowBirthday(true);
        } else {
          handleRedirect();
        }
      }
    } catch (error: any) {
        toast({
            title: 'Registration Failed',
            description: error.message || 'Could not create your account.',
            variant: 'destructive',
        });
    }
  };
  
  const handleCelebrationEnd = () => {
    setShowBirthday(false);
    setTimeout(() => {
        router.push('/roles');
    }, 2000);
  };

  if (showBirthday && user) {
    return <BirthdayCelebration name={user.name} onCelebrationEnd={handleCelebrationEnd} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Create Your Account</CardTitle>
          <CardDescription>Join Medfinity and start your wellness journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" {...register('dob')} />
              {errors.dob && <p className="text-destructive text-sm">{errors.dob.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
                <Link href="/signin">Back to role selection</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
