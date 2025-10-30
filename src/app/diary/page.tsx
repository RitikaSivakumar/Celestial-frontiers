'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save } from 'lucide-react';
import { saveDiaryEntry } from './actions';

export default function DiaryPage() {
  const [entry, setEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (entry.trim() === '') {
      toast({
        title: 'Empty Entry',
        description: 'Please write something before saving.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    const result = await saveDiaryEntry(entry);
    setIsSaving(false);

    if (result.success) {
      toast({
        title: 'Entry Saved',
        description: 'Your thoughts have been recorded.',
      });
      setEntry('');
    } else {
        toast({
            title: 'Error',
            description: result.error || 'Could not save your entry.',
            variant: 'destructive',
        });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline">My Diary</h1>
        <p className="text-muted-foreground mt-2">A private space for your thoughts and reflections.</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">New Entry</CardTitle>
          <CardDescription>What's on your mind today?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Start writing..."
            className="min-h-[300px] text-base"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            disabled={isSaving}
          />
          <Button onClick={handleSave} className="mt-4 w-full" disabled={isSaving}>
            <Save className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Entry'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
