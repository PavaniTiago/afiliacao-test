import { cookies } from 'next/headers';

export async function getServerSession() {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const hasSessionCookie = allCookies.some(
      (cookie) => cookie.name.startsWith('better-auth')
    );

    if (!hasSessionCookie) {
      return null;
    }

    return {
      session: true,
      cookies: allCookies,
    };
  } catch (error) {
    return null;
  }
}

