
'use server';

import { loginAndSetCookie } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(data: any) {
  const { email, password, redirect_uri } = data;

  if (!email || !password) {
    return 'Invalid credentials';
  }

  // Allow login with either 'user' or 'user@gmail.com'
  if (email !== 'user' && email !== 'user@gmail.com') {
    return 'Invalid credentials';
  }

  // In a real app, you would also verify the password here.
  // For this prototype, any password is accepted for the valid users.

  await loginAndSetCookie({
    email: 'user@gmail.com', // Standardize session email
    name: 'Jane Doe',
  });
  
  // Smart redirect
  const redirectUrl = redirect_uri || '/';
  redirect(redirectUrl);
}

export async function register(data: any) {
  // In a real application, you would create a new user in the database.
  // For this prototype, we'll just log the user in immediately after registration.
  await login(data);
}
