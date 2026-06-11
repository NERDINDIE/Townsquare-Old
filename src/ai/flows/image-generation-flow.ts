
'use server';
/**
 * @fileOverview An AI agent that can generate images from a text prompt.
 *
 * - generateImage - A function that handles the image generation.
 * - ImageGenerationInput - The input type for the generateImage function.
 * - ImageGenerationOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ImageGenerationInputSchema = z.object({
    prompt: z.string().describe('A detailed text description of the image to generate.'),
});
export type ImageGenerationInput = z.infer<typeof ImageGenerationInputSchema>;

const ImageGenerationOutputSchema = z.object({
    imageUrl: z.string().url().describe("The data URI of the generated image."),
});
export type ImageGenerationOutput = z.infer<typeof ImageGenerationOutputSchema>;

export async function generateImage(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
    return imageGenerationFlow(input);
}

const imageGenerationFlow = ai.defineFlow(
    {
        name: 'imageGenerationFlow',
        inputSchema: ImageGenerationInputSchema,
        outputSchema: ImageGenerationOutputSchema,
    },
    async ({ prompt }) => {
        const { media } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: prompt,
            config: {
                responseModalities: ['TEXT', 'IMAGE'],
            },
        });

        return {
            imageUrl: media?.url ?? '',
        };
    }
);
