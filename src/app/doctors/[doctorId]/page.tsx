
import { doctors } from '@/lib/mock-data';
import PatientList from '@/components/doctor/PatientList';
import { notFound } from 'next/navigation';

export default function DoctorDashboardPage({ params }: { params: { doctorId: string } }) {
    const doctorId = parseInt(params.doctorId, 10);
    const doctor = doctors.find(d => d.id === doctorId);

    if (!doctor) {
        notFound();
    }

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-headline">Dr. {doctor.name}'s Dashboard</h1>
                <p className="text-muted-foreground mt-2">Your assigned patients for today.</p>
            </header>
            
            <PatientList doctorId={doctorId} />
        </div>
    );
}
