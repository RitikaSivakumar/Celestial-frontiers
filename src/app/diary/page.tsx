
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, Download } from 'lucide-react';
import { saveDiaryEntry, getDiaryEntries, getDiaryEntriesForBackup } from './actions';
import { format } from 'date-fns';

type DiaryEntry = {
  entry: string;
  date: string;
};

export default function DiaryPage() {
  const [entry, setEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEntries = async () => {
      const pastEntries = await getDiaryEntries();
      setEntries(pastEntries);
    };
    fetchEntries();
  }, []);

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

    if (result.success) {
      toast({
        title: 'Entry Saved',
        description: 'Your thoughts have been recorded.',
      });
      setEntry('');
      // Refresh entries
      const pastEntries = await getDiaryEntries();
      setEntries(pastEntries);
    } else {
        toast({
            title: 'Error',
            description: result.error || 'Could not save your entry.',
            variant: 'destructive',
        });
    }
    setIsSaving(false);
  };
  
  const handleBackup = async () => {
    const entriesToBackup = await getDiaryEntriesForBackup();
    const blob = new Blob([JSON.stringify(entriesToBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diary-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
        title: 'Backup Successful',
        description: 'Your diary entries have been downloaded.'
    });
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <header>
            <h1 className="text-4xl font-headline">My Diary</h1>
            <p className="text-muted-foreground mt-2">A private space for your thoughts and reflections.</p>
          </header>
          <div>
            <Button onClick={handleBackup}>
                <Download className="mr-2"/>
                Backup Entries
            </Button>
          </div>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">New Entry</CardTitle>
              <CardDescription>What's on your mind today?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start writing..."
                className="min-h-[200px] text-base"
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
          
          <div className="space-y-6">
             <h2 className="text-2xl font-headline">Past Entries</h2>
             {entries.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto pr-4 space-y-4">
                    {entries.map((item, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="text-lg">{format(new Date(item.date), "MMMM d, yyyy 'at' h:mm a")}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">{item.entry}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
             ) : (
                <p className="text-muted-foreground">No entries yet. Write your first one!</p>
             )}
          </div>
      </div>
    </div>
  );
}
