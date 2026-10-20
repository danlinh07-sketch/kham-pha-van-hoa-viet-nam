/**
 * Secure password hashing using Web Crypto API (SHA-256 + Salt)
 * Never stores plain-text passwords in memory or storage.
 */
export async function hashPassword(password: string, salt: string = 'viet_discover_salt_v1'): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
