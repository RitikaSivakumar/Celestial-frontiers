import { MoodChart } from "@/components/reports/MoodChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-headline">Weekly Emotion Report</h1>
          <p className="text-muted-foreground mt-2">Here's a look at your mood trends for this week.</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
      </div>
      <MoodChart />
    </div>
  );
}
