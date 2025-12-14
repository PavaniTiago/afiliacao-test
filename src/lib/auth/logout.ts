export async function performLogout(): Promise<void> {
  await fetch('/api/auth/sign-out', {
    method: 'POST',
    credentials: 'include',
  });

  window.location.href = '/login';
}
