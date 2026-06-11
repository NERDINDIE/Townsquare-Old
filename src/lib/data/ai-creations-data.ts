
export interface AiCreation {
    id: number;
    type: 'Poem' | 'Image' | 'Recipe' | 'Video';
    prompt: string;
    content: string; // This can be text or a URL
    title?: string;
    dataAiHint?: string;
}

export const aiCreations: AiCreation[] = [
    {
        id: 1,
        type: 'Poem',
        title: 'Ode to a City Park',
        prompt: 'Write a free verse poem about a city park at sunset.',
        content: 'The sun dips low, a tangerine bleed,\\nPainting streaks on concrete and weed.\\nLaughter echoes, a fading sound,\\nAs long shadows stretch on hallowed ground.',
    },
    {
        id: 2,
        type: 'Image',
        title: 'Cyberpunk Cityscape',
        prompt: 'A futuristic cityscape at sunset, with flying cars and neon signs, in a synthwave style.',
        content: 'https://placehold.co/800x450.png',
        dataAiHint: 'cyberpunk cityscape',
    },
    {
        id: 3,
        type: 'Recipe',
        title: 'Ingredient Challenge Stir-fry',
        prompt: 'Create a recipe using chicken, broccoli, and soy sauce.',
        content: '1. Cube chicken and marinate in soy sauce.\\n2. Stir-fry chicken until cooked.\\n3. Add broccoli florets and cook until tender-crisp.\\n4. Serve over rice. Enjoy!',
    }
];
