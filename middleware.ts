import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');
  const isChatPage = request.nextUrl.pathname.startsWith('/chat');

  // 1. If trying to access chat without token -> redirect to login
  if (isChatPage && !token) {
    const loginUrl = new URL('/login', request.url);
    // Optional: add a callback parameter for better UX
    loginUrl.searchParams.set('callback', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If trying to access auth pages WITH a token -> redirect to chat
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

// Optimization: Specify which routes this middleware should run on.
// Exclude static assets, api routes, etc.
export const config = {
  matcher: [
    '/chat/:path*', 
    '/login', 
    '/register'
  ],
};
