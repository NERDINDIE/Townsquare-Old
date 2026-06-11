
'use server';
/**
 * @fileOverview An AI agent that can analyze and manipulate text.
 *
 * - analyzeContent - A function that handles text summarization, rephrasing, and Q&A.
 * - AnalyzeContentInput - The input type for the analyzeContent function.
 * - AnalyzeContentOutput - The return type for the analyzeContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeContentInputSchema = z.object({
  text: z.string().describe('The source text to be analyzed.'),
  instruction: z.string().describe('The instruction for the AI (e.g., "Summarize this", "Rephrase this as a tweet", or a specific question).'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  analysis: z.string().describe("The result of the analysis, based on the user's instruction."),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContent(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  return contextualCompanionFlow(input);
}

const prompt = ai.definePrompt({
    name: 'contextualCompanionPrompt',
    input: { schema: AnalyzeContentInputSchema },
    output: { schema: AnalyzeContentOutputSchema },
    prompt: `You are a helpful AI assistant. Your task is to perform an action on the given text based on the provided instruction.

Instruction:
"{{{instruction}}}"

Source Text:
---
"{{{text}}}"
---

Provide your response in the 'analysis' field of the JSON output.
`,
});

const contextualCompanionFlow = ai.defineFlow(
  {
    name: 'contextualCompanionFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
