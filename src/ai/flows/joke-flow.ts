'use server';
/**
 * @fileOverview A Genkit flow for generating short, interesting jokes.
 *
 * - generateJoke - A function that returns a joke.
 * - JokeOutput - The return type for the generateJoke function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JokeOutputSchema = z.object({
  joke: z.string().describe('A short, witty, and interesting joke.'),
});
export type JokeOutput = z.infer<typeof JokeOutputSchema>;

export async function generateJoke(): Promise<JokeOutput> {
  return jokeFlow();
}

const prompt = ai.definePrompt({
  name: 'jokePrompt',
  output: {schema: JokeOutputSchema},
  prompt: `You are an AI that specializes in telling funny, short, and interesting jokes.
  Generate one joke that is light-hearted and safe for all audiences.
  The joke should be clever and maybe a little quirky.
  `,
});

const jokeFlow = ai.defineFlow(
  {
    name: 'jokeFlow',
    outputSchema: JokeOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
