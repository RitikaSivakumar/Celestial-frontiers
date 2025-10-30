
import { PlaceHolderImages } from './placeholder-images';

export type Patient = {
  id: number;
  name: string;
  lastCheckin: string;
  phq9: number;
  gad7: number;
  doctorId: number;
};

export const sevenDayPlan = [
  { day: 'Day 1', task: 'Mindful Breathing', completed: true },
  { day: 'Day 2', task: 'Light Movement', completed: true },
  { day: 'Day 3', task: 'Connect with Nature', completed: false },
  { day: 'Day 4', task: 'Practice Gratitude', completed: false },
  { day: 'Day 5', task: 'Deep Relaxation', completed: false },
  { day: 'Day 6', task: 'Creative Expression', completed: false },
  { day: 'Day 7', task: 'Reflect and Plan', completed: false },
];

export const medications = [
  { id: 1, name: 'Vitamin D', dosage: '1 tablet', time: '9:00 AM', taken: true },
  { id: 2, name: 'Lisinopril', dosage: '10mg', time: '9:00 AM', taken: false },
  { id: 3, name: 'Metformin', dosage: '500mg', time: '8:00 PM', taken: false },
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Prasheetha',
    specialty: 'Clinical Psychologist',
    description: 'Dr. Prasheetha specializes in cognitive-behavioral therapy and holds the "Excellence in Empathy" award. She has over 10 years of experience helping patients with anxiety and depression.',
    avatar: PlaceHolderImages.find(img => img.id === 'doctor-1')?.imageUrl || '',
    avatarHint: PlaceHolderImages.find(img => img.id === 'doctor-1')?.imageHint || '',
    phone: '9080905858',
  },
  {
    id: 2,
    name: 'Dr. Srija',
    specialty: 'Psychiatrist',
    description: 'Dr. Srija focuses on holistic mental health, combining medication management with mindfulness practices. She is a recipient of the "Holistic Healer" prize for her innovative care.',
    avatar: PlaceHolderImages.find(img => img.id === 'doctor-2')?.imageUrl || '',
    avatarHint: PlaceHolderImages.find(img => img.id === 'doctor-2')?.imageHint || '',
    phone: '6384020021',
  },
  {
    id: 3,
    name: 'Dr. Vibhu',
    specialty: 'Licensed Counselor',
    description: 'Dr. Vibhu is a compassionate counselor recognized with the "Community Wellness" award. He provides a safe space for individuals to explore their feelings and develop coping strategies.',
    avatar: PlaceHolderImages.find(img => img.id === 'doctor-3')?.imageUrl || '',
    avatarHint: PlaceHolderImages.find(img => img.id === 'doctor-3')?.imageHint || '',
    phone: '9842894422',
  },
];

export const patients: Patient[] = [
    { id: 1, name: 'Alex Johnson', lastCheckin: '2 days ago', phq9: 12, gad7: 9, doctorId: 1 },
    { id: 2, name: 'Maria Garcia', lastCheckin: '5 days ago', phq9: 18, gad7: 15, doctorId: 1 },
    { id: 3, name: 'Sameer Khan', lastCheckin: '1 day ago', phq9: 7, gad7: 5, doctorId: 2 },
    { id: 4, name: 'Chen Wei', lastCheckin: '1 week ago', phq9: 22, gad7: 18, doctorId: 3 },
    { id: 5, name: 'Fatima Al-Sayed', lastCheckin: '3 days ago', phq9: 10, gad7: 11, doctorId: 2 },
];


export const weeklyMoodData = [
  { day: 'Mon', mood: 2 },
  { day: 'Tue', mood: 3 },
  { day: 'Wed', mood: 1 },
  { day: 'Thu', mood: 2 },
  { day: 'Fri', mood: 3 },
  { day: 'Sat', mood: 3 },
  { day: 'Sun', mood: 2 },
];
