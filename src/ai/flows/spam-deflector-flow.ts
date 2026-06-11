
'use server';
/**
 * @fileOverview An AI agent that can deflect spam calls by adopting a persona.
 * 
 * - deflectSpam - A function that handles generating a persona and an opening line.
 * - SpamDeflectorOutput - The return type for the deflectSpam function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SpamDeflectorOutputSchema = z.object({
  persona: z.string().describe("The name of the persona the AI has adopted (e.g., 'Confused Grandma', 'Distracted Sports Fan')."),
  openingLine: z.string().describe("The first line of dialogue for the AI to say to the suspected spammer."),
});
export type SpamDeflectorOutput = z.infer<typeof SpamDeflectorOutputSchema>;


export async function deflectSpam(): Promise<SpamDeflectorOutput> {
    return spamDeflectorFlow();
}

const prompt = ai.definePrompt({
    name: 'spamDeflectorPrompt',
    output: { schema: SpamDeflectorOutputSchema },
    prompt: `You are an AI assistant designed to waste the time of spam callers. 
Your task is to randomly adopt one of the following personas and generate a creative, confusing, or distracting opening line to say to the spammer.

Personas:
- **Confused Grandma:** Technologically clueless, very talkative, easily distracted by her cat or what's on TV.
- **Distracted Sports Fan:** Watching a critical game, very loud background noise, keeps asking the caller for the score.
- **Quiet Bus Rider:** On a very crowded, quiet bus, can only speak in whispers, constantly apologizing for the noise he's "making".
- **Harried Parent:** Juggling multiple screaming children, can't focus on what the caller is saying.
- **Argumentative Professor:** Over-analyzes every word the caller says, turns the conversation into a philosophical debate.

Instructions:
1. Randomly select one of the personas.
2. Craft a compelling and funny opening line for that persona to say to an unsolicited caller.
3. The goal is to be confusing and make the spammer want to hang up or stay on the line as long as possible without getting any information.
4. Return the selected persona's name and the opening line in the specified JSON format.
`,
});


const spamDeflectorFlow = ai.defineFlow(
    {
        name: 'spamDeflectorFlow',
        outputSchema: SpamDeflectorOutputSchema,
    },
    async () => {
        const { output } = await prompt({});
        return output!;
    }
);
