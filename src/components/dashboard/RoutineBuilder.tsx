'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { sevenDayPlan as initialPlan } from '@/lib/mock-data';

export default function RoutineBuilder() {
  const [plan, setPlan] = useState(initialPlan);

  const handleCheckChange = (day: string) => {
    setPlan(plan.map(item => 
      item.day === day ? { ...item, completed: !item.completed } : item
    ));
  };

  const progressValue = useMemo(() => {
    const completedCount = plan.filter(item => item.completed).length;
    return (completedCount / plan.length) * 100;
  }, [plan]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">7-Day Mind-Peace Plan</CardTitle>
        <CardDescription>Your weekly guide to mental wellness.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Progress value={progressValue} className="w-full" />
            <span className="text-sm font-medium text-muted-foreground">{Math.round(progressValue)}%</span>
          </div>
          <div className="space-y-3">
            {plan.map(item => (
              <div key={item.day} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={item.day}
                  checked={item.completed}
                  onCheckedChange={() => handleCheckChange(item.day)}
                />
                <label
                  htmlFor={item.day}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                >
                  <span className={`font-semibold ${item.completed ? 'line-through text-muted-foreground' : ''}`}>{item.day}:</span>
                  <span className={`ml-2 ${item.completed ? 'text-muted-foreground' : 'text-foreground'}`}>{item.task}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
