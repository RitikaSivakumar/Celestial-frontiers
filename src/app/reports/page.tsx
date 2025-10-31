
'use client';

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MoodChart } from "@/components/reports/MoodChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export default function ReportsPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownload = async () => {
    const chartElement = chartRef.current;
    if (!chartElement) {
        toast({
            title: "Error",
            description: "Could not find chart to download.",
            variant: "destructive"
        });
        return;
    }
    
    toast({
        title: "Generating PDF...",
        description: "Your report is being prepared for download."
    });

    try {
        const canvas = await html2canvas(chartElement, {
             backgroundColor: null, // Use transparent background
             scale: 2 // Increase resolution
        });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save("weekly-emotion-report.pdf");

    } catch (error) {
        console.error("Error generating PDF:", error);
        toast({
            title: "PDF Generation Failed",
            description: "Sorry, there was an issue creating your report.",
            variant: "destructive"
        });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-headline">Weekly Emotion Report</h1>
          <p className="text-muted-foreground mt-2">Here's a look at your mood trends for this week.</p>
        </div>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
      </div>
      <div ref={chartRef}>
        <MoodChart />
      </div>
    </div>
  );
}
