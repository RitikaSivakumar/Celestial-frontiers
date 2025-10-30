'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Smile, Meh, Frown, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { analyzeDiaryEntry } from '@/ai/flows/ai-chatbot-diary-entry-analysis';

type Mood = 'Happy' | 'Neutral' | 'Sad';

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [diaryEntry, setDiaryEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!selectedMood) {
      toast({
        title: 'Incomplete Entry',
        description: 'Please select a mood before saving.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);

    let analysisToast: { title: string, description: React.ReactNode, variant: 'default' } | null = null;
    if(diaryEntry.trim().length > 10){ // only run analysis for longer entries
        try {
            const result = await analyzeDiaryEntry({ diaryEntry });
            if (result) {
                analysisToast = {
                    title: "AI Insight",
                    description: (
                        <div>
                            <p>I noticed your emotional state seems to be: <span className="font-semibold">{result.emotionalState}</span>.</p>
                            <p className="mt-2">{result.suggestedSupport}</p>
                        </div>
                    ),
                    variant: 'default',
                }
            }
        } catch(e) {
            console.error("Diary analysis failed", e);
            // fail silently and just save the entry
        }
    }

    // Simulate saving
    setTimeout(() => {
      toast({
        title: 'Entry Saved!',
        description: `You've logged your mood as ${selectedMood}.`,
      });

      if (analysisToast) {
        setTimeout(() => toast(analysisToast!), 500);
      }

      setSelectedMood(null);
      setDiaryEntry('');
      setIsLoading(false);
    }, 500);
  };

  const moodOptions: { mood: Mood, icon: React.ReactNode, color: string }[] = [
    { mood: 'Happy', icon: <Smile className="w-10 h-10" />, color: 'text-green-500' },
    { mood: 'Neutral', icon: <Meh className="w-10 h-10" />, color: 'text-yellow-500' },
    { mood: 'Sad', icon: <Frown className="w-10 h-10" />, color: 'text-blue-500' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">How are you today?</CardTitle>
        <CardDescription>Log your mood and thoughts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-around">
          {moodOptions.map(({ mood, icon, color }) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={cn(
                'p-4 rounded-full transition-all duration-200 ease-in-out',
                'hover:bg-accent',
                selectedMood === mood ? 'bg-accent scale-110' : 'opacity-60'
              )}
            >
              <div className={color}>{icon}</div>
              <span className="text-sm font-medium text-muted-foreground">{mood}</span>
            </button>
          ))}
        </div>
        <Textarea
          placeholder="What's on your mind? (Optional)"
          value={diaryEntry}
          onChange={(e) => setDiaryEntry(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleSave} disabled={isLoading || !selectedMood} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Entry'}
        </Button>
      </CardContent>
    </Card>
  );
}
