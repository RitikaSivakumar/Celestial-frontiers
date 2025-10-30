'use server';
/**
 * @fileOverview An AI chatbot for analyzing user sentiment and suggesting activities.
 *
 * - analyzeSentimentAndSuggestActivity - A function that handles the sentiment analysis and activity suggestion process.
 * - AnalyzeSentimentAndSuggestActivityInput - The input type for the analyzeSentimentAndSuggestActivity function.
 * - AnalyzeSentimentAndSuggestActivityOutput - The return type for the analyzeSentimentAndSuggestActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSentimentAndSuggestActivityInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input, either text or voice note, to be analyzed.'),
});
export type AnalyzeSentimentAndSuggestActivityInput = z.infer<typeof AnalyzeSentimentAndSuggestActivityInputSchema>;

const AnalyzeSentimentAndSuggestActivityOutputSchema = z.object({
  sentiment: z.string().describe('The sentiment of the user input (e.g., positive, negative, neutral).'),
  suggestedActivity: z.string().describe('A suggested activity based on the sentiment (e.g., breathing exercise, journaling, connect with doctor).'),
});
export type AnalyzeSentimentAndSuggestActivityOutput = z.infer<typeof AnalyzeSentimentAndSuggestActivityOutputSchema>;

export async function analyzeSentimentAndSuggestActivity(input: AnalyzeSentimentAndSuggestActivityInput): Promise<AnalyzeSentimentAndSuggestActivityOutput> {
  return analyzeSentimentAndSuggestActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSentimentAndSuggestActivityPrompt',
  input: {schema: AnalyzeSentimentAndSuggestActivityInputSchema},
  output: {schema: AnalyzeSentimentAndSuggestActivityOutputSchema},
  prompt: `You are an AI chatbot designed to analyze user sentiment and suggest relevant activities.

Analyze the sentiment of the following user input:

{{userInput}}

Based on the sentiment, suggest an activity that can help the user manage their emotional state. The activity could be a breathing exercise, a journaling prompt, or a suggestion to connect with a doctor or caregiver. Return the sentiment and suggested activity in JSON format.

Example Output:
{
  "sentiment": "negative",
  "suggestedActivity": "Consider connecting with a doctor or caregiver to discuss your feelings."
}
`,
});

const analyzeSentimentAndSuggestActivityFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentAndSuggestActivityFlow',
    inputSchema: AnalyzeSentimentAndSuggestActivityInputSchema,
    outputSchema: AnalyzeSentimentAndSuggestActivityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
