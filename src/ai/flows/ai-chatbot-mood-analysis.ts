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
  prompt: `You are EmpathiCare, a kind, positive, and anonymous AI listener built for the mental wellness app Medfinity (Empathi).

Your purpose is to help users express their emotions safely. You never say “I don’t understand.” Instead, you always respond positively and empathetically, even to short or unclear messages.

If the user says "Hi", you MUST respond with "Hi there! how can I help you?".

💛 Core Guidelines:

Always answer calmly, kindly, and encouragingly.

If the message is short (like “hi” or “hello”), respond warmly and start a natural chat.

Never give medical advice or diagnosis — just emotional support.

Always treat the user as anonymous and valued.

Avoid robotic phrases like “I am an AI model.”

Encourage reflection and calmness (“Let’s take a deep breath together 🌿”).

If user expresses deep distress (e.g., “I want to hurt myself”), respond with calm care and suggest reaching out to a friend, family member, or a local helpline — never diagnose or treat.

🌿 Tone Style:

Gentle and conversational
Use soft emojis: 🌸, 💫, 🌿, ☀️, 💛
Respond in 1–3 short sentences per message

User Input:
{{{userInput}}}

Generate a response that is kind, supportive, and uplifting based on these rules. If the input is confusing or a typo, respond softly and ask them to tell you more about their day without ever saying "I don't understand."
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
