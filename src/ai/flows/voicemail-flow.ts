
'use server';
/**
 * @fileOverview An AI agent that can generate a voicemail message.
 * 
 * - generateVoicemail - A function that handles the voicemail audio generation.
 * - VoicemailInput - The input type for the generateVoicemail function.
 * - VoicemailOutput - The return type for the generateVoicemail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';
import { toWav } from '@/ai/audio-utils';
import fs from 'fs/promises';
import path from 'path';

const VoicemailInputSchema = z.object({
  transcription: z.string().describe('The text content of the voicemail message.'),
  voice: z.enum(['Algenib', 'Achernar', 'Enif', 'Fomalhaut', 'Sirius']).describe('The voice to use for the message.'),
});
export type VoicemailInput = z.infer<typeof VoicemailInputSchema>;

const VoicemailOutputSchema = z.object({
  audio: z.string().describe("The base64 encoded WAV audio data URI of the full voicemail."),
});
export type VoicemailOutput = z.infer<typeof VoicemailOutputSchema>;

export async function generateVoicemail(input: VoicemailInput): Promise<VoicemailOutput> {
  return voicemailFlow(input);
}

const voicemailFlow = ai.defineFlow(
    {
        name: 'voicemailFlow',
        inputSchema: VoicemailInputSchema,
        outputSchema: VoicemailOutputSchema,
    },
    async ({ transcription, voice }) => {

        // Construct the full prompt for the TTS model, including SSML for the beep.
        const fullPrompt = `
Speaker1: <audio src="https://storage.googleapis.com/studioprompt-images/beep.wav"></audio>
Speaker2: ${transcription}`;
        
        // Generate audio from the script
        const { media } = await ai.generate({
            model: googleAI.model('gemini-2.5-flash-preview-tts'),
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    multiSpeakerVoiceConfig: {
                        speakerVoiceConfigs: [
                            {
                                speaker: 'Speaker1',
                                voiceConfig: {
                                    // Dummy voice for the beep, it won't be used for speech
                                    prebuiltVoiceConfig: { voiceName: 'Algenib' },
                                },
                            },
                            {
                                speaker: 'Speaker2',
                                voiceConfig: {
                                    prebuiltVoiceConfig: { voiceName: voice },
                                },
                            },
                        ],
                    },
                },
            },
            prompt: fullPrompt,
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
            audio: 'data:audio/wav;base64,' + wavData,
        };
    }
);
