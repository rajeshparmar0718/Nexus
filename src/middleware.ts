// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!_next/static|favicon.ico|auth/signin|auth/signup).*)'],
};
