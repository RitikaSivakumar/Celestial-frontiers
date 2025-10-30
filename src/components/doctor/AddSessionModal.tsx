
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { type Patient } from '@/lib/mock-data';

const formSchema = z.object({
  patientId: z.string().min(1, 'Please select a patient.'),
  date: z.date({ required_error: 'Please select a date.' }),
  notes: z.string().min(10, 'Notes must be at least 10 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

type AddSessionModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  patients: Patient[];
  onSessionAdded: (session: any) => void;
  doctorId: number;
};

export default function AddSessionModal({
  isOpen,
  onOpenChange,
  patients,
  onSessionAdded,
  doctorId
}: AddSessionModalProps) {
  const { toast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      notes: '',
      patientId: '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log({
        doctorId,
        patientId: parseInt(data.patientId),
        dateTime: data.date.toISOString(),
        notes: data.notes
    });

    toast({
      title: 'Session Scheduled',
      description: `New session with ${patients.find(p => p.id.toString() === data.patientId)?.name} has been added.`,
    });
    
    onSessionAdded({
        patient: data.patientId,
        date: data.date,
        notes: data.notes
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Add New Session</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule a new session.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
           <div className="space-y-2">
            <Label htmlFor="patientId">Patient</Label>
            <Controller
              name="patientId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="patientId">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(p => (
                      <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.patientId && <p className="text-sm text-destructive">{errors.patientId.message}</p>}
          </div>

          <div className="space-y-2">
             <Label htmlFor="date">Session Date</Label>
             <Controller
                name="date"
                control={control}
                render={({ field }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                             <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                             />
                        </PopoverContent>
                    </Popover>
                )}
             />
             {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Session Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter session notes, observations, and recommendations..."
              className="min-h-[120px]"
              {...register('notes')}
            />
            {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2"/>
              {isSubmitting ? 'Saving...' : 'Save Session'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
