
'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { phq9Interpretations, gad7Interpretations } from "@/lib/assessments-data";
import { cn } from "@/lib/utils";
import { Heart, Phone, RefreshCw } from "lucide-react";
import Link from "next/link";

type Answers = { [key: string]: number };

type AssessmentResultsProps = {
    phq9Answers: Answers;
    gad7Answers: Answers;
    onRetake: () => void;
};

const getInterpretation = (score: number, interpretations: any) => {
    for (const key in interpretations) {
        const { range } = interpretations[key];
        if (score >= range[0] && score <= range[1]) {
            return interpretations[key];
        }
    }
    return { interpretation: "N/A", recommendation: "Could not calculate score.", color: "bg-gray-100" };
};

export default function AssessmentResults({ phq9Answers, gad7Answers, onRetake }: AssessmentResultsProps) {
    const phq9Score = useMemo(() => Object.values(phq9Answers).reduce((sum, val) => sum + val, 0), [phq9Answers]);
    const gad7Score = useMemo(() => Object.values(gad7Answers).reduce((sum, val) => sum + val, 0), [gad7Answers]);

    const phq9Result = getInterpretation(phq9Score, phq9Interpretations);
    const gad7Result = getInterpretation(gad7Score, gad7Interpretations);
    
    const highRisk = phq9Score >= 15 || gad7Score >= 15;

    return (
        <div className="p-4 md:p-8 max-w-3xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-headline">Your Results</h1>
                <p className="text-muted-foreground mt-2">Here is a summary of your wellness check-in.</p>
            </header>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">PHQ-9 (Depression) Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{phq9Score} / 27</p>
                        <div className={cn("p-4 rounded-md mt-4", phq9Result.color)}>
                            <p className="font-semibold">{phq9Result.interpretation}</p>
                            <p className="text-sm mt-1">{phq9Result.recommendation}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">GAD-7 (Anxiety) Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{gad7Score} / 21</p>
                        <div className={cn("p-4 rounded-md mt-4", gad7Result.color)}>
                            <p className="font-semibold">{gad7Result.interpretation}</p>
                            <p className="text-sm mt-1">{gad7Result.recommendation}</p>
                        </div>
                    </CardContent>
                </Card>
                
                {highRisk && (
                    <Card className="bg-destructive/10 border-destructive">
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2 font-headline text-destructive">
                                <Heart /> Important: Please Seek Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-destructive-foreground mb-4">
                                It seems you’ve been feeling quite overwhelmed. Please contact your doctor or a psychiatrist. Professional care can help you recover and feel at peace again.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/doctors" className="flex-1">
                                    <Button className="w-full">Connect with a Doctor</Button>
                                </Link>
                                <Button className="w-full flex-1" variant="outline">Call a Helpline</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={onRetake} variant="outline" className="flex-1">
                            <RefreshCw className="mr-2 h-4 w-4"/>
                            Retake Assessment
                        </Button>
                        <Link href="/reports" passHref className="flex-1">
                            <Button className="w-full">View Progress Tracker</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
             <p className="text-xs text-muted-foreground mt-8 text-center">
                <strong>Disclaimer:</strong> These questionnaires are for self-awareness, not diagnosis. If you feel distressed, please reach out to a mental health professional.
            </p>
        </div>
    );
}
