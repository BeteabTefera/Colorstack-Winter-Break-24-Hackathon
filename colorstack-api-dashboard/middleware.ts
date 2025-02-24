import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  const protectedPaths = [
    '/dashboard',
    '/api-docs',
    '/slack-wrapped-demo',
    '/study-buddy-demo'
  ];

  // Public routes
  const publicPaths = ['/', '/verify'];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => 
    req.nextUrl.pathname === path
  );

  // If there's no session and the user is trying to access a protected route
  if (!session && isProtectedPath && !isPublicPath) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    '/',
    '/verify',
    '/dashboard/:path*',
    '/api-docs/:path*',
    '/slack-wrapped-demo/:path*',
    '/study-buddy-demo/:path*'
  ]
};

