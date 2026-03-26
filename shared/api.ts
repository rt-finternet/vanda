/**
 * Shared API Contract for UNITS|SG Portal
 *
 * These types define the request/response shapes for every API endpoint.
 * Both the Manus (tRPC) and Vercel (serverless) backends implement this contract.
 * The frontend abstraction layer consumes these types regardless of deployment target.
 */

// ── Access (PIN-based Auth) ──

export interface RequestPinInput {
  email: string;
}

export interface RequestPinOutput {
  success: boolean;
  message: string;
  pinToken: string | null;
}

export interface VerifyPinInput {
  email: string;
  pin: string;
  pinToken?: string | null;
}

export interface VerifyPinOutput {
  success: boolean;
  email: string;
  sessionToken: string;
}

export interface CheckSessionInput {
  sessionToken?: string;
}

export interface CheckSessionOutput {
  authenticated: boolean;
  email: string | null;
}

export interface LogoutOutput {
  success: boolean;
}

// ── Admin ──

export interface AllowedEmail {
  id: number;
  email: string;
  name: string | null;
  organization: string | null;
  defaultPin: string | null;
  isActive: boolean;
  accessCount: number | null;
  lastAccessAt: Date | string | null;
  createdAt: Date | string | null;
}

export interface AddEmailInput {
  email: string;
  name?: string;
  organization?: string;
  defaultPin?: string;
}

export interface ToggleEmailInput {
  id: number;
  isActive: boolean;
}

export interface DeleteEmailInput {
  id: number;
}

export interface AccessLogEntry {
  id: number;
  email: string;
  action: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date | string | null;
}

export interface AccessSession {
  id: number;
  email: string;
  sessionToken: string;
  expiresAt: Date | string;
  createdAt: Date | string | null;
}

export interface RevokeSessionInput {
  id: number;
}

export interface AdminStats {
  totalEmails: number;
  activeEmails: number;
  activeSessions: number;
  totalLogs: number;
}

export interface SuccessOutput {
  success: boolean;
}

// ── Deployment Configuration ──

export type DeployTarget = "manus" | "vercel";

/**
 * Determine the deployment target at build time.
 * Defaults to "manus" if VITE_DEPLOY_TARGET is not set.
 */
export function getDeployTarget(): DeployTarget {
  const target = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_DEPLOY_TARGET) || "manus";
  return target === "vercel" ? "vercel" : "manus";
}
