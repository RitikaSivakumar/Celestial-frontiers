
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
import { useState } from 'react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const getAge = (dobString: string) => {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedUserRaw = localStorage.getItem(`user_${data.email}`);
    
    if (storedUserRaw) {
        const storedUser = JSON.parse(storedUserRaw);
        if (storedUser.password === data.password) {
            toast({
                title: 'Login Successful',
                description: `Welcome back, ${storedUser.name}!`,
            });
            const age = getAge(storedUser.dob);
            localStorage.setItem('user_session', JSON.stringify({ name: storedUser.name, email: data.email, age, dob: storedUser.dob }));
            router.push('/roles');
        } else {
            toast({
                title: 'Login Failed',
                description: 'Invalid email or password.',
                variant: 'destructive',
            });
            setIsSubmitting(false);
        }
    } else {
        toast({
            title: 'Login Failed',
            description: 'No account found with this email.',
            variant: 'destructive',
        });
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
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
        <CardFooter className="flex-col gap-4">
             <div className="flex justify-between items-center w-full">
                <Button variant="link" size="sm" asChild>
                    <Link href="/signin">Back to role selection</Link>
                </Button>
                <Button variant="link" size="sm" asChild>
                    <Link href="#">Forgot Password?</Link>
                </Button>
             </div>
             <p className="text-xs text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-primary hover:underline">
                    Register here
                </Link>
             </p>
        </CardFooter>
      </Card>
    </div>
  );
}
