
'use server';
/**
 * @fileOverview An AI agent that can generate a personalized news briefing.
 *
 * - generateBriefing - A function that handles the briefing generation.
 * - BriefingInput - The input type for the generateBriefing function.
 * - BriefingOutput - The return type for the generateBriefing function.
 */

import { ai } from '@/ai/genkit';
import { articles } from '@/lib/data';
import type { Article } from '@/lib/types';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import { toWav } from '@/ai/audio-utils';

const BriefingInputSchema = z.object({
  topics: z.array(z.string()).describe('A list of topics to include in the briefing.'),
  voice: z.string().describe('The voice to use for the audio generation.'),
});
export type BriefingInput = z.infer<typeof BriefingInputSchema>;

const BriefingOutputSchema = z.object({
  script: z.string().describe('The text script of the news briefing.'),
  audio: z.string().describe('The base64 encoded WAV audio data URI.'),
});
export type BriefingOutput = z.infer<typeof BriefingOutputSchema>;

export async function generateBriefing(input: BriefingInput): Promise<BriefingOutput> {
  return briefingFlow(input);
}

const briefingFlow = ai.defineFlow(
    {
        name: 'briefingFlow',
        inputSchema: BriefingInputSchema,
        outputSchema: BriefingOutputSchema,
    },
    async ({ topics, voice }) => {
        // 1. Filter articles based on selected topics
        const relevantArticles = articles.filter(article => topics.includes(article.category));

        // 2. Generate a script using an LLM
        const scriptPrompt = ai.definePrompt({
            name: 'briefingScriptPrompt',
            prompt: `You are a news anchor. Create a concise and engaging news briefing script based on the following articles. Summarize the key points of each article.

Articles:
{{#each articles}}
- Title: {{{this.title}}}, Excerpt: {{{this.excerpt}}}
{{/each}}

Keep the briefing short and to the point. Start with a friendly greeting.
`,
        });

        const { text } = await ai.generate({
          prompt: scriptPrompt.prompt,
          context: {
            articles: relevantArticles,
          },
          config: {
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_HATE_SPEECH',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                },
                {
                    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                },
                {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                },
                {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                },
              ],
          }
        });

        const script = text || "Sorry, I couldn't generate a briefing at this time.";

        // 3. Generate audio from the script
        const { media } = await ai.generate({
            model: googleAI.model('gemini-2.5-flash-preview-tts'),
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voice },
                    },
                },
                safetySettings: [
                    {
                        category: 'HARM_CATEGORY_HATE_SPEECH',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                    },
                    {
                        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                    },
                    {
                        category: 'HARM_CATEGORY_HARASSMENT',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                    },
                    {
                        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
                    },
                ],
            },
            prompt: script,
        });

        if (!media) {
            throw new Error('No media returned from TTS model');
        }

        const audioBuffer = Buffer.from(
            media.url.substring(media.url.indexOf(',') + 1),
            'base64'
        );
        
        const wavData = await toWav(audioBuffer);

        return {
            script,
            audio: 'data:audio/wav;base64,' + wavData,
        };
    }
);
