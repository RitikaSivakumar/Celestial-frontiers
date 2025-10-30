'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, TriangleAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeSymptoms } from '@/ai/flows/early-disease-detection';

type AnalysisResult = {
  analysis: string;
  recommendation: string;
};

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (symptoms.trim().length < 10) {
      toast({
        title: 'Input Too Short',
        description: 'Please describe your symptoms in a bit more detail.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const analysisResult = await analyzeSymptoms({ symptoms });
      setResult(analysisResult);
    } catch (error) {
      console.error('Symptom analysis failed:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Sorry, I was unable to analyze the symptoms. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="text-primary"/>
            AI-Powered Symptom Checker
        </CardTitle>
        <CardDescription>
            Describe how you're feeling, and our AI can provide some general insights. This is not a medical diagnosis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="For example: 'I have been feeling tired for a week and have a persistent cough...'"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="min-h-[100px]"
          disabled={isLoading}
        />
        <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
          {isLoading ? 'Analyzing...' : 'Analyze My Symptoms'}
        </Button>

        {result && (
          <div className="space-y-4 pt-4">
            <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>AI Analysis</AlertTitle>
                <AlertDescription>
                    {result.analysis}
                </AlertDescription>
            </Alert>
            <Alert variant="destructive">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Recommendation</AlertTitle>
                <AlertDescription>
                    <p>{result.recommendation}</p>
                    <p className="font-bold mt-2">This is not a medical diagnosis. Please consult a doctor for any health concerns.</p>
                </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
