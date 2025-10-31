
"use client"

import { useMemo, useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getDaysInMonth, format } from 'date-fns';
import type { Medication } from "@/components/dashboard/MedicationReminders";

const getMedicationsFromStorage = (): Medication[] => {
    if (typeof window === 'undefined') return [];
    const storedMeds = localStorage.getItem('medications');
    return storedMeds ? JSON.parse(storedMeds) : [];
};

const getChartData = (medications: Medication[]) => {
    const today = new Date();
    const daysInMonth = getDaysInMonth(today);
    const monthName = format(today, 'MMMM yyyy');

    const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = new Date(today.getFullYear(), today.getMonth(), day);
        
        // This is a mock-up, in a real app you'd check historical data.
        // For this example, let's simulate adherence.
        const totalMeds = medications.length;
        if(totalMeds === 0) return { day: day.toString(), taken: 0, total: 0 };
        
        // Simulate some missed days for realism
        const takenCount = Math.round(Math.random() * totalMeds);

        return {
            day: day.toString(),
            taken: takenCount,
            total: totalMeds,
        }
    });

    return { data: dailyData, monthName };
};


export function MedicationChart() {
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    setMedications(getMedicationsFromStorage());
  }, []);

  const { data: chartData, monthName } = useMemo(() => getChartData(medications), [medications]);
  
  const chartConfig = {
    taken: {
        label: "Taken",
        color: "hsl(var(--chart-2))",
    },
    total: {
        label: "Total",
        color: "hsl(var(--muted))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Medication Adherence</CardTitle>
        <CardDescription>{monthName}</CardDescription>
      </CardHeader>
      <CardContent>
        {medications.length > 0 ? (
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart 
                accessibilityLayer 
                data={chartData}
                margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    label="Day of Month"
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                />
                <Bar 
                    dataKey="total" 
                    stackId="a"
                    fill="var(--color-total)" 
                    radius={[4, 4, 0, 0]}
                />
                <Bar 
                    dataKey="taken" 
                    stackId="a"
                    fill="var(--color-taken)"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
            </ChartContainer>
        ) : (
             <div className="text-center text-muted-foreground p-8">
                <p>No medication data to display.</p>
                <p className="text-sm">Add medications in the dashboard to track your adherence.</p>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
