/**
 * Frontend API Abstraction Layer
 *
 * Provides fetch-based API functions that mirror the tRPC calls.
 * Used when VITE_DEPLOY_TARGET === "vercel".
 * When deployed on Manus, the existing tRPC hooks are used instead.
 *
 * This module is the Vercel-side equivalent of the tRPC client.
 */

import type {
  RequestPinInput,
  RequestPinOutput,
  VerifyPinInput,
  VerifyPinOutput,
  CheckSessionInput,
  CheckSessionOutput,
  LogoutOutput,
  AllowedEmail,
  AddEmailInput,
  ToggleEmailInput,
  DeleteEmailInput,
  AccessLogEntry,
  AccessSession,
  RevokeSessionInput,
  AdminStats,
  SuccessOutput,
} from "@shared/api";

const API_BASE = "/api";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  // Handle empty responses (204, or empty body)
  const text = await res.text();
  if (!res.ok) {
    let errorMessage = `Server error (${res.status})`;
    if (text) {
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
      }
    }
    throw new ApiError(errorMessage, res.status);
  }

  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

// ── Access API ──

export const accessApi = {
  requestPin: (input: RequestPinInput): Promise<RequestPinOutput> =>
    fetchJson(`${API_BASE}/auth/request-pin`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  verifyPin: (input: VerifyPinInput): Promise<VerifyPinOutput> =>
    fetchJson(`${API_BASE}/auth/verify-pin`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  checkSession: (input?: CheckSessionInput): Promise<CheckSessionOutput> => {
    const params = input?.sessionToken ? `?sessionToken=${encodeURIComponent(input.sessionToken)}` : "";
    return fetchJson(`${API_BASE}/auth/check-session${params}`, {
      method: "GET",
    });
  },

  logout: (): Promise<LogoutOutput> =>
    fetchJson(`${API_BASE}/auth/logout`, {
      method: "POST",
    }),
};

// ── Admin API ──

export const adminApi = {
  listEmails: (): Promise<AllowedEmail[]> =>
    fetchJson(`${API_BASE}/admin/emails`, { method: "GET" }),

  addEmail: (input: AddEmailInput): Promise<SuccessOutput> =>
    fetchJson(`${API_BASE}/admin/emails`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  toggleEmail: (input: ToggleEmailInput): Promise<SuccessOutput> =>
    fetchJson(`${API_BASE}/admin/emails/${input.id}/toggle`, {
      method: "PATCH",
      body: JSON.stringify({ isActive: input.isActive }),
    }),

  deleteEmail: (input: DeleteEmailInput): Promise<SuccessOutput> =>
    fetchJson(`${API_BASE}/admin/emails/${input.id}`, {
      method: "DELETE",
    }),

  listLogs: (limit = 100): Promise<AccessLogEntry[]> =>
    fetchJson(`${API_BASE}/admin/logs?limit=${limit}`, { method: "GET" }),

  listSessions: (): Promise<AccessSession[]> =>
    fetchJson(`${API_BASE}/admin/sessions`, { method: "GET" }),

  revokeSession: (input: RevokeSessionInput): Promise<SuccessOutput> =>
    fetchJson(`${API_BASE}/admin/sessions/${input.id}`, {
      method: "DELETE",
    }),

  stats: (): Promise<AdminStats> =>
    fetchJson(`${API_BASE}/admin/stats`, { method: "GET" }),
};
