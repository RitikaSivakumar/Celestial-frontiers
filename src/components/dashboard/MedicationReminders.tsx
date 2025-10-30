'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BellRing, Check, Pill } from 'lucide-react';
import { medications as initialMedications } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function MedicationReminders() {
  const [medications, setMedications] = useState(initialMedications);
  const { toast } = useToast();

  const handleTakeMedication = (id: number) => {
    setMedications(meds => 
      meds.map(med => med.id === id ? { ...med, taken: true } : med)
    );
    const medName = medications.find(m => m.id === id)?.name;
    toast({
      title: 'Medication Logged',
      description: `You've marked ${medName} as taken.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Medication Reminders</CardTitle>
        <CardDescription>Stay on track with your schedule.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.length > 0 ? (
            medications.map(med => (
              <div key={med.id} className={cn("flex items-center p-3 rounded-lg transition-colors", med.taken ? "bg-muted/50" : "bg-card")}>
                <div className={cn("p-2 rounded-full mr-4", med.taken ? "bg-green-100" : "bg-blue-100 dark:bg-blue-900")}>
                   <Pill className={cn("h-5 w-5", med.taken ? "text-green-600" : "text-blue-600 dark:text-blue-300")} />
                </div>
                <div className="flex-1">
                  <p className={cn("font-semibold", med.taken && "line-through text-muted-foreground")}>{med.name}</p>
                  <p className={cn("text-sm text-muted-foreground", med.taken && "line-through")}>{med.dosage} - {med.time}</p>
                </div>
                {med.taken ? (
                  <div className="flex items-center text-green-600">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Taken</span>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleTakeMedication(med.id)}>
                    <Check className="h-4 w-4 mr-2" /> Mark as Taken
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground p-4 border-2 border-dashed rounded-lg">
              <BellRing className="mx-auto h-8 w-8 mb-2" />
              <p>No medication reminders set up.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
