
'use server';
/**
 * @fileOverview An AI agent that can analyze text for propaganda techniques.
 * 
 * - defectPropaganda - A function that handles the analysis process.
 * - PropagandaDefectorInput - The input type for the defectPropaganda function.
 * - PropagandaDefectorOutput - The return type for the defectPropaganda function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const PropagandaDefectorInputSchema = z.object({
  text: z.string().describe('The text to be analyzed for propaganda.'),
});
export type PropagandaDefectorInput = z.infer<typeof PropagandaDefectorInputSchema>;

const TechniqueSchema = z.object({
    technique: z.string().describe("The name of the propaganda technique identified (e.g., 'Fear Appeal', 'Whataboutism', 'Ad Hominem')."),
    explanation: z.string().describe("A brief explanation of how this technique is used in the provided text."),
    excerpt: z.string().describe("The specific quote or excerpt from the text that demonstrates the technique."),
});

export const PropagandaDefectorOutputSchema = z.object({
  overallAssessment: z.string().describe("A high-level summary of the text's propagandistic characteristics."),
  detectedTechniques: z.array(TechniqueSchema).describe("A list of all identified propaganda techniques and their explanations."),
  isPropaganda: z.boolean().describe("A boolean indicating if the text likely contains propaganda."),
});
export type PropagandaDefectorOutput = z.infer<typeof PropagandaDefectorOutputSchema>;

export async function defectPropaganda(input: PropagandaDefectorInput): Promise<PropagandaDefectorOutput> {
    return propagandaDefectorFlow(input);
}

const prompt = ai.definePrompt({
    name: 'propagandaDefectorPrompt',
    input: { schema: PropagandaDefectorInputSchema },
    output: { schema: PropagandaDefectorOutputSchema },
    prompt: `You are an expert in media literacy and political science, specializing in identifying propaganda. Your task is to analyze the following text for common propaganda techniques.

Common techniques include, but are not limited to:
- Fear Appeals: Using fear to influence public opinion.
- Ad Hominem: Attacking the person instead of the argument.
- Whataboutism: Discrediting an argument by charging hypocrisy without refuting the argument itself.
- Glittering Generalities: Using emotionally appealing words so closely associated with highly valued concepts that they carry conviction without supporting information.
- Bandwagon: Appealing to the desire to be on the winning side.
- Plain Folks: Attempting to convince the public that the propagandist's views reflect those of the common person.
- Transfer: Associating a respected person or symbol with an idea to make it seem more acceptable.
- Name-calling: Using derogatory language or words that carry a negative connotation.

**Text to Analyze:**
---
"{{{text}}}"
---

**Your Task:**
1.  Read the text carefully.
2.  Identify every instance of a propaganda technique. For each instance, specify the technique, explain how it's used, and quote the relevant excerpt.
3.  Provide an 'overallAssessment' of the text's objectivity and intent.
4.  Set the 'isPropaganda' flag to true if any techniques are detected, otherwise set it to false.
5.  Return the full analysis in the specified JSON format. If no techniques are found, return an empty array for 'detectedTechniques'.
`,
});

const propagandaDefectorFlow = ai.defineFlow(
    {
        name: 'propagandaDefectorFlow',
        inputSchema: PropagandaDefectorInputSchema,
        outputSchema: PropagandaDefectorOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
