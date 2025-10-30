
'use client'

import { useParams } from 'next/navigation'
import { doctors } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import Link from 'next/link'

export default function DoctorConnectPage() {
  const params = useParams()
  const doctorId = parseInt(params.doctorId as string, 10)
  const doctor = doctors.find((d) => d.id === doctorId)

  if (!doctor) {
    notFound()
  }

  return (
    <div className="p-4 md:p-8 flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
            <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary/20">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback>
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
            </Avatar>
          <CardTitle className="font-headline text-3xl">Connecting with {doctor.name}</CardTitle>
          <CardDescription>{doctor.specialty}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            You are about to start a session. Please ensure you are in a quiet and private space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex-1">
              <Phone className="mr-2"/>
              Start Video Call
            </Button>
             <Button size="lg" variant="outline" className="flex-1">
              Start Chat
            </Button>
          </div>
          <p className="text-xs text-muted-foreground pt-4">
            If you are in a crisis, please call a local emergency number or a dedicated helpline.
          </p>
           <Button variant="link" asChild>
                <Link href="/doctors">Choose a different doctor</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  )
}
