/**
 * Vercel Serverless Helpers
 *
 * Shared utilities for all Vercel API routes:
 * - JSON response helpers
 * - Cookie parsing and setting
 * - CORS headers
 * - Method validation
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

// ── Response Helpers ──

export function jsonOk(res: VercelResponse, data: unknown, status = 200) {
  return res.status(status).json(data);
}

export function jsonError(res: VercelResponse, message: string, status = 400) {
  return res.status(status).json({ error: message });
}

export function methodNotAllowed(res: VercelResponse) {
  return jsonError(res, "Method not allowed", 405);
}

// ── Method Guard ──

export function requireMethod(req: VercelRequest, res: VercelResponse, method: string | string[]): boolean {
  const methods = Array.isArray(method) ? method : [method];
  if (!methods.includes(req.method || "")) {
    methodNotAllowed(res);
    return false;
  }
  return true;
}

// ── Cookie Helpers ──

const ACCESS_COOKIE = "units_sg_access";

export function getAccessTokenFromCookies(req: VercelRequest): string | null {
  const cookies = req.headers.cookie;
  if (!cookies) return null;
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${ACCESS_COOKIE}=([^;]+)`));
  return match ? match[1] : null;
}

export function setAccessCookie(res: VercelResponse, token: string, maxAgeMs = 24 * 60 * 60 * 1000) {
  const isProduction = process.env.NODE_ENV === "production";
  const cookie = [
    `${ACCESS_COOKIE}=${token}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${Math.floor(maxAgeMs / 1000)}`,
    isProduction ? "Secure" : "",
  ].filter(Boolean).join("; ");
  res.setHeader("Set-Cookie", cookie);
}

export function clearAccessCookie(res: VercelResponse) {
  const cookie = `${ACCESS_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  res.setHeader("Set-Cookie", cookie);
}

// ── Client IP ──

export function getClientIp(req: VercelRequest): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const first = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0];
    return first?.trim();
  }
  return req.socket?.remoteAddress;
}
