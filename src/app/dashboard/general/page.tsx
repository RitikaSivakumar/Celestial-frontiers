
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import MoodTracker from "@/components/dashboard/MoodTracker";
import RoutineBuilder from "@/components/dashboard/RoutineBuilder";
import MedicationReminders from "@/components/dashboard/MedicationReminders";
import WeeklyReportSummary from "@/components/dashboard/WeeklyReportSummary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";

export default function GeneralDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-8 space-y-8">
        <WelcomeHeader />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <MoodTracker />
            <MedicationReminders />
          </div>
          <div className="flex flex-col gap-8">
            <RoutineBuilder />
            <WeeklyReportSummary />
          </div>
        </div>
        <Card className="hover:shadow-lg transition-shadow">
          <Link href="/peer-support" passHref>
            <div className="flex items-center gap-4 p-6 cursor-pointer">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-headline text-xl">Peer-to-Peer Support</h3>
                <p className="text-muted-foreground">
                  Connect with others, share experiences, and find support in a safe community.
                </p>
              </div>
            </div>
          </Link>
        </Card>
      </main>
    </div>
  );
}
