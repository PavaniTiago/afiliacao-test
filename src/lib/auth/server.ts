import { cookies } from 'next/headers';

export async function getServerSession() {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const hasSessionCookie = allCookies.some(
      (cookie) => 
        cookie.name.includes('better-auth') || 
        cookie.name.includes('better_auth')
    );

    if (!hasSessionCookie) {
      return null;
    }

    return {
      session: true,
      cookies: allCookies,
    };
  } catch {
    return null;
  }
}

