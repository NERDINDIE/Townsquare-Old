
'use server';
/**
 * @fileOverview An AI agent that can analyze content against partnership guidelines.
 * 
 * - checkContentAgainstGuidelines - A function that handles the analysis process.
 * - GuidelineCheckInput - The input type for the checkContentAgainstGuidelines function.
 * - GuidelineCheckOutput - The return type for the checkContentAgainstGuidelines function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GuidelineCheckInputSchema = z.object({
  content: z.string().describe('The content to be analyzed against the guidelines.'),
});
export type GuidelineCheckInput = z.infer<typeof GuidelineCheckInputSchema>;

const ViolationSchema = z.object({
    guideline: z.enum([
        "User Experience First", 
        "Absolute Transparency", 
        "Content Integrity and Quality", 
        "Brand and Mission Alignment"
    ]).describe("The specific guideline that has been violated."),
    details: z.string().describe("A detailed explanation of how the content violates the specified guideline."),
    confidenceScore: z.number().min(0).max(1).describe("The AI's confidence in this violation being accurate, from 0.0 to 1.0."),
});

export const GuidelineCheckOutputSchema = z.object({
  adheresToGuidelines: z.boolean().describe("A boolean indicating if the content fully adheres to all guidelines."),
  violations: z.array(ViolationSchema).describe("A list of all identified guideline violations. This will be empty if adheresToGuidelines is true."),
  summary: z.string().describe("A brief, high-level summary of the analysis findings."),
});
export type GuidelineCheckOutput = z.infer<typeof GuidelineCheckOutputSchema>;

export async function checkContentAgainstGuidelines(input: GuidelineCheckInput): Promise<GuidelineCheckOutput> {
    return guidelineCheckerFlow(input);
}

const prompt = ai.definePrompt({
    name: 'guidelineCheckerPrompt',
    input: { schema: GuidelineCheckInputSchema },
    output: { schema: GuidelineCheckOutputSchema },
    prompt: `You are an expert content moderator for a platform called Townsquare. Your task is to analyze the provided content and determine if it violates our strict partnership guidelines.

**Partnership Guidelines:**

1.  **User Experience First:** Content must not be intrusive, disruptive, or deceptive. This includes no intrusive ads, no dark patterns, and it must be performant.
2.  **Absolute Transparency:** Sponsored content must be clearly and conspicuously disclosed as "Sponsored," "Advertisement," or "In partnership with [Brand Name]". Native advertising designed to blend in is forbidden.
3.  **Content Integrity and Quality:** All claims must be factually accurate and not misleading. No harmful content (hate speech, violence, etc.) is allowed. Content must be well-produced and provide genuine value.
4.  **Brand and Mission Alignment:** Content must align with our core mission of fostering community, promoting knowledge, and encouraging creativity.

**Content to Analyze:**
---
"{{{content}}}"
---

**Your Task:**
Analyze the content against each of the four guidelines.
- If there are ANY violations, set 'adheresToGuidelines' to false and provide a detailed list of each violation. For each violation, specify which guideline was broken, explain how, and provide a confidence score.
- If there are NO violations, set 'adheresToGuidelines' to true and leave the 'violations' array empty.
- Provide a concise overall summary of your findings.
`,
});

const guidelineCheckerFlow = ai.defineFlow(
    {
        name: 'guidelineCheckerFlow',
        inputSchema: GuidelineCheckInputSchema,
        outputSchema: GuidelineCheckOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
