
'use server';
/**
 * @fileOverview AI analysis of diary entries for emotional state and personalized support.
 *
 * - analyzeDiaryEntry - Analyzes diary entries for emotional state and offers support options.
 * - AnalyzeDiaryEntryInput - The input type for the analyzeDiaryEntry function.
 * - AnalyzeDiaryEntryOutput - The return type for the analyzeDiaryEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDiaryEntryInputSchema = z.object({
  diaryEntry: z.string().describe('The user diary entry to analyze.'),
});
export type AnalyzeDiaryEntryInput = z.infer<typeof AnalyzeDiaryEntryInputSchema>;

const AnalyzeDiaryEntryOutputSchema = z.object({
  emotionalState: z.string().describe('The inferred emotional state of the user.'),
  suggestedSupport: z.string().describe('Suggested support options for the user.'),
});
export type AnalyzeDiaryEntryOutput = z.infer<typeof AnalyzeDiaryEntryOutputSchema>;

export async function analyzeDiaryEntry(input: AnalyzeDiaryEntryInput): Promise<AnalyzeDiaryEntryOutput> {
  return analyzeDiaryEntryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDiaryEntryPrompt',
  input: {schema: AnalyzeDiaryEntryInputSchema},
  output: {schema: AnalyzeDiaryEntryOutputSchema},
  prompt: `You are an AI assistant specializing in mental wellness.
  Analyze the following diary entry to infer the user's emotional state.
  Based on the emotional state, suggest personalized support options such as self-care exercises or connecting with a doctor/caregiver.

  Diary Entry: {{{diaryEntry}}}

  Format your response as follows:
  emotionalState: <inferred emotional state>
  suggestedSupport: <suggested support options>
  `,
});

const analyzeDiaryEntryFlow = ai.defineFlow(
  {
    name: 'analyzeDiaryEntryFlow',
    inputSchema: AnalyzeDiaryEntryInputSchema,
    outputSchema: AnalyzeDiaryEntryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
