'use server';
/**
 * @fileOverview An AI flow for early disease detection analysis based on user-provided symptoms.
 *
 * - analyzeSymptoms - Analyzes symptoms for potential health issues and provides recommendations.
 * - AnalyzeSymptomsInput - The input type for the analyzeSymptoms function.
 * - AnalyzeSymptomsOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSymptomsInputSchema = z.object({
  symptoms: z.string().describe('A description of the user\'s symptoms.'),
});
export type AnalyzeSymptomsInput = z.infer<typeof AnalyzeSymptomsInputSchema>;

const AnalyzeSymptomsOutputSchema = z.object({
  analysis: z
    .string()
    .describe('A brief, non-diagnostic analysis of potential health concerns based on the symptoms.'),
  recommendation: z
    .string()
    .describe('A clear recommendation for the user to consult a healthcare professional.'),
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

export async function analyzeSymptoms(input: AnalyzeSymptomsInput): Promise<AnalyzeSymptomsOutput> {
  return analyzeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSymptomsPrompt',
  input: {schema: AnalyzeSymptomsInputSchema},
  output: {schema: AnalyzeSymptomsOutputSchema},
  prompt: `You are an AI assistant for a mental and physical wellness app. Your role is to analyze a user's description of their symptoms and provide a potential, non-diagnostic analysis.

IMPORTANT: You are not a doctor. You MUST NOT provide a medical diagnosis. Your primary goal is to encourage the user to seek professional medical advice.

Analyze the following symptoms:
"{{{symptoms}}}"

Based on the symptoms, provide a brief analysis of what general health areas might be of concern (e.g., "This could be related to cardiovascular health," or "These symptoms are often associated with inflammatory responses.").

Then, provide a clear and direct recommendation for the user to see a doctor. Frame it as a helpful suggestion for their wellbeing.

Example Output:
analysis: "The described symptoms like chest tightness and shortness of breath can be related to cardiovascular or respiratory health. It's important to get this checked."
recommendation: "Based on your entry, it would be a good idea to schedule an appointment with your doctor to discuss these symptoms."
`,
});

const analyzeSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeSymptomsFlow',
    inputSchema: AnalyzeSymptomsInputSchema,
    outputSchema: AnalyzeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
