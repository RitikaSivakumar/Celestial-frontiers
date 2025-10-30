"use client"

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
import { weeklyMoodData } from "@/lib/mock-data"

const chartConfig = {
  mood: {
    label: "Mood",
  },
}

const moodLabels: { [key: number]: string } = {
  1: "Sad",
  2: "Neutral",
  3: "Happy",
}

export function MoodChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Mood Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart 
            accessibilityLayer 
            data={weeklyMoodData}
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
            />
            <YAxis
              tickFormatter={(value) => moodLabels[value] || ''}
              domain={[0, 4]}
              ticks={[1, 2, 3]}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => moodLabels[value as number]}
                />
              }
            />
            <Bar 
                dataKey="mood" 
                fill="var(--color-mood)" 
                radius={4}
                className="fill-primary"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
