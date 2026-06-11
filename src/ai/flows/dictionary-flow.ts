
'use server';
/**
 * @fileOverview An AI agent that provides dictionary definitions.
 *
 * - getDefinition - A function that returns the definition of a word.
 * - DictionaryInput - The input type for the getDefinition function.
 * - DictionaryOutput - The return type for the getDefinition function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DictionaryInputSchema = z.object({
  word: z.string().describe('The word to be defined.'),
});
export type DictionaryInput = z.infer<typeof DictionaryInputSchema>;

const DictionaryOutputSchema = z.object({
  word: z.string().describe('The word that was defined.'),
  partOfSpeech: z.string().describe('The part of speech of the word (e.g., noun, verb, adjective).'),
  definition: z.string().describe('A concise and clear definition of the word.'),
  example: z.string().describe('An example sentence that correctly uses the word.'),
});
export type DictionaryOutput = z.infer<typeof DictionaryOutputSchema>;

export async function getDefinition(input: DictionaryInput): Promise<DictionaryOutput> {
  return dictionaryFlow(input);
}

const prompt = ai.definePrompt({
    name: 'dictionaryPrompt',
    input: { schema: DictionaryInputSchema },
    output: { schema: DictionaryOutputSchema },
    prompt: `You are a helpful dictionary assistant. Your task is to provide a clear and concise definition for the given word.

Word to define: "{{{word}}}"

Provide the following in your JSON response:
1.  'word': The word itself.
2.  'partOfSpeech': The primary part of speech for the word.
3.  'definition': A clear and easy-to-understand definition.
4.  'example': A simple sentence that correctly demonstrates the usage of the word.
`,
});


const dictionaryFlow = ai.defineFlow(
  {
    name: 'dictionaryFlow',
    inputSchema: DictionaryInputSchema,
    outputSchema: DictionaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
