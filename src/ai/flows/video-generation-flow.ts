
'use server';
/**
 * @fileOverview An AI agent that can generate videos from a text prompt.
 *
 * - generateVideo - A function that handles the video generation.
 * - VideoGenerationInput - The input type for the generateVideo function.
 * - VideoGenerationOutput - The return type for the generateVideo function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

const VideoGenerationInputSchema = z.object({
    prompt: z.string().describe('A detailed text description of the video to generate.'),
});
export type VideoGenerationInput = z.infer<typeof VideoGenerationInputSchema>;

const VideoGenerationOutputSchema = z.object({
    videoUrl: z.string().describe("The data URI of the generated video."),
});
export type VideoGenerationOutput = z.infer<typeof VideoGenerationOutputSchema>;

export async function generateVideo(input: VideoGenerationInput): Promise<VideoGenerationOutput> {
    return videoGenerationFlow(input);
}

const videoGenerationFlow = ai.defineFlow(
    {
        name: 'videoGenerationFlow',
        inputSchema: VideoGenerationInputSchema,
        outputSchema: VideoGenerationOutputSchema,
    },
    async ({ prompt }) => {
        let { operation } = await ai.generate({
            model: googleAI.model('veo-2.0-generate-001'),
            prompt: prompt,
            config: {
                durationSeconds: 5,
                aspectRatio: '16:9',
            },
        });

        if (!operation) {
            throw new Error('Expected the model to return an operation');
        }

        // Wait until the operation completes.
        while (!operation.done) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            operation = await ai.checkOperation(operation);
        }

        if (operation.error) {
            throw new Error('Failed to generate video: ' + operation.error.message);
        }

        const video = operation.output?.message?.content.find((p) => p.media && p.media.contentType === 'video/mp4');
        if (!video || !video.media) {
            throw new Error('Failed to find the generated video in the operation result.');
        }

        // The URL from Veo is temporary and needs to be fetched and converted to a data URI
        const fetch = (await import('node-fetch')).default;
        const videoDownloadResponse = await fetch(
            `${video.media.url}&key=${process.env.GEMINI_API_KEY}`
        );

        if (!videoDownloadResponse.ok || !videoDownloadResponse.body) {
            throw new Error(`Failed to download video: ${videoDownloadResponse.statusText}`);
        }
        
        const videoBuffer = await videoDownloadResponse.arrayBuffer();
        const base64Video = Buffer.from(videoBuffer).toString('base64');
        
        return {
            videoUrl: `data:video/mp4;base64,${base64Video}`,
        };
    }
);
