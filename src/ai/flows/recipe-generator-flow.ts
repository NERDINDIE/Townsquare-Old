
'use server';
/**
 * @fileOverview An AI agent that can generate a recipe from an image of ingredients.
 *
 * - generateRecipeFromImage - A function that handles the recipe generation.
 * - RecipeFromImageInput - The input type for the generateRecipeFromImage function.
 * - RecipeFromImageOutput - The return type for the generateRecipeFromImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RecipeFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of ingredients, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RecipeFromImageInput = z.infer<typeof RecipeFromImageInputSchema>;

const RecipeFromImageOutputSchema = z.object({
  title: z.string().describe("A creative and appealing name for the recipe."),
  description: z.string().describe("A short, enticing description of the dish."),
  ingredients: z.array(z.string()).describe("A list of the ingredients required for the recipe."),
  instructions: z.array(z.string()).describe("Step-by-step instructions for preparing the dish."),
  servings: z.string().describe("The number of servings the recipe makes."),
  prepTime: z.string().describe("The estimated preparation time."),
});
export type RecipeFromImageOutput = z.infer<typeof RecipeFromImageOutputSchema>;

export async function generateRecipeFromImage(input: RecipeFromImageInput): Promise<RecipeFromImageOutput> {
  return recipeFromImageFlow(input);
}

const prompt = ai.definePrompt({
    name: 'recipeFromImagePrompt',
    input: { schema: RecipeFromImageInputSchema },
    output: { schema: RecipeFromImageOutputSchema },
    prompt: `You are an expert chef and recipe developer. A user has uploaded a photo of ingredients they have on hand. Your task is to analyze the ingredients and create a delicious recipe.

Ingredients Image:
{{media url=photoDataUri}}

Instructions:
1.  Identify the primary ingredients in the image.
2.  If common pantry staples (like oil, salt, pepper, flour) are not pictured, you may assume they are available.
3.  Create a complete recipe, including a creative title, description, list of ingredients, step-by-step instructions, servings, and prep time.
4.  The recipe should be clear, concise, and easy for a home cook to follow.

Return the full recipe in the specified JSON format.
`,
});


const recipeFromImageFlow = ai.defineFlow(
  {
    name: 'recipeFromImageFlow',
    inputSchema: RecipeFromImageInputSchema,
    outputSchema: RecipeFromImageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
