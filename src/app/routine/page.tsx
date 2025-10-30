import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";
import RoutineBuilder from "@/components/dashboard/RoutineBuilder";

export default function RoutinePage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-headline mb-8">My Routine</h1>
      <RoutineBuilder />
    </div>
  );
}
