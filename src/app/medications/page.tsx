import MedicationReminders from "@/components/dashboard/MedicationReminders";

export default function MedicationsPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-headline mb-8">My Medications</h1>
      <MedicationReminders />
    </div>
  );
}
