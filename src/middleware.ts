import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSessionCookie = request.cookies
    .getAll()
    .some((cookie) => 
      cookie.name.includes('better-auth') || 
      cookie.name.includes('better_auth')
    );

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isProtectedRoute = pathname.startsWith('/dashboard');

  if (isProtectedRoute && !hasSessionCookie) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && hasSessionCookie) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};

