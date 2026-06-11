
'use server';

import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';

async function addNewPostToDataFile(newPostData: any) {
  // IMPORTANT: This is a prototype-only implementation to simulate a database.
  // In a real-world application, you would write to a database instead of the filesystem.
  
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'users.ts');
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');

    // This is a simplified way to find and insert into the array.
    // It assumes a specific structure for the users.ts file.
    const insertionMarker = `fallback: 'NN',
        posts: [`;
    
    if (fileContent.includes(insertionMarker)) {
        const newPostString = `
            {
                id: 'post-${Date.now()}',
                time: 'Just now',
                content: \`${newPostData.content.replace(/`/g, '\\`')}\`,
                likes: 0,
                comments: 0,
            },`;

      const newFileContent = fileContent.replace(
        insertionMarker,
        insertionMarker + newPostString
      );

      await fs.writeFile(filePath, newFileContent, 'utf8');
      console.log('Post added to mock data file successfully.');
    } else {
        console.error("Could not find the insertion point in the data file.");
    }
    
  } catch (error) {
    console.error('Error writing to mock data file:', error);
  }
}

export async function createPost(formData: FormData) {
  const postContent = formData.get('postContent') as string;

  if (postContent && postContent.trim() !== '') {
    const newPost = {
      content: postContent,
    };
    
    await addNewPostToDataFile(newPost);
    
    // Revalidate paths to show the new post
    revalidatePath('/bulletin-board');
    revalidatePath('/profile');
  }
}
