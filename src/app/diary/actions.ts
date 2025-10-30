
'use server';

import {promises as fs} from 'fs';
import path from 'path';

type DiaryEntry = {
  entry: string;
  date: string;
};

const filePath = path.join(process.cwd(), 'src/lib/diary-entries.json');

async function readEntries(): Promise<DiaryEntry[]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // If file doesn't exist or is empty, return empty array
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return [];
        }
        console.error('Error reading diary entries:', error);
        return [];
    }
}

export async function getDiaryEntries(): Promise<DiaryEntry[]> {
    const entries = await readEntries();
    // Return entries sorted by date, newest first
    return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getDiaryEntriesForBackup(): Promise<DiaryEntry[]> {
    return readEntries();
}

export async function saveDiaryEntry(entry: string) {
  try {
    const entries = await readEntries();

    const newEntry: DiaryEntry = {
      entry,
      date: new Date().toISOString(),
    };

    entries.push(newEntry);

    await fs.writeFile(filePath, JSON.stringify(entries, null, 2), 'utf-8');

    return {success: true};
  } catch (error) {
    console.error('Error saving diary entry:', error);
    return {success: false, error: 'Failed to save entry.'};
  }
}
