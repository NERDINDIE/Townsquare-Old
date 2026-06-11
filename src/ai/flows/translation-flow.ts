
'use server';
/**
 * @fileOverview An AI agent that can translate text into different languages.
 * 
 * - translateArticle - A function that handles the translation.
 * - TranslateArticleInput - The input type for the translateArticle function.
 * - TranslateArticleOutput - The return type for the translateArticle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TranslateArticleInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  targetLanguage: z.string().describe('The language to translate the text into.'),
});
export type TranslateArticleInput = z.infer<typeof TranslateArticleInputSchema>;

const TranslateArticleOutputSchema = z.object({
  translation: z.string().describe("The translated text."),
});
export type TranslateArticleOutput = z.infer<typeof TranslateArticleOutputSchema>;


export async function translateArticle(input: TranslateArticleInput): Promise<TranslateArticleOutput> {
    return translationFlow(input);
}

const prompt = ai.definePrompt({
    name: 'translationPrompt',
    input: { schema: TranslateArticleInputSchema },
    output: { schema: TranslateArticleOutputSchema },
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
    },
    prompt: `You are a professional translator. Your task is to translate the following text into {{{targetLanguage}}}.

Translate the text accurately, maintaining the original tone and meaning. Do not add any extra commentary or explanation, only provide the translated text.

Text to Translate:
"{{{text}}}"`,
});


const translationFlow = ai.defineFlow(
    {
        name: 'translationFlow',
        inputSchema: TranslateArticleInputSchema,
        outputSchema: TranslateArticleOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
