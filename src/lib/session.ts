
'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.SESSION_SECRET || 'fallback-secret-for-development';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (e) {
    // This can happen if the token is invalid (e.g. malformed)
    // An expired token would not throw an error here since we are not setting an expiration
    return null;
  }
}

export async function loginAndSetCookie(data: any) {
  // In a real app, you'd verify credentials here.
  // For this prototype, we'll create a session for any valid form submission.
  const user = { email: data.email, name: 'Jane Doe' }; // Example user object

  // Create the session
  const session = await encrypt({ user });

  // Save the session in a cookie without a specific expiry.
  // Browsers will treat it as a persistent cookie.
  cookies().set('session', session, { httpOnly: true, path: '/' });
}


export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0), path: '/' });
}

export async function getSession() {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) return null;
  return await decrypt(sessionCookie);
}

// This function can be used in middleware to update the session cookie
export async function updateSession(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  if (!sessionCookie) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(sessionCookie);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    path: '/',
  });
  return res;
}
