import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";
import { checkRateLimit } from "./rateLimiter";

describe("rateLimiter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows the first request", () => {
    const result = checkRateLimit("test-key-1", 3, 60_000);
    expect(result.allowed).toBe(true);
    expect(result.retryAfterSeconds).toBeUndefined();
  });

  it("allows requests up to the max limit", () => {
    const key = "test-key-2";
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit(key, 5, 60_000);
      expect(result.allowed).toBe(true);
    }
  });

  it("blocks requests exceeding the max limit", () => {
    const key = "test-key-3";
    // Fill up the limit
    for (let i = 0; i < 3; i++) {
      checkRateLimit(key, 3, 60_000);
    }
    // Next request should be blocked
    const result = checkRateLimit(key, 3, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeDefined();
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("allows requests again after the window expires", () => {
    const key = "test-key-4";
    // Fill up the limit
    for (let i = 0; i < 3; i++) {
      checkRateLimit(key, 3, 60_000);
    }
    // Should be blocked now
    expect(checkRateLimit(key, 3, 60_000).allowed).toBe(false);

    // Advance time past the window
    vi.advanceTimersByTime(61_000);

    // Should be allowed again
    const result = checkRateLimit(key, 3, 60_000);
    expect(result.allowed).toBe(true);
  });

  it("uses separate counters for different keys", () => {
    const key1 = "test-key-5a";
    const key2 = "test-key-5b";

    // Fill up key1
    for (let i = 0; i < 2; i++) {
      checkRateLimit(key1, 2, 60_000);
    }
    expect(checkRateLimit(key1, 2, 60_000).allowed).toBe(false);

    // key2 should still be allowed
    expect(checkRateLimit(key2, 2, 60_000).allowed).toBe(true);
  });

  it("returns correct retryAfterSeconds", () => {
    const key = "test-key-6";
    // Make one request
    checkRateLimit(key, 1, 30_000);

    // Advance 10 seconds
    vi.advanceTimersByTime(10_000);

    // Should be blocked with ~20 seconds retry
    const result = checkRateLimit(key, 1, 30_000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBe(20);
  });

  it("handles sliding window correctly", () => {
    const key = "test-key-7";
    // Make 2 requests at t=0
    checkRateLimit(key, 3, 60_000);
    checkRateLimit(key, 3, 60_000);

    // Advance 30 seconds, make 1 more (total 3 in window)
    vi.advanceTimersByTime(30_000);
    const r1 = checkRateLimit(key, 3, 60_000);
    expect(r1.allowed).toBe(true);

    // Now at limit, next should be blocked
    const r2 = checkRateLimit(key, 3, 60_000);
    expect(r2.allowed).toBe(false);

    // Advance 31 more seconds (t=61s), first 2 requests expire
    vi.advanceTimersByTime(31_000);
    const r3 = checkRateLimit(key, 3, 60_000);
    expect(r3.allowed).toBe(true);
  });

  it("handles maxRequests of 1 (single request per window)", () => {
    const key = "test-key-8";
    expect(checkRateLimit(key, 1, 10_000).allowed).toBe(true);
    expect(checkRateLimit(key, 1, 10_000).allowed).toBe(false);

    vi.advanceTimersByTime(11_000);
    expect(checkRateLimit(key, 1, 10_000).allowed).toBe(true);
  });
});
