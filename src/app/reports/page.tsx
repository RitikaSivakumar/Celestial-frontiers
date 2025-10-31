
'use client';

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MoodChart } from "@/components/reports/MoodChart";
import { MedicationChart } from "@/components/reports/MedicationChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ReportsPage() {
  const moodChartRef = useRef<HTMLDivElement>(null);
  const medChartRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownload = async (chartRef: React.RefObject<HTMLDivElement>, fileName: string) => {
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
             backgroundColor: null, 
             scale: 2 
        });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(fileName);

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
          <h1 className="text-4xl font-headline">Wellness Reports</h1>
          <p className="text-muted-foreground mt-2">Track your mood and medication adherence.</p>
        </div>
      </div>

       <Tabs defaultValue="mood" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mood">Mood Report</TabsTrigger>
                <TabsTrigger value="medication">Medication Report</TabsTrigger>
            </TabsList>
            <TabsContent value="mood">
                <div className="mt-6">
                    <Button onClick={() => handleDownload(moodChartRef, "mood-report.pdf")}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Mood Report
                    </Button>
                </div>
                <div ref={moodChartRef} className="mt-4">
                    <MoodChart />
                </div>
            </TabsContent>
            <TabsContent value="medication">
                 <div className="mt-6">
                    <Button onClick={() => handleDownload(medChartRef, "medication-report.pdf")}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Medication Report
                    </Button>
                </div>
                <div ref={medChartRef} className="mt-4">
                    <MedicationChart />
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
