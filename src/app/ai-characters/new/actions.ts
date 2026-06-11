
'use server';

import { promises as fs } from 'fs';
import path from 'path';

async function addNewCharacterToDataFile(newCharacterData: any) {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'ai-character-data.ts');
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');

    const insertionMarker = `export const characters = [`;
    
    if (fileContent.includes(insertionMarker)) {
        const newCharacterString = `
    { name: '${newCharacterData.name.replace(/'/g, "\\'")}', description: '${newCharacterData.description.replace(/'/g, "\\'")}', avatar: '${newCharacterData.avatar.replace(/'/g, "\\'")}' },`;

      const newFileContent = fileContent.replace(
        insertionMarker,
        insertionMarker + newCharacterString
      );

      await fs.writeFile(filePath, newFileContent, 'utf8');
      console.log('Character added to mock data file successfully.');
    } else {
        console.error("Could not find the insertion point in the data file.");
    }
    
  } catch (error) {
    console.error('Error writing to mock data file:', error);
  }
}

export async function createAiCharacter(formData: FormData) {
  const characterData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    avatar: (formData.get('avatar') as string) || '/avatars/assistant.png', // Default avatar
  };

  if (characterData.name && characterData.description) {
    await addNewCharacterToDataFile(characterData);
  }
}
