
'use server';
/**
 * @fileOverview An AI agent that can generate a facsimile of hourly news headlines.
 *
 * - generateFacsimile - A function that handles the headline generation.
 * - FacsimileOutput - The return type for the generateFacsimile function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FacsimileOutputSchema = z.object({
  time: z.string().describe("The current time for the edition, e.g., '11:00 AM'."),
  category: z.string().describe("The name of the edition, e.g., 'Facsimile Edition' or 'Mid-day Update'."),
  headlines: z.array(z.string()).describe('A list of 5-7 newspaper-style headlines for the current hour.'),
});

export type FacsimileOutput = z.infer<typeof FacsimileOutputSchema>;

export async function generateFacsimile(): Promise<FacsimileOutput> {
  return facsimileFlow();
}

const prompt = ai.definePrompt({
    name: 'facsimilePrompt',
    output: { schema: FacsimileOutputSchema },
    prompt: `You are a wire service editor from the 1940s. Your task is to generate a set of urgent, impactful, newspaper-style headlines for an hourly facsimile edition.

The time is now. Generate between 5 and 7 headlines that feel like they are being ripped from a teletype machine. The headlines should be concise, dramatic, and in all capital letters. They should cover a mix of national, international, and local news.

Provide a time for the edition (e.g., '02:00 PM') and a name for it (e.g., 'Afternoon Wire').
`,
});


const facsimileFlow = ai.defineFlow(
  {
    name: 'facsimileFlow',
    outputSchema: FacsimileOutputSchema,
  },
  async () => {
    try {
      const { output } = await prompt({});
      return output!;
    } catch (error) {
        console.error("AI call failed for facsimileFlow. Returning mock data.", error);
        return {
            time: "03:00 PM",
            category: "Fallback Edition",
            headlines: [
                "MARKETS RALLY ON POSITIVE ECONOMIC NEWS",
                "NEW CITY PARK OPENS TO PUBLIC",
                "SCIENTISTS ANNOUNCE MAJOR BREAKTHROUGH",
                "LOCAL SPORTS TEAM WINS CHAMPIONSHIP",
                "INTERNATIONAL SUMMIT REACHES AGREEMENT",
            ],
        };
    }
  }
);
