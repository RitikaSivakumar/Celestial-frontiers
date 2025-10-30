
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { phq9Questions, gad7Questions, answerOptions, phq9Interpretations, gad7Interpretations } from '@/lib/assessments-data';
import Questionnaire from '@/components/assessment/Questionnaire';
import AssessmentResults from '@/components/assessment/AssessmentResults';

export type Answers = { [key: string]: number };

export default function AssessmentPage() {
    const [phq9Answers, setPhq9Answers] = useState<Answers>({});
    const [gad7Answers, setGad7Answers] = useState<Answers>({});
    const [showResults, setShowResults] = useState(false);

    const isPhq9Complete = Object.keys(phq9Answers).length === phq9Questions.length;
    const isGad7Complete = Object.keys(gad7Answers).length === gad7Questions.length;

    const handleSubmit = () => {
        if (isPhq9Complete && isGad7Complete) {
            setShowResults(true);
        }
    };
    
    if (showResults) {
        return (
            <AssessmentResults
                phq9Answers={phq9Answers}
                gad7Answers={gad7Answers}
                onRetake={() => {
                    setShowResults(false);
                    setPhq9Answers({});
                    setGad7Answers({});
                }}
            />
        );
    }

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-headline">Mental Wellness Check-in</h1>
                <p className="text-muted-foreground mt-2">
                    These assessments are for self-awareness, not as a diagnostic tool.
                </p>
            </header>

            <Tabs defaultValue="phq9" className="w-full max-w-2xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phq9">PHQ-9 (Depression)</TabsTrigger>
                    <TabsTrigger value="gad7" disabled={!isPhq9Complete}>GAD-7 (Anxiety)</TabsTrigger>
                </TabsList>
                <TabsContent value="phq9">
                    <Questionnaire
                        title="PHQ-9: Over the last 2 weeks, how often have you been bothered by any of the following problems?"
                        questions={phq9Questions}
                        answers={phq9Answers}
                        onAnswerChange={setPhq9Answers}
                        answerOptions={answerOptions}
                    />
                </TabsContent>
                <TabsContent value="gad7">
                     <Questionnaire
                        title="GAD-7: Over the last 2 weeks, how often have you been bothered by the following problems?"
                        questions={gad7Questions}
                        answers={gad7Answers}
                        onAnswerChange={setGad7Answers}
                        answerOptions={answerOptions}
                        onAllAnswered={handleSubmit}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
