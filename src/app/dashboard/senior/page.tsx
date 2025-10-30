import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import MoodTracker from "@/components/dashboard/MoodTracker";
import RoutineBuilder from "@/components/dashboard/RoutineBuilder";
import MedicationReminders from "@/components/dashboard/MedicationReminders";
import WeeklyReportSummary from "@/components/dashboard/WeeklyReportSummary";

export default function SeniorDashboard() {
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
      </main>
    </div>
  );
}
