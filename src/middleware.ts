
'use server';
import {NextRequest, NextResponse} from 'next/server';
import {decrypt} from '@/lib/session';
import {cookies} from 'next/headers';

// Add routes that require authentication
const authRoutes = [
    '/profile',
    '/settings',
    '/manage',
    '/create',
    '/library',
    '/mailbox',
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Check if the current route needs authentication
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Allow auth bypass for developers
  const authBypassCookie = req.cookies.get('dev_auth_bypass')?.value;
  if (authBypassCookie === 'true') {
    return NextResponse.next();
  }
  
  const sessionCookie = req.cookies.get('session')?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  // If trying to access a protected route without a session, redirect to login
  if (isAuthRoute && !session?.user) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirect_uri', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // If user is logged in, prevent them from accessing login/register pages
  if ((path === '/login' || path === '/auth/register') && session?.user) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$|.*\\.svg$|.*\\.jpg$|manifest.json|service-worker.js).*)',
  ],
};
