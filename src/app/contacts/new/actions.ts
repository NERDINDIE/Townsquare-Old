
'use server';

import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';

async function addNewContactToDataFile(newContactData: { name: string; phone?: string; email?: string; }) {
  // IMPORTANT: This is a prototype-only implementation to simulate a database.
  // In a real-world application, you would write to a database instead of the filesystem.
  
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'contacts-data.ts');
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');

    const insertionMarker = `export const contacts: Contact[] = [`;
    
    if (fileContent.includes(insertionMarker)) {
        const newContactString = `
    {
        id: ${Date.now()},
        name: '${newContactData.name.replace(/'/g, "\\'")}',
        phone: '${(newContactData.phone || 'N/A').replace(/'/g, "\\'")}',
        email: '${(newContactData.email || 'N/A').replace(/'/g, "\\'")}',
        fallback: '${newContactData.name.charAt(0).toUpperCase()}',
    },`;

      const newFileContent = fileContent.replace(
        insertionMarker,
        insertionMarker + newContactString
      );

      await fs.writeFile(filePath, newFileContent, 'utf8');
      console.log('Contact added to mock data file successfully.');
    } else {
        console.error("Could not find the insertion point in the data file.");
    }
    
  } catch (error) {
    console.error('Error writing to mock data file:', error);
  }
}

export async function addContact(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;

  if (name) {
    // For this prototype, we'll use localStorage to pass the new contact to the list page
    // This is a workaround because we can't directly modify component state from a server action
    // In a real app, you would write to a DB here and the list page would refetch.
    localStorage.setItem('new_contact_name', name);
    localStorage.setItem('new_contact_phone', phone || 'N/A');
    localStorage.setItem('new_contact_email', email || 'N/A');

    // This is a mock function to simulate DB write
    await addNewContactToDataFile({ name, phone, email });
    
    // Revalidate paths to trigger data refetch on the client
    revalidatePath('/contacts');
  }
}
