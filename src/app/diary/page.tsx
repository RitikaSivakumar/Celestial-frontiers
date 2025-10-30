'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save } from 'lucide-react';

export default function DiaryPage() {
  const [entry, setEntry] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (entry.trim() === '') {
      toast({
        title: 'Empty Entry',
        description: 'Please write something before saving.',
        variant: 'destructive',
      });
      return;
    }
    // For now, we'll just show a toast. In the future, this would save to a database.
    console.log('Diary Entry Saved:', entry);
    toast({
      title: 'Entry Saved',
      description: 'Your thoughts have been recorded.',
    });
    setEntry('');
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
          />
          <Button onClick={handleSave} className="mt-4 w-full">
            <Save className="mr-2" />
            Save Entry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}