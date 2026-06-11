
export const games = {
    featured: {
        title: 'Starship Defender',
        description: 'Blast through waves of alien ships in this classic top-down shooter. How long can you survive?',
        image: 'https://placehold.co/800x450.png',
        dataAiHint: 'pixel art space battle',
    },
    classic: [
        { title: 'Minesweeper', icon: '💣', href: '/arcade-saloon/minesweeper' },
        { title: 'Reversi', icon: '⚫️', href: '/arcade-saloon/reversi' },
        { title: 'Polybius', icon: '🌀', href: '/arcade-saloon/polybius' },
        { title: 'Solitaire', icon: '🃏', href: '/arcade-saloon/solitaire' },
        { title: 'Galaxy Invaders', icon: '👾' },
        { title: 'Memory Game', icon: '🧠', href: '/arcade-saloon/memory-game' },
        { title: 'Debugger', icon: '🐛', href: '/arcade-saloon/debugger' },
        { title: 'Hangman', icon: '🤔', href: '/arcade-saloon/hangman' },
        { title: 'Brick Breaker', icon: '🧱' },
    ],
    puzzles: [
        { title: 'AI Crossword', icon: '✍️', href: '/arcade-saloon/ai-crossword' },
        { title: 'The Paper', icon: '📰', href: '/arcade-saloon/the-paper' },
        { title: 'Rhythm Master', icon: '🎵', href: '/arcade-saloon/rhythm-master' },
        { title: 'Sudoku', icon: '🔢' },
        { title: 'Word Finder', icon: '🔍' },
    ]
}

export const leaderboard = [
    { rank: 1, name: 'CyberNinja', score: 9850, initials: 'CN' },
    { rank: 2, name: 'PixelWizard', score: 9500, initials: 'PW' },
    { rank: 3, name: 'ArcadeMaster', score: 9200, initials: 'AM' },
    { rank: 4, name: 'User Four', score: 8900, initials: 'U4' },
    { rank: 5, name: 'RetroGamer', score: 8500, initials: 'RG' },
]

export const challenges = [
  {
    title: 'Fix the Greeting',
    buggyCode: `function greet(name) {
  return "Hello, " + name;
}

// Expected output for greet("World"): "Hello, World!"
console.log(greet());`,
    solution: `function greet(name) {
  return "Hello, " + name;
}

// Expected output for greet("World"): "Hello, World!"
console.log(greet("World"));`,
    description: 'The `greet` function is being called without an argument. Pass a name to the function to fix the bug.',
  },
  {
    title: 'Sum the Array',
    buggyCode: `function sumArray(arr) {
  let sum = 0;
  for (let i = 1; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Expected output for [1, 2, 3]: 6
console.log(sumArray([1, 2, 3]));`,
    solution: `function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Expected output for [1, 2, 3]: 6
console.log(sumArray([1, 2, 3]));`,
    description: 'The loop starts at index 1, skipping the first element of the array. The loop should start at index 0.',
  }
];

export const flashGames = [
  {
    title: 'Tank Attack 2',
    image: 'https://placehold.co/150x100.png',
    dataAiHint: 'pixel art tank',
    rating: 4.5,
    plays: '2.1M',
  },
  {
    title: 'Alien Hominid',
    image: 'https://placehold.co/150x100.png',
    dataAiHint: 'cartoon alien',
    rating: 4.8,
    plays: '5.5M',
  },
  {
    title: 'Castle Crashing',
    image: 'https://placehold.co/150x100.png',
    dataAiHint: 'pixel art knight',
    rating: 4.6,
    plays: '3.2M',
  },
  {
    title: 'Madness Interactive',
    image: 'https://placehold.co/150x100.png',
    dataAiHint: 'pixel art fighting',
    rating: 4.9,
    plays: '8.1M',
  },
  {
    title: 'Portal: The Flash Version',
    image: 'https://placehold.co/150x100.png',
    dataAiHint: 'sci-fi portal',
    rating: 4.7,
    plays: '4.8M',
  },
];

export const topRated = [
    { title: "Madness Interactive", rank: 1},
    { title: "Alien Hominid", rank: 2},
    { title: "Portal: The Flash Version", rank: 3},
    { title: "Castle Crashing", rank: 4},
    { title: "Tank Attack 2", rank: 5},
]

export const hangmanWords = ['NEXTJS', 'TAILWIND', 'REACT', 'FIREBASE', 'GENKIT', 'TYPESCRIPT', 'SHADCN'];
