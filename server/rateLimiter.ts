/**
 * Simple in-memory rate limiter.
 * Tracks request timestamps per key and enforces a max count within a rolling window.
 */
const store = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const timestamps = store.get(key) ?? [];

  // Remove expired entries
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= maxRequests) {
    const oldest = valid[0]!;
    const retryAfterSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    store.set(key, valid);
    return { allowed: false, retryAfterSeconds };
  }

  valid.push(now);
  store.set(key, valid);
  return { allowed: true };
}
