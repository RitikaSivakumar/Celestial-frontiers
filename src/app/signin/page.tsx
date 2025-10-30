
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
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
import { LogIn } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
    message: 'Please enter a valid age',
  }),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date',
  }),
  language: z.string({required_error: 'Please select a language.'}),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; dob: Date } | null>(null);
  const [showBirthday, setShowBirthday] = useState(false);

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const getDashboardForAge = (age: number): { path: string; name: string } => {
    if (age <= 24) {
      return { path: '/dashboard/student', name: 'Student' };
    } else if (age <= 60) {
      return { path: '/dashboard/employee', name: 'Employee' };
    } else {
      return { path: '/dashboard/senior', name: 'Senior Citizen' };
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const dob = new Date(data.dob);
    const today = new Date();
    const age = parseInt(data.age, 10);
    
    const zodiacSign = getZodiacSign(dob);
    const astrologicalMessage = getAstrologicalMessage(zodiacSign, data.name);

    toast({
      title: `Welcome, ${data.name}!`,
      description: astrologicalMessage,
      duration: 5000,
    });
    
    toast({
      title: 'Language Set',
      description: `Your preferred language has been set to ${data.language}.`,
    });

    setUser({ name: data.name, dob: dob });

    const handleRedirect = () => {
        const dashboard = getDashboardForAge(age);
        toast({
            title: "Personalizing Your Experience",
            description: `Based on your age, we suggest the ${dashboard.name} dashboard for you.`,
            duration: 4000,
        });

        setTimeout(() => {
            router.push('/roles');
        }, 2000);
    }

    // Check for birthday
    if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
      setShowBirthday(true);
    } else {
      handleRedirect();
    }
  };
  
  const handleCelebrationEnd = () => {
      setShowBirthday(false);
      const ageString = (document.getElementById('age') as HTMLInputElement)?.value;
      const age = ageString ? parseInt(ageString, 10) : 0;
      
      const dashboard = getDashboardForAge(age);
      toast({
          title: "Personalizing Your Experience",
          description: `Based on your age, we suggest the ${dashboard.name} dashboard for you.`,
          duration: 4000,
      });

      setTimeout(() => {
          router.push('/roles');
      }, 2000);
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
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" {...register('age')} />
              {errors.age && <p className="text-destructive text-sm">{errors.age.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" {...register('dob')} />
              {errors.dob && <p className="text-destructive text-sm">{errors.dob.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="language">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                        </SelectContent>
                    </Select>
                )}
              />
              {errors.language && <p className="text-destructive text-sm">{errors.language.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <LogIn className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Connecting...' : 'Connect with Stars'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
