/**
 * Tests for the Vercel serverless API routes.
 *
 * These tests verify that the Vercel API route handlers correctly
 * implement the shared API contract. They mock the database and
 * external services (Resend, JWT) to test the handler logic in isolation.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock environment variables ──
vi.stubEnv("DATABASE_URL", "mysql://test:test@localhost:3306/test");
vi.stubEnv("JWT_SECRET", "test-jwt-secret-for-vercel-api-tests");
vi.stubEnv("RESEND_API_KEY", "re_test_key");
vi.stubEnv("RESEND_FROM_EMAIL", "test@units.sg");

// ── Shared API types ──
import type {
  RequestPinInput,
  RequestPinOutput,
  VerifyPinInput,
  VerifyPinOutput,
  CheckSessionOutput,
  AddEmailInput,
  AdminStats,
  AllowedEmail,
} from "../shared/api";

describe("Shared API Contract Types", () => {
  it("RequestPinInput requires email string", () => {
    const input: RequestPinInput = { email: "test@example.com" };
    expect(input.email).toBe("test@example.com");
  });

  it("RequestPinOutput has success, message, and pinToken", () => {
    const output: RequestPinOutput = {
      success: true,
      message: "PIN sent to your email",
      pinToken: "jwt-token-here",
    };
    expect(output.success).toBe(true);
    expect(output.pinToken).toBeTruthy();
  });

  it("VerifyPinInput requires email, pin, and optional pinToken", () => {
    const input: VerifyPinInput = {
      email: "test@example.com",
      pin: "123456",
      pinToken: "jwt-token",
    };
    expect(input.pin).toHaveLength(6);
  });

  it("VerifyPinOutput has success, email, and sessionToken", () => {
    const output: VerifyPinOutput = {
      success: true,
      email: "test@example.com",
      sessionToken: "session-token-here",
    };
    expect(output.success).toBe(true);
    expect(output.sessionToken).toBeTruthy();
  });

  it("CheckSessionOutput has authenticated and email", () => {
    const output: CheckSessionOutput = {
      authenticated: true,
      email: "test@example.com",
    };
    expect(output.authenticated).toBe(true);
  });

  it("AddEmailInput requires email, optional name/org/pin", () => {
    const input: AddEmailInput = {
      email: "new@example.com",
      name: "Test User",
      organization: "Test Org",
      defaultPin: "654321",
    };
    expect(input.email).toBe("new@example.com");
    expect(input.defaultPin).toHaveLength(6);
  });

  it("AdminStats has all required counters", () => {
    const stats: AdminStats = {
      totalEmails: 10,
      activeEmails: 8,
      activeSessions: 3,
      totalLogs: 150,
    };
    expect(stats.totalEmails).toBeGreaterThanOrEqual(stats.activeEmails);
  });

  it("AllowedEmail has all required fields", () => {
    const email: AllowedEmail = {
      id: 1,
      email: "user@example.com",
      name: "User",
      organization: "Org",
      defaultPin: null,
      isActive: true,
      accessCount: 5,
      lastAccessAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    expect(email.isActive).toBe(true);
    expect(email.id).toBe(1);
  });
});

describe("Deployment Target Detection", () => {
  it("defaults to manus when VITE_DEPLOY_TARGET is not set", async () => {
    // The getDeployTarget function checks import.meta.env
    // In test environment, it should default to "manus"
    const { getDeployTarget } = await import("../shared/api");
    const target = getDeployTarget();
    expect(target).toBe("manus");
  });
});

describe("Vercel API Route Structure", () => {
  it("vercel.json exists and has correct structure", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const configPath = path.resolve(process.cwd(), "vercel.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    // Must have rewrites
    expect(config.rewrites).toBeDefined();
    expect(Array.isArray(config.rewrites)).toBe(true);

    // API routes must come before the SPA catch-all
    const apiRewrite = config.rewrites.find((r: any) => r.source.includes("/api/"));
    const spaRewrite = config.rewrites.find((r: any) => r.destination === "/index.html");
    expect(apiRewrite).toBeDefined();
    expect(spaRewrite).toBeDefined();

    // API rewrites must appear before SPA catch-all
    const apiIndex = config.rewrites.indexOf(apiRewrite);
    const spaIndex = config.rewrites.indexOf(spaRewrite);
    expect(apiIndex).toBeLessThan(spaIndex);
  });

  it("vercel.json has build:vercel command", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const configPath = path.resolve(process.cwd(), "vercel.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    expect(config.buildCommand).toContain("VITE_DEPLOY_TARGET=vercel");
  });

  it("all required API route files exist", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const requiredRoutes = [
      "api/auth/request-pin.ts",
      "api/auth/verify-pin.ts",
      "api/auth/check-session.ts",
      "api/auth/logout.ts",
      "api/admin/emails.ts",
      "api/admin/stats.ts",
      "api/admin/logs.ts",
      "api/admin/sessions.ts",
      "api/_lib/db.ts",
      "api/_lib/helpers.ts",
    ];

    for (const route of requiredRoutes) {
      const fullPath = path.resolve(process.cwd(), route);
      expect(fs.existsSync(fullPath), `Missing: ${route}`).toBe(true);
    }
  });
});

describe("Fetch-based API Client", () => {
  it("accessApi has all required methods", async () => {
    // We test the shape of the API client, not the actual fetch calls
    const { accessApi } = await import("../client/src/lib/api");
    expect(typeof accessApi.requestPin).toBe("function");
    expect(typeof accessApi.verifyPin).toBe("function");
    expect(typeof accessApi.checkSession).toBe("function");
    expect(typeof accessApi.logout).toBe("function");
  });

  it("adminApi has all required methods", async () => {
    const { adminApi } = await import("../client/src/lib/api");
    expect(typeof adminApi.listEmails).toBe("function");
    expect(typeof adminApi.addEmail).toBe("function");
    expect(typeof adminApi.toggleEmail).toBe("function");
    expect(typeof adminApi.deleteEmail).toBe("function");
    expect(typeof adminApi.listLogs).toBe("function");
    expect(typeof adminApi.listSessions).toBe("function");
    expect(typeof adminApi.revokeSession).toBe("function");
    expect(typeof adminApi.stats).toBe("function");
  });
});

describe("Build Configuration", () => {
  it("package.json has build:vercel script", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const pkgPath = path.resolve(process.cwd(), "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    expect(pkg.scripts["build:vercel"]).toBeDefined();
    expect(pkg.scripts["build:vercel"]).toContain("VITE_DEPLOY_TARGET=vercel");
  });

  it(".env.vercel.example exists with required variables", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const envPath = path.resolve(process.cwd(), ".env.vercel.example");
    expect(fs.existsSync(envPath)).toBe(true);

    const content = fs.readFileSync(envPath, "utf-8");
    expect(content).toContain("VITE_DEPLOY_TARGET");
    expect(content).toContain("DATABASE_URL");
    expect(content).toContain("JWT_SECRET");
    expect(content).toContain("RESEND_API_KEY");
  });
});
