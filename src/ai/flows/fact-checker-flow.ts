
'use server';
/**
 * @fileOverview An AI agent that can fact-check text and analyze it for bias.
 * 
 * - analyzeText - A function that handles the analysis process.
 * - AnalyzeTextInput - The input type for the analyzeText function.
 * - AnalyzeTextOutput - The return type for the analyzeText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeTextInputSchema = z.object({
  text: z.string().describe('The text to be analyzed.'),
  analysisType: z.enum(['fact-check', 'bias-analysis', 'advanced-analysis']).describe('The type of analysis to perform.'),
});
export type AnalyzeTextInput = z.infer<typeof AnalyzeTextInputSchema>;

const ClaimSchema = z.object({
  claim: z.string().describe('The specific claim identified in the text.'),
  verdict: z.enum(['Accurate', 'Inaccurate', 'Misleading', 'Unverified']).describe('The verdict on the claim\'s accuracy.'),
  explanation: z.string().describe('A brief explanation for the verdict.'),
});

const BiasExampleSchema = z.object({
  example: z.string().describe('A specific phrase or sentence that shows potential bias.'),
  explanation: z.string().describe('An explanation of why this example might be biased.'),
});

const AnalyzeTextOutputSchema = z.object({
  summary: z.string().describe('An overall summary of the analysis.'),
  claims: z.array(ClaimSchema).optional().describe('A list of factual claims and their verdicts. Only present for fact-check analysis.'),
  biasExamples: z.array(BiasExampleSchema).optional().describe('A list of examples of biased language. Only present for bias-analysis.'),
  forensicAnalysis: z.object({
    isSatire: z.boolean(),
    isImpersonation: z.boolean(),
    emotionalManipulationDetected: z.boolean(),
    authenticitySummary: z.string(),
  }).optional().describe('A detailed forensic analysis. Only present for advanced-analysis.')
});
export type AnalyzeTextOutput = z.infer<typeof AnalyzeTextOutputSchema>;


export async function analyzeText(input: AnalyzeTextInput): Promise<AnalyzeTextOutput> {
    return factCheckerFlow(input);
}

const prompt = ai.definePrompt({
    name: 'factCheckerPrompt',
    input: { schema: AnalyzeTextInputSchema },
    output: { schema: AnalyzeTextOutputSchema },
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
    prompt: `You are a media literacy and digital forensics expert. Your task is to analyze the following text based on the user's requested analysis type.

Analysis Type: {{{analysisType}}}
Text to Analyze:
"{{{text}}}"

{{#if (eq analysisType 'fact-check')}}
Please perform a fact-check on the text. 
1. First, identify and list the key claims made in the text.
2. For each claim, verify its accuracy using your knowledge.
3. Provide a clear verdict for each claim (e.g., "Accurate", "Inaccurate", "Unverified").
4. Provide a detailed explanation for each verdict.
5. Finally, provide a summary of your overall findings.
Return your full analysis in the specified JSON format.
{{/if}}

{{#if (eq analysisType 'bias-analysis')}}
Please analyze the text for potential bias. 
1. First, identify specific examples of loaded language, emotional appeals, cherry-picked facts, or other rhetorical devices.
2. For each example, explain why it might suggest a particular point of view or bias.
3. Provide a balanced, overall assessment of the text's objectivity as the summary.
Return your full analysis in the specified JSON format.
{{/if}}

{{#if (eq analysisType 'advanced-analysis')}}
Please perform an advanced forensic analysis of the text. Look for signs of sophisticated manipulation techniques.
1.  **Parody/Satire**: Assess if the text is satirical or a parody and set the 'isSatire' flag.
2.  **Impersonation**: Determine if the text is attempting to impersonate a known individual or organization and set the 'isImpersonation' flag.
3.  **Emotional Manipulation**: Identify any use of emotionally charged language or logical fallacies designed to manipulate the reader and set the 'emotionalManipulationDetected' flag.
4.  **Overall Authenticity**: Provide a summary of the text's likely intent and authenticity in the 'authenticitySummary' field.
Return your full analysis in the specified JSON format.
{{/if}}
`,
});


const factCheckerFlow = ai.defineFlow(
    {
        name: 'factCheckerFlow',
        inputSchema: AnalyzeTextInputSchema,
        outputSchema: AnalyzeTextOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
