
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

type AnswerOption = {
    value: number;
    label: string;
};

type Question = {
    id: string;
    text: string;
};

type QuestionnaireProps = {
    title: string;
    questions: Question[];
    answers: { [key: string]: number };
    onAnswerChange: (answers: { [key: string]: number }) => void;
    answerOptions: AnswerOption[];
    onAllAnswered?: () => void;
};

export default function Questionnaire({ title, questions, answers, onAnswerChange, answerOptions, onAllAnswered }: QuestionnaireProps) {
    
    const handleValueChange = (questionId: string, value: string) => {
        const newAnswers = { ...answers, [questionId]: parseInt(value, 10) };
        onAnswerChange(newAnswers);
        if (Object.keys(newAnswers).length === questions.length) {
            onAllAnswered?.();
        }
    };

    const allAnswered = Object.keys(answers).length === questions.length;

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{title.split(':')[0]}</CardTitle>
                <CardDescription>{title.split(': ').slice(1).join(': ')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {questions.map((q, index) => (
                    <div key={q.id}>
                        <p className="font-semibold mb-4">{index + 1}. {q.text}</p>
                        <RadioGroup
                            value={answers[q.id]?.toString()}
                            onValueChange={(value) => handleValueChange(q.id, value)}
                            className="flex flex-col sm:flex-row sm:flex-wrap gap-4"
                        >
                            {answerOptions.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={opt.value.toString()} id={`${q.id}-${opt.value}`} />
                                    <Label htmlFor={`${q.id}-${opt.value}`}>{opt.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                ))}
                {onAllAnswered && (
                     <Button onClick={onAllAnswered} disabled={!allAnswered} className="w-full mt-8">
                        View Results
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
