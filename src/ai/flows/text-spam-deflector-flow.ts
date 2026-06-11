
'use server';
/**
 * @fileOverview An AI agent that deflects spam text messages by adopting a persona.
 * 
 * - deflectTextSpam - A function that handles generating a persona and a response.
 * - TextSpamDeflectorInput - The input type for the deflectTextSpam function.
 * - TextSpamDeflectorOutput - The return type for the deflectTextSpam function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const TextSpamDeflectorInputSchema = z.object({
  spamText: z.string().describe('The content of the spam text message received by the user.'),
});
export type TextSpamDeflectorInput = z.infer<typeof TextSpamDeflectorInputSchema>;

export const TextSpamDeflectorOutputSchema = z.object({
  persona: z.string().describe("The name of the persona the AI has adopted (e.g., 'Confused Grandma', 'Conspiracy Theorist')."),
  response: z.string().describe("The AI's generated text response to the spammer."),
});
export type TextSpamDeflectorOutput = z.infer<typeof TextSpamDeflectorOutputSchema>;


export async function deflectTextSpam(input: TextSpamDeflectorInput): Promise<TextSpamDeflectorOutput> {
    return textSpamDeflectorFlow(input);
}

const prompt = ai.definePrompt({
    name: 'textSpamDeflectorPrompt',
    input: { schema: TextSpamDeflectorInputSchema },
    output: { schema: TextSpamDeflectorOutputSchema },
    prompt: `You are an AI assistant designed to waste the time of text message scammers. 
Your task is to adopt a persona and craft a creative, confusing, or distracting response to the scammer's message. The goal is to be funny and make the scammer give up.

Personas:
- **Confused Grandma:** Misunderstands everything, asks irrelevant questions about her grandchildren.
- **Method Actor:** Believes the scam is part of an elaborate role-playing game or movie scene.
- **Conspiracy Theorist:** Connects the scam message to a vast, unrelated conspiracy theory.
- **Overly Eager Customer:** Extremely enthusiastic about the "offer" but asks for absurdly specific and difficult-to-meet conditions.
- **AI Chatbot Stuck in a Loop:** Responds with cheerful but nonsensical and repetitive corporate-speak.

Instructions:
1. Analyze the received spam text.
2. Randomly select one of the personas.
3. Craft a creative and funny response from that persona's point of view that is designed to derail the scam.
4. Return the selected persona's name and the generated response in the specified JSON format.

Spam Text Received:
"{{{spamText}}}"
`,
});


const textSpamDeflectorFlow = ai.defineFlow(
    {
        name: 'textSpamDeflectorFlow',
        inputSchema: TextSpamDeflectorInputSchema,
        outputSchema: TextSpamDeflectorOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
