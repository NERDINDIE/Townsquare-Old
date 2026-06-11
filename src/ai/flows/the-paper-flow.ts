
'use server';
/**
 * @fileOverview An AI agent that generates news stories and evaluates a newspaper layout.
 *
 * - generateNews - Generates a pool of news stories for the game.
 * - evaluatePaper - Evaluates the user's newspaper layout.
 * - NewsStory - The type for a single news story.
 * - PaperLayout - The type for the newspaper layout.
 * - Evaluation - The return type for the evaluation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const NewsStorySchema = z.object({
    id: z.string().describe('A unique ID for the story (e.g., story-1).'),
    headline: z.string().describe('A compelling, newspaper-style headline.'),
    summary: z.string().describe('A brief, one-sentence summary of the story.'),
    category: z.enum(['Politics', 'Business', 'Technology', 'Sports', 'Lifestyle', 'Local News']).describe('The category of the news story.'),
    imageUrl: z.string().url().optional().describe('An optional URL for a relevant photo.'),
});
export type NewsStory = z.infer<typeof NewsStorySchema>;

const GenerateNewsOutputSchema = z.array(NewsStorySchema).length(6);

const PaperLayoutSchema = z.object({
    leadStory: NewsStorySchema.nullable(),
    photoStory: NewsStorySchema.nullable(),
    sideStory1: NewsStorySchema.nullable(),
    sideStory2: NewsStorySchema.nullable(),
});
export type PaperLayout = z.infer<typeof PaperLayoutSchema>;

const EvaluationSchema = z.object({
    score: z.number().int().min(0).max(100).describe('A score from 0-100 based on the quality of the layout.'),
    feedback: z.string().describe('Witty and constructive feedback from the perspective of a seasoned newspaper editor.'),
});
export type Evaluation = z.infer<typeof EvaluationSchema>;


export async function generateNews(): Promise<NewsStory[]> {
  return generateNewsFlow();
}

export async function evaluatePaper(layout: Required<PaperLayout>): Promise<Evaluation> {
    return evaluatePaperFlow(layout);
}


const generateNewsPrompt = ai.definePrompt({
    name: 'generateNewsPrompt',
    output: { schema: GenerateNewsOutputSchema },
    prompt: `You are a creative news editor. Generate a diverse pool of 6 news stories for a game where the user designs a newspaper front page. The stories should be suitable for a local paper called "The Townsquare Times".

Provide a mix of categories: Politics, Business, Technology, Sports, Lifestyle, and Local News.
For at least two of the stories, include a placeholder image URL from 'https://placehold.co/600x400.png'.
Ensure each story has a unique ID, a catchy headline, and a concise one-sentence summary.
Make the stories interesting and varied to provide a good challenge for the player.
`,
});

const generateNewsFlow = ai.defineFlow(
  {
    name: 'generateNewsFlow',
    outputSchema: GenerateNewsOutputSchema,
  },
  async () => {
    const { output } = await generateNewsPrompt({});
    return output!;
  }
);


const evaluatePaperPrompt = ai.definePrompt({
    name: 'evaluatePaperPrompt',
    input: { schema: PaperLayoutSchema },
    output: { schema: EvaluationSchema },
    prompt: `You are a seasoned, witty, and slightly cynical newspaper editor. Your task is to evaluate the front page layout submitted by your new intern.

Based on the provided JSON of their story placements, give them a score from 0 to 100 and some constructive (but entertaining) feedback.

Consider the following when scoring:
- **Lead Story:** Is the lead story newsworthy and impactful? A boring lead story is a cardinal sin.
- **Photo Choice:** Does the main photo have visual impact? Does it complement the lead story or tell its own interesting story?
- **Story Synergy:** Do the stories work well together, or is it a chaotic mess? Is there a coherent theme, or does it feel random?
- **Balance:** Is there a good mix of hard news and lighter fare?

Here is the intern's layout:
- **Lead Story:** {{{leadStory.headline}}}
- **Photo Story:** {{{photoStory.headline}}}
- **Side Story 1:** {{{sideStory1.headline}}}
- **Side Story 2:** {{{sideStory2.headline}}}

Now, provide your evaluation. Be honest, be funny, but also give a little guidance. For example, if they put a trivial story as the lead, you might say something like: "A bake sale, as our lead story? The fate of the free world hangs in the balance and we're leading with cookies. Bold choice. Let's try to find something with a bit more... gravitas for the front page next time. -10 points for Gryffindor."
`,
});

const evaluatePaperFlow = ai.defineFlow(
  {
    name: 'evaluatePaperFlow',
    inputSchema: PaperLayoutSchema,
    outputSchema: EvaluationSchema,
  },
  async (layout) => {
    const { output } = await evaluatePaperPrompt(layout);
    return output!;
  }
);
