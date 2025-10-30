'use server';

import {promises as fs} from 'fs';
import path from 'path';

type DiaryEntry = {
  entry: string;
  date: string;
};

const filePath = path.join(process.cwd(), 'src/lib/diary-entries.json');

export async function saveDiaryEntry(entry: string) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const entries: DiaryEntry[] = JSON.parse(fileContent);

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
