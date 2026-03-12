import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';

const COOKIE_NAME = 'session';

export const getSession = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (!session) return null;

  try {
    // In a real app, you would verify the JWT here:
    // const payload = await decrypt(session); 
    // return payload;
    return session; 
  } catch (error) {
    console.error('Failed to verify session', error);
    return null;
  }
});

export async function verifySession() {
  const session = await getSession();
  if (!session) return { isAuth: false };
  return { isAuth: true, session };
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

