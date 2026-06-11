
export interface PlaygroundArticle {
    title: string;
    excerpt: string;
    image: string;
}

export interface PlaygroundItem {
    title: string;
    icon?: string;
    image?: string;
    duration?: string;
    thumbnail?: string;
}

export const playgroundContent = {
    articles: [
        {
            title: "The Magical Treehouse Adventure",
            excerpt: "Join Lily and Tom as they discover a secret, magical treehouse in their backyard and embark on an unforgettable journey!",
            image: "https://placehold.co/600x400.png"
        }
    ],
    games: [
        { title: "Shape Sorter", icon: "🔺" },
        { title: "Animal Sounds", icon: "🦁" },
        { title: "Color Match", icon: "🎨" },
        { title: "Puzzler", icon: "🧩" }
    ],
    comics: [
        { title: "Super Squirrel: The Acorn Thief", image: "https://placehold.co/300x450.png" },
        { title: "The Adventures of Captain Comet", image: "https://placehold.co/300x450.png" },
        { title: "Dino-Mite Explorers", image: "https://placehold.co/300x450.png" },
        { title: "The Mystery of the Missing Toy", image: "https://placehold.co/300x450.png" }
    ],
    videos: [
        { title: "Learn to Count with Fun Fruits", duration: "3:45", thumbnail: "https://placehold.co/400x225.png" },
        { title: "Sing the Alphabet Song!", duration: "2:30", thumbnail: "https://placehold.co/400x225.png" },
        { title: "How to Draw a Friendly Dinosaur", duration: "5:10", thumbnail: "https://placehold.co/400x225.png" },
    ]
}
