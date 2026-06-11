
'use server';
/**
 * @fileOverview An AI agent that can write a poem based on an image.
 *
 * - generatePoemFromImage - A function that handles the poem generation.
 * - PoemFromImageInput - The input type for the generatePoemFromImage function.
 * - PoemFromImageOutput - The return type for the generatePoemFromImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PoemFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo provided by the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  style: z.string().describe("The desired poetic style (e.g., 'Haiku', 'Sonnet', 'Free Verse')."),
});
export type PoemFromImageInput = z.infer<typeof PoemFromImageInputSchema>;

const PoemFromImageOutputSchema = z.object({
  poem: z.string().describe("The generated poem about the image."),
  title: z.string().describe("A fitting title for the poem."),
});
export type PoemFromImageOutput = z.infer<typeof PoemFromImageOutputSchema>;

export async function generatePoemFromImage(input: PoemFromImageInput): Promise<PoemFromImageOutput> {
  return poemFromImageFlow(input);
}

const prompt = ai.definePrompt({
    name: 'poemFromImagePrompt',
    input: { schema: PoemFromImageInputSchema },
    output: { schema: PoemFromImageOutputSchema },
    prompt: `You are a world-renowned poet. A user has provided you with an image and a desired poetic style. Your task is to write an original, evocative poem inspired by the image, in the requested style. Also, provide a title for your poem.

Image:
{{media url=photoDataUri}}

Poetic Style: {{{style}}}

Write a beautiful and insightful poem that captures the essence, mood, or story within the image.
`,
});


const poemFromImageFlow = ai.defineFlow(
  {
    name: 'poemFromImageFlow',
    inputSchema: PoemFromImageInputSchema,
    outputSchema: PoemFromImageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
