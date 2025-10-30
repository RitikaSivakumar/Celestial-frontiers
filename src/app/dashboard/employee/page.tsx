
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import MoodTracker from "@/components/dashboard/MoodTracker";
import RoutineBuilder from "@/components/dashboard/RoutineBuilder";
import WeeklyReportSummary from "@/components/dashboard/WeeklyReportSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Gamepad2, Users } from "lucide-react";
import Link from "next/link";
import SoothingSongs from "@/components/dashboard/SoothingSongs";

export default function EmployeeDashboard() {
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
                    <CardTitle className="font-headline">Mindfulness Activities</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Link href="/breathing" passHref>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Wind className="w-6 h-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Breathing Rhythm</h3>
                                <p className="text-sm text-muted-foreground">Sync your breath, find your calm.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/games" passHref>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Gamepad2 className="w-6 h-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Relaxation Games</h3>
                                <p className="text-sm text-muted-foreground">Unwind with a quick game.</p>
                            </div>
                        </div>
                    </Link>
                     <Link href="/peer-support" passHref>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Users className="w-6 h-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Peer Support</h3>
                                <p className="text-sm text-muted-foreground">Connect with the community.</p>
                            </div>
                        </div>
                    </Link>
                    <SoothingSongs />
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
