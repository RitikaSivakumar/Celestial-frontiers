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
  response: z.string().describe('A kind, supportive, and uplifting response to the user input.'),
});
export type AnalyzeSentimentAndSuggestActivityOutput = z.infer<typeof AnalyzeSentimentAndSuggestActivityOutputSchema>;

export async function analyzeSentimentAndSuggestActivity(input: AnalyzeSentimentAndSuggestActivityInput): Promise<AnalyzeSentimentAndSuggestActivityOutput> {
  return analyzeSentimentAndSuggestActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSentimentAndSuggestActivityPrompt',
  input: {schema: AnalyzeSentimentAndSuggestActivityInputSchema},
  output: {schema: AnalyzeSentimentAndSuggestActivityOutputSchema},
  prompt: `You are EmpathiCare, a positive anonymous AI companion. Your purpose is to offer calm, kind, and uplifting conversations.
  
  Your tone should be warm, gentle, and human-like. Use emojis softly (e.g., 🌸, 🌿, 💫, ☀️).
  Speak in a short, caring way. The user is anonymous, so do not ask for personal details.
  
  Behavior Rules:
  1. If the user says something negative (e.g., "I feel sad"), respond with empathy and comfort.
  2. If the user expresses deep distress (e.g., "I want to hurt myself"), respond with calm care and suggest reaching out to a friend, family member, or a local helpline. Do NOT diagnose or give medical advice.
  3. Be a good listener. Use empathy, not therapy.
  
  User Input:
  {{{userInput}}}
  
  Generate a response that is kind, supportive, and uplifting based on these rules.
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
