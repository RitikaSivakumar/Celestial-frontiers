
'use server';
/**
 * @fileOverview An AI flow for analyzing an audio recording to determine mood from tone and content.
 *
 * - analyzeAudio - Analyzes an audio data URI for transcription and mood.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export async function analyzeAudio(
  input: { audioDataUri: string }
): Promise<{ transcription: string; mood: string; }> {
  
  const AnalyzeAudioInputSchema = z.object({
    audioDataUri: z
      .string()
      .describe(
        "A chunk of audio as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      ),
  });

  const AnalyzeAudioOutputSchema = z.object({
    transcription: z.string().describe('The transcription of the audio.'),
    mood: z
      .string()
      .describe(
        'The inferred mood from the tone and content of the audio (e.g., Happy, Sad, Anxious, Calm).'
      ),
  });

  const analyzeAudioFlow = ai.defineFlow(
    {
      name: 'analyzeAudioFlow',
      inputSchema: AnalyzeAudioInputSchema,
      outputSchema: AnalyzeAudioOutputSchema,
    },
    async ({ audioDataUri }) => {
      const { output } = await ai.generate({
        prompt: [
          {
            text: `You are an expert in analyzing audio for emotional tone.
            Transcribe the following audio and determine the speaker's primary mood.
            Consider the pace, pitch, and energy in the voice.
            The mood should be a single word like Happy, Sad, Anxious, or Calm.`,
          },
          { media: { url: audioDataUri } },
        ],
        output: {
          schema: AnalyzeAudioOutputSchema,
        },
      });

      return output!;
    }
  );

  return analyzeAudioFlow(input);
}
