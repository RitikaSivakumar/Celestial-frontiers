
'use server';
/**
 * @fileOverview An AI flow for analyzing a video to determine mood from visual and audio cues.
 *
 * - analyzeVideo - Analyzes a video data URI for transcription and mood.
 * - AnalyzeVideoInput - The input type for the analyzeVideo function.
 * - AnalyzeVideoOutput - The return type for the analyzeVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A short video recording as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeVideoInput = z.infer<typeof AnalyzeVideoInputSchema>;

const AnalyzeVideoOutputSchema = z.object({
  transcription: z.string().describe('The transcription of the audio in the video.'),
  mood: z
    .string()
    .describe(
      'The inferred mood from visual cues (facial expressions, body language) and audio tone (e.g., Happy, Sad, Anxious, Tired).'
    ),
  observation: z.string().describe("A brief observation about the user's state based on the video."),
});
export type AnalyzeVideoOutput = z.infer<typeof AnalyzeVideoOutputSchema>;

export async function analyzeVideo(
  input: AnalyzeVideoInput
): Promise<AnalyzeVideoOutput> {
  return analyzeVideoFlow(input);
}

const analyzeVideoFlow = ai.defineFlow(
  {
    name: 'analyzeVideoFlow',
    inputSchema: AnalyzeVideoInputSchema,
    outputSchema: AnalyzeVideoOutputSchema,
  },
  async ({ videoDataUri }) => {
    const { output } = await ai.generate({
      prompt: [
        {
          text: `You are an expert empathetic observer.
          Analyze the following video to understand the user's emotional state.
          1. Transcribe the audio from the video.
          2. Determine the user's primary mood from their facial expression, body language, and tone of voice.
          3. Provide a short, gentle observation about what you see and hear.`,
        },
        { media: { url: videoDataUri } },
      ],
      output: {
        schema: AnalyzeVideoOutputSchema,
      },
    });

    return output!;
  }
);
