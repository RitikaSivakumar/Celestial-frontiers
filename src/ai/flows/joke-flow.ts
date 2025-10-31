
'use server';
/**
 * @fileOverview A Genkit flow for generating short, interesting jokes.
 *
 * - generateJoke - A function that returns a joke.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export async function generateJoke(): Promise<{ joke: string }> {
  const JokeOutputSchema = z.object({
    joke: z.string().describe('A short, witty, and interesting joke.'),
  });
  
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
  
  return jokeFlow();
}
