
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BellRing, Check, Pill, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export type Medication = {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
};

const formSchema = z.object({
    name: z.string().min(1, "Medication name is required."),
    dosage: z.string().min(1, "Dosage is required."),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please use HH:MM format."),
});

type FormValues = z.infer<typeof formSchema>;

const getMedicationsFromStorage = (userEmail: string): Medication[] => {
    if (typeof window === 'undefined' || !userEmail) return [];
    const storedMeds = localStorage.getItem(`medications_${userEmail}`);
    return storedMeds ? JSON.parse(storedMeds) : [];
};

const saveMedicationsToStorage = (meds: Medication[], userEmail: string) => {
    if (typeof window === 'undefined' || !userEmail) return;
    localStorage.setItem(`medications_${userEmail}`, JSON.stringify(meds));
};

export default function MedicationReminders() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    setUserEmail(email);
    if (email) {
      setMedications(getMedicationsFromStorage(email));
    }
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleAddMedication: SubmitHandler<FormValues> = (data) => {
    if (!userEmail) return;
    const newMed: Medication = {
        id: Date.now(),
        name: data.name,
        dosage: data.dosage,
        time: data.time,
        taken: false,
    };
    const updatedMeds = [...medications, newMed];
    setMedications(updatedMeds);
    saveMedicationsToStorage(updatedMeds, userEmail);
    
    toast({
        title: "Medication Added",
        description: `${data.name} has been added to your reminders.`
    });
    
    reset();
    setIsDialogOpen(false);
  };


  const handleTakeMedication = (id: number) => {
    if (!userEmail) return;
    const updatedMeds = medications.map(med => 
      med.id === id ? { ...med, taken: true } : med
    );
    setMedications(updatedMeds);
    saveMedicationsToStorage(updatedMeds, userEmail);

    const medName = medications.find(m => m.id === id)?.name;
    toast({
      title: 'Medication Logged',
      description: `You've marked ${medName} as taken.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline">Medication Reminders</CardTitle>
            <CardDescription>Stay on track with your schedule.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                 <Button variant="outline" size="sm" disabled={!userEmail}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Medication</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleAddMedication)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Medication Name</Label>
                        <Input id="name" {...register('name')}/>
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="dosage">Dosage (e.g., 1 tablet, 10mg)</Label>
                        <Input id="dosage" {...register('dosage')}/>
                        {errors.dosage && <p className="text-sm text-destructive mt-1">{errors.dosage.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="time">Reminder Time (HH:MM)</Label>
                        <Input id="time" type="time" {...register('time')}/>
                        {errors.time && <p className="text-sm text-destructive mt-1">{errors.time.message}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Medication</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
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
              <p>{userEmail ? "No medication reminders set up. Click 'Add New' to start." : "Please log in to manage medications."}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
