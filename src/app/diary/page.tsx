
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, Download } from 'lucide-react';
import { format } from 'date-fns';
import { analyzeDiaryEntry } from '@/ai/flows/ai-chatbot-diary-entry-analysis';

type DiaryEntry = {
  entry: string;
  date: string;
};

// --- Client-side helper functions for localStorage ---

async function getDiaryEntries(userEmail: string): Promise<DiaryEntry[]> {
    if (typeof window === 'undefined') return [];
    try {
        const key = `diary_entries_${userEmail}`;
        const entriesJson = localStorage.getItem(key);
        const entries = entriesJson ? JSON.parse(entriesJson) : [];
        return entries.sort((a: DiaryEntry, b: DiaryEntry) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error('Error reading diary entries:', error);
        return [];
    }
}

async function saveDiaryEntry(userEmail: string, entry: string): Promise<{success: boolean; error?: string}> {
    if (typeof window === 'undefined') return { success: false, error: 'Window not available' };
    try {
        const key = `diary_entries_${userEmail}`;
        const entriesJson = localStorage.getItem(key);
        const entries = entriesJson ? JSON.parse(entriesJson) : [];

        const newEntry: DiaryEntry = {
            entry,
            date: new Date().toISOString(),
        };

        entries.push(newEntry);

        localStorage.setItem(key, JSON.stringify(entries));

        return { success: true };
    } catch (error) {
        console.error('Error saving diary entry:', error);
        return { success: false, error: 'Failed to save entry.' };
    }
}

// --- DiaryPage Component ---

export default function DiaryPage() {
  const [entry, setEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This runs on the client, so window is available.
    const email = localStorage.getItem('user_email'); 
    setUserEmail(email);

    const fetchEntries = async () => {
      if (email) {
        const pastEntries = await getDiaryEntries(email);
        setEntries(pastEntries);
      }
    };
    fetchEntries();
  }, []);

  const handleSave = async () => {
    if (!userEmail) {
      toast({ title: 'Error', description: 'You must be logged in to save entries.', variant: 'destructive' });
      return;
    }
    if (entry.trim() === '') {
      toast({
        title: 'Empty Entry',
        description: 'Please write something before saving.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    const result = await saveDiaryEntry(userEmail, entry);

    if (result.success) {
      toast({
        title: 'Entry Saved',
        description: 'Your thoughts have been recorded.',
      });
      
      // AI Analysis
      if (entry.trim().length > 10) {
        try {
          const analysisResult = await analyzeDiaryEntry({ diaryEntry: entry });
          if (analysisResult) {
            setTimeout(() => {
              toast({
                title: "A Thought for You",
                description: (
                  <div>
                    <p>I noticed your emotional state seems to be: <span className="font-semibold">{analysisResult.emotionalState}</span>.</p>
                    <p className="mt-2">{analysisResult.suggestedSupport}</p>
                  </div>
                ),
                duration: 9000,
              });
            }, 500);
          }
        } catch(e) {
          console.error("Diary analysis failed", e);
        }
      }
      
      setEntry('');
      // Refresh entries
      const pastEntries = await getDiaryEntries(userEmail);
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
    if (!userEmail) {
        toast({ title: 'Error', description: 'You must be logged in to back up entries.', variant: 'destructive' });
        return;
    }
    const entriesToBackup = await getDiaryEntries(userEmail);
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
              <Button onClick={handleSave} className="mt-4 w-full" disabled={isSaving || !userEmail}>
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
                <p className="text-muted-foreground">{userEmail ? 'No entries yet. Write your first one!' : 'Please log in to see your entries.'}</p>
             )}
          </div>
      </div>
    </div>
  );
}
