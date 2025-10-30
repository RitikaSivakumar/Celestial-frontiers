import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import MoodTracker from "@/components/dashboard/MoodTracker";
import RoutineBuilder from "@/components/dashboard/RoutineBuilder";
import WeeklyReportSummary from "@/components/dashboard/WeeklyReportSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Gamepad2, Headphones } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-8 space-y-8">
        <WelcomeHeader />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <MoodTracker />
            <RoutineBuilder />
          </div>
          <div className="space-y-8">
            <WeeklyReportSummary />
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Relaxation Activities</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Link href="/games" passHref>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Gamepad2 className="w-6 h-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Quick Games</h3>
                                <p className="text-sm text-muted-foreground">Unwind with a fun game.</p>
                            </div>
                        </div>
                    </Link>
                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                        <Book className="w-6 h-6 text-primary"/>
                        <div>
                            <h3 className="font-semibold">Guided Journaling</h3>
                            <p className="text-sm text-muted-foreground">Reflect on your day.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                        <Headphones className="w-6 h-6 text-primary"/>
                        <div>
                            <h3 className="font-semibold">Soothing Music</h3>
                            <p className="text-sm text-muted-foreground">Listen to calming tunes.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
