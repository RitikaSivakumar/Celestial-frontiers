
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { doctors } from '@/lib/mock-data'; // Using this to get doctor IDs

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof formSchema>;

const doctorCredentials = [
    { email: 'doc1@example.com', password: '1234', id: 1 },
    { email: 'doc2@example.com', password: '567', id: 2 },
    { email: 'doc3@example.com', password: '8910', id: 3 },
];

export default function DoctorLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundDoctor = doctorCredentials.find(
      (cred) => cred.email === data.email && cred.password === data.password
    );

    if (foundDoctor) {
      toast({
        title: 'Login Successful',
        description: 'Redirecting to your dashboard...',
      });
      router.push(`/doctors/${foundDoctor.id}`);
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid login credentials.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
              <Stethoscope className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Doctor Portal</CardTitle>
          <CardDescription>Please sign in to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email / ID</Label>
              <Input id="email" type="email" {...register('email')} placeholder="your.email@example.com"/>
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
             <Button variant="link" size="sm" asChild>
                <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="link" size="sm" asChild>
                <Link href="#">Forgot Password?</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
