
'use server';
/**
 * @fileOverview An AI agent that can generate crossword puzzles.
 *
 * - generateCrossword - A function that handles generating the puzzle.
 * - CrosswordOutput - The return type for the generateCrossword function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';


const ClueSchema = z.object({
  number: z.number().describe('The number of the clue.'),
  clue: z.string().describe('The text of the clue.'),
  answer: z.string().describe('The answer to the clue.'),
});

const CrosswordOutputSchema = z.object({
  title: z.string().describe('A witty title for the crossword puzzle (e.g., "Daily Commuter").'),
  rows: z.number().describe('The number of rows in the crossword grid.'),
  cols: z.number().describe('The number of columns in the crossword grid.'),
  grid: z.array(z.array(z.nullable(z.string()))).describe('The crossword grid layout. A 2D array representing cells. `null` for black squares, a capital letter for filled squares.'),
  clues: z.object({
    across: z.array(ClueSchema),
    down: z.array(ClueSchema),
  }),
});

export type CrosswordOutput = z.infer<typeof CrosswordOutputSchema>;

export async function generateCrossword(): Promise<CrosswordOutput> {
  return crosswordFlow();
}

const prompt = ai.definePrompt({
    name: 'crosswordPrompt',
    output: { schema: CrosswordOutputSchema },
    prompt: `You are a master crossword puzzle creator. Your task is to generate a daily crossword puzzle suitable for a general audience.

The puzzle should be a standard 15x15 grid.
- Create a grid layout with black squares (represented as 'null' in the JSON). The grid should have rotational symmetry.
- Generate a set of interlocking words to fill the grid.
- Write clever but fair clues for each word in the "across" and "down" directions.
- Provide a witty title for the puzzle.
- Ensure all words are common English words and the clues are appropriate for all ages.

Please provide the output in the specified JSON format.
`,
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
});


const crosswordFlow = ai.defineFlow(
  {
    name: 'crosswordFlow',
    outputSchema: CrosswordOutputSchema,
  },
  async () => {
    const { output } = await prompt({});
    return output!;
  }
);
