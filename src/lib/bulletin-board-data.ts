
import { historicalCharacters } from "./data/historical-characters";
import { historicalCharacters2 } from "./data/historical-characters-2";
import { historicalCharacters3 } from "./data/historical-characters-3";
import { literaryCharacters } from "./data/literary-characters";
import { normalUsers } from "./data/users";
import { neighbourhoodPosts } from "./data/neighbourhoods";

export interface Post {
    id: string;
    time: string;
    content: string;
    image?: string;
    dataAiHint?: string;
    images?: { src: string; hint: string }[];
    likes: number;
    comments: number;
    location?: {
        name: string;
        lat: number; // percentage from top
        lng: number; // percentage from left
    }
}

export interface User {
    handle: string;
    name: string;
    avatar: string;
    fallback: string;
    posts: Post[];
}

export const historicalUsers = [...historicalCharacters, ...historicalCharacters2, ...historicalCharacters3];
export const literaryUsers = [...literaryCharacters];
export const regularUsers = [...normalUsers, ...neighbourhoodPosts];

export const users: User[] = [
    ...historicalUsers,
    ...literaryUsers,
    ...regularUsers,
];

export interface PostWithAuthor extends Post {
    author: {
        handle: string;
        name: string;
        avatar: string;
        fallback: string;
    }
}

// Combine all posts from all users into a single array and sort by a rough time metric for the main feed
export const allPosts: PostWithAuthor[] = users
  .flatMap(user => 
    user.posts.map(post => ({ ...post, author: { handle: user.handle, name: user.name, avatar: user.avatar, fallback: user.fallback } }))
  )
  .sort((a, b) => {
    const getTimeValue = (time: string) => {
      // Prioritize specific string dates first
      const date = new Date(time);
      if (!isNaN(date.getTime())) {
          return date.getTime();
      }

      // Handle relative times for other posts
      if (time === 'ALWAYS' || time === 'CONSTANTLY') return new Date().getTime();
      const now = new Date();
      if (time.includes('h ago')) {
        return now.setHours(now.getHours() - parseInt(time));
      }
      if (time.includes('d ago')) {
        return now.setDate(now.getDate() - parseInt(time));
      }
      return new Date(0).getTime(); // a very old date for sorting
    };
    return getTimeValue(b.time) - getTimeValue(a.time);
  });
