
'use client';

import { useState } from 'react';
import { patients as allPatients, type Patient } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import AddSessionModal from './AddSessionModal';

type PatientListProps = {
    doctorId: number;
}

const getScoreSeverity = (score: number, type: 'phq9' | 'gad7') => {
    if (type === 'phq9') {
        if (score >= 20) return { label: 'Severe', color: 'bg-red-500' };
        if (score >= 15) return { label: 'Mod. Severe', color: 'bg-red-400' };
        if (score >= 10) return { label: 'Moderate', color: 'bg-orange-400' };
        if (score >= 5) return { label: 'Mild', color: 'bg-yellow-400' };
        return { label: 'Minimal', color: 'bg-green-400' };
    }
    // GAD-7
    if (score >= 15) return { label: 'Severe', color: 'bg-red-500' };
    if (score >= 10) return { label: 'Moderate', color: 'bg-orange-400' };
    if (score >= 5) return { label: 'Mild', color: 'bg-yellow-400' };
    return { label: 'Minimal', color: 'bg-green-400' };
}

export default function PatientList({ doctorId }: PatientListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const patients = allPatients.filter(p => p.doctorId === doctorId);

    const handleSessionAdded = (session: { patient: string, date: Date, notes: string }) => {
        // In a real app, you would refetch data or update the state
        console.log("New session added:", session);
        setIsModalOpen(false);
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline">Patient Overview</CardTitle>
                        <CardDescription>Click on a patient to view session history or add a new session.</CardDescription>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <PlusCircle className="mr-2" />
                        Add Session
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Last Check-in</TableHead>
                                <TableHead>PHQ-9</TableHead>
                                <TableHead>GAD-7</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.map(patient => {
                                const phq9Severity = getScoreSeverity(patient.phq9, 'phq9');
                                const gad7Severity = getScoreSeverity(patient.gad7, 'gad7');

                                return (
                                    <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                                        <TableCell className="font-medium">{patient.name}</TableCell>
                                        <TableCell>{patient.lastCheckin}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="flex items-center gap-2">
                                                <span className={cn("h-2 w-2 rounded-full", phq9Severity.color)}></span>
                                                <span>{patient.phq9} ({phq9Severity.label})</span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="flex items-center gap-2">
                                                <span className={cn("h-2 w-2 rounded-full", gad7Severity.color)}></span>
                                                <span>{patient.gad7} ({gad7Severity.label})</span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">View History</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    {patients.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No patients assigned to you at the moment.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            <AddSessionModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                patients={patients}
                onSessionAdded={handleSessionAdded}
                doctorId={doctorId}
            />
        </>
    )
}
