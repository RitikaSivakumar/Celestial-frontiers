'use server';
/**
 * @fileOverview AI-powered sentiment analysis and activity suggestion.
 *
 * - analyzeSentimentAndSuggestActivity - Analyzes user input for sentiment and suggests an activity.
 * - AnalyzeSentimentInput - The input type for the function.
 * - AnalyzeSentimentOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeSentimentInputSchema = z.object({
  userInput: z.string().describe('The user\'s text input to be analyzed.'),
});
export type AnalyzeSentimentInput = z.infer<typeof AnalyzeSentimentInputSchema>;

const AnalyzeSentimentOutputSchema = z.object({
  response: z.string().describe('The AI-generated response and activity suggestion.'),
});
export type AnalyzeSentimentOutput = z.infer<typeof AnalyzeSentimentOutputSchema>;

export async function analyzeSentimentAndSuggestActivity(
  input: AnalyzeSentimentInput
): Promise<AnalyzeSentimentOutput> {
  return analyzeSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSentimentPrompt',
  input: { schema: AnalyzeSentimentInputSchema },
  output: { schema: AnalyzeSentimentOutputSchema },
  prompt: `You are an empathetic AI companion named EmpathiCare.
  Your goal is to understand the user's feelings and provide a supportive response.
  Analyze the user's input and respond in a gentle, caring tone.
  If the user seems distressed, suggest a simple, calming activity.

  User Input: {{{userInput}}}

  Based on the input, provide a supportive response.
  `,
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: AnalyzeSentimentInputSchema,
    outputSchema: AnalyzeSentimentOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
