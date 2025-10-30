import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, ArrowRight } from 'lucide-react';

export default function WeeklyReportSummary() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Your Weekly Report</CardTitle>
        <CardDescription>Review your mood and activity from the past week.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center text-center">
        <BarChart3 className="w-16 h-16 text-primary mb-4" />
        <p className="text-muted-foreground mb-6">Your summary is ready to view.</p>
        <Link href="/reports" passHref legacyBehavior>
          <Button asChild>
            <a>
              View Progress Chart <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
