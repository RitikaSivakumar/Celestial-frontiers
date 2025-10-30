import { doctors } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function DoctorSelectionPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-headline">Connect with a Professional</h1>
                <p className="text-muted-foreground mt-2">
                    Choose a doctor or counselor who feels right for you.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {doctors.map((doctor) => (
                    <Card key={doctor.id} className="flex flex-col text-center items-center">
                        <CardHeader>
                            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                                <AvatarFallback>
                                    <Stethoscope className="w-10 h-10 text-muted-foreground"/>
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="font-headline">{doctor.name}</CardTitle>
                            <CardDescription>{doctor.specialty}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-end">
                            <Button asChild className="w-full">
                                <Link href={`/doctors/${doctor.id}/connect`}>Select & Continue</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground">Are you a doctor?</p>
              <Button variant="link" asChild>
                <Link href="/doctors/login">Go to Doctor Portal</Link>
              </Button>
            </div>
        </div>
    );
}
