
'use server';
/**
 * @fileOverview An AI agent that responds to letters to the editor.
 * 
 * - respondToLetter - A function that handles generating a response.
 * - LetterToEditorInput - The input type for the respondToLetter function.
 * - LetterToEditorOutput - The return type for the respondToLetter function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const LetterToEditorInputSchema = z.object({
  letterContent: z.string().describe('The content of the letter from the user.'),
  theme: z.string().describe('The current visual theme of the app (e.g., "magazine" or "tabloid"). This should guide the tone of the response.'),
});
export type LetterToEditorInput = z.infer<typeof LetterToEditorInputSchema>;

const LetterToEditorOutputSchema = z.object({
  response: z.string().describe("The editor's response to the letter."),
});
export type LetterToEditorOutput = z.infer<typeof LetterToEditorOutputSchema>;


export async function respondToLetter(input: LetterToEditorInput): Promise<LetterToEditorOutput> {
    return letterToEditorFlow(input);
}

const prompt = ai.definePrompt({
    name: 'letterToEditorPrompt',
    input: { schema: LetterToEditorInputSchema },
    output: { schema: LetterToEditorOutputSchema },
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
    prompt: `You are the editor of a publication called "Townsquare." Your personality and writing style should adapt based on the current theme of the publication.

Current Theme: {{{theme}}}

- If the theme is 'modern' or 'magazine', your tone should be professional, thoughtful, and slightly formal. Like the editor of a respectable city magazine.
- If the theme is 'tabloid', your tone should be sensational, bold, and a bit over-the-top. Use punchy language. Like the editor of a classic city tabloid.
- For any other theme, adopt a standard, neutral, and helpful editor persona.

A reader has submitted the following letter. Write a response from the editor's desk.

Reader's Letter:
"{{{letterContent}}}"

Your response should be addressed to the reader and be suitable for publication in the "Letters to the Editor" section.`,
});


const letterToEditorFlow = ai.defineFlow(
    {
        name: 'letterToEditorFlow',
        inputSchema: LetterToEditorInputSchema,
        outputSchema: LetterToEditorOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
