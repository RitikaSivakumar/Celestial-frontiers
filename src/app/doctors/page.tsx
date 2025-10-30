import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { doctors } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function DoctorsPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-headline mb-2">Doctor Dashboard Portal</h1>
      <p className="text-muted-foreground mb-8">Select your profile to access your patient dashboard.</p>
      
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map(doctor => (
          <Card key={doctor.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-2 border-primary">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} data-ai-hint={doctor.avatarHint} />
                  <AvatarFallback>
                    <Stethoscope className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-headline">{doctor.name}</CardTitle>
                  <p className="text-sm text-primary">{doctor.specialty}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Dr. {doctor.name.split(' ').pop()} is a compassionate professional with over 10 years of experience in helping individuals navigate their mental wellness.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/doctors/${doctor.id}`}>View Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
