import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import jwt from "jsonwebtoken";

/* ── Mocks ── */

// Mock getDb to return a fake Drizzle-like DB
const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();

const mockDb = {
  select: mockSelect,
  insert: mockInsert,
  update: mockUpdate,
  delete: mockDelete,
};

vi.mock("./db", () => ({
  getDb: vi.fn(async () => mockDb),
}));

// Mock sendPortalPinEmail
vi.mock("./pinEmail", () => ({
  sendPortalPinEmail: vi.fn(async () => ({ id: "mock-email-id" })),
}));

// Mock notifyOwner
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

// Mock rate limiter to always allow
vi.mock("./rateLimiter", () => ({
  checkRateLimit: vi.fn(() => ({ allowed: true })),
}));

/* ── Helpers ── */

const TEST_SECRET = process.env.JWT_SECRET || "test-secret-key-for-vitest";

function createPublicContext(): {
  ctx: TrpcContext;
  cookieJar: Record<string, { value: string; options: Record<string, unknown> }>;
  clearedCookies: string[];
} {
  const cookieJar: Record<string, { value: string; options: Record<string, unknown> }> = {};
  const clearedCookies: string[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as unknown as TrpcContext["req"],
    res: {
      clearCookie: vi.fn((name: string) => {
        clearedCookies.push(name);
      }),
      cookie: vi.fn((name: string, value: string, options: Record<string, unknown>) => {
        cookieJar[name] = { value, options };
      }),
    } as unknown as TrpcContext["res"],
  };

  return { ctx, cookieJar, clearedCookies };
}

/** Build a chainable mock that simulates Drizzle's select().from().where().limit() */
function chainableSelect(rows: any[]) {
  const chain = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue(rows),
  };
  return chain;
}

/** Build a chainable mock for insert().values() */
function chainableInsert() {
  const chain = {
    values: vi.fn().mockResolvedValue(undefined),
  };
  return chain;
}

/** Build a chainable mock for update().set().where() */
function chainableUpdate() {
  const chain = {
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue(undefined),
  };
  return chain;
}

/** Build a chainable mock for delete().where() */
function chainableDelete() {
  const chain = {
    where: vi.fn().mockResolvedValue(undefined),
  };
  return chain;
}

/* ── Tests ── */

describe("access router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("requestPin", () => {
    it("rejects invalid email format", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(caller.access.requestPin({ email: "not-an-email" })).rejects.toThrow();
    });

    it("rejects email not in allowed list", async () => {
      mockSelect.mockReturnValue(chainableSelect([]));
      mockInsert.mockReturnValue(chainableInsert());

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.requestPin({ email: "unknown@example.com" })
      ).rejects.toThrow(/not authorised/);
    });

    it("returns static PIN message when user has a defaultPin", async () => {
      const allowedRow = {
        id: 1,
        email: "static@example.com",
        name: "Static User",
        organization: "Test Org",
        defaultPin: "123456",
        isActive: true,
        accessCount: 0,
        lastAccessAt: null,
        createdAt: new Date(),
      };
      mockSelect.mockReturnValue(chainableSelect([allowedRow]));
      mockInsert.mockReturnValue(chainableInsert());

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.requestPin({ email: "static@example.com" });

      expect(result.success).toBe(true);
      expect(result.pinToken).toBeNull();
      expect(result.message).toContain("assigned PIN");
    });

    it("sends dynamic PIN email and returns pinToken for users without defaultPin", async () => {
      const allowedRow = {
        id: 2,
        email: "dynamic@example.com",
        name: "Dynamic User",
        organization: "Test Org",
        defaultPin: null,
        isActive: true,
        accessCount: 0,
        lastAccessAt: null,
        createdAt: new Date(),
      };
      mockSelect.mockReturnValue(chainableSelect([allowedRow]));
      mockInsert.mockReturnValue(chainableInsert());

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.requestPin({ email: "dynamic@example.com" });

      expect(result.success).toBe(true);
      expect(result.pinToken).toBeTruthy();
      expect(typeof result.pinToken).toBe("string");
      expect(result.message).toContain("6-digit PIN");

      // Verify the pinToken is a valid JWT containing the email and a 6-digit PIN
      const decoded = jwt.verify(result.pinToken!, TEST_SECRET) as any;
      expect(decoded.email).toBe("dynamic@example.com");
      expect(decoded.pin).toMatch(/^\d{6}$/);
      expect(decoded.purpose).toBe("pin-verification");
    });

    it("lowercases email before processing", async () => {
      const allowedRow = {
        id: 3,
        email: "upper@example.com",
        name: null,
        organization: null,
        defaultPin: "654321",
        isActive: true,
        accessCount: 0,
        lastAccessAt: null,
        createdAt: new Date(),
      };
      mockSelect.mockReturnValue(chainableSelect([allowedRow]));
      mockInsert.mockReturnValue(chainableInsert());

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.requestPin({ email: "UPPER@EXAMPLE.COM" });
      expect(result.success).toBe(true);
    });

    it("handles email delivery failure with owner notification fallback", async () => {
      const { sendPortalPinEmail } = await import("./pinEmail");
      (sendPortalPinEmail as any).mockRejectedValueOnce(new Error("SMTP failure"));

      const allowedRow = {
        id: 4,
        email: "fallback@example.com",
        name: "Fallback User",
        organization: null,
        defaultPin: null,
        isActive: true,
        accessCount: 0,
        lastAccessAt: null,
        createdAt: new Date(),
      };
      mockSelect.mockReturnValue(chainableSelect([allowedRow]));
      mockInsert.mockReturnValue(chainableInsert());

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.requestPin({ email: "fallback@example.com" });

      expect(result.success).toBe(true);
      expect(result.message).toContain("fallback");
    });

    it("rejects when rate limited", async () => {
      const { checkRateLimit } = await import("./rateLimiter");
      (checkRateLimit as any).mockReturnValueOnce({ allowed: false, retryAfterSeconds: 300 });

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.requestPin({ email: "limited@example.com" })
      ).rejects.toThrow(/Too many PIN requests/);
    });
  });

  describe("verifyPin", () => {
    it("rejects invalid email format", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.verifyPin({ email: "bad", pin: "123456" })
      ).rejects.toThrow();
    });

    it("rejects PIN shorter than 6 digits", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.verifyPin({ email: "test@example.com", pin: "12" })
      ).rejects.toThrow();
    });

    it("verifies dynamic PIN via valid pinToken", async () => {
      const pinToken = jwt.sign(
        { email: "user@example.com", pin: "987654", name: "Test", organization: null, purpose: "pin-verification" },
        TEST_SECRET,
        { expiresIn: "10m" }
      );

      mockInsert.mockReturnValue(chainableInsert());

      const { ctx, cookieJar } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.verifyPin({
        email: "user@example.com",
        pin: "987654",
        pinToken,
      });

      expect(result.success).toBe(true);
      expect(result.email).toBe("user@example.com");
      expect(result.sessionToken).toBeTruthy();
      expect(typeof result.sessionToken).toBe("string");
      expect(result.sessionToken!.length).toBeGreaterThan(10);

      // Verify session cookie was set
      expect(cookieJar["units_sg_access"]).toBeDefined();
      expect(cookieJar["units_sg_access"].options.maxAge).toBe(24 * 60 * 60 * 1000);
    });

    it("rejects wrong PIN for dynamic flow", async () => {
      const pinToken = jwt.sign(
        { email: "user@example.com", pin: "111111", name: null, organization: null, purpose: "pin-verification" },
        TEST_SECRET,
        { expiresIn: "10m" }
      );

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.verifyPin({ email: "user@example.com", pin: "999999", pinToken })
      ).rejects.toThrow(/Invalid PIN/);
    });

    it("rejects expired pinToken", async () => {
      const pinToken = jwt.sign(
        { email: "user@example.com", pin: "111111", purpose: "pin-verification" },
        TEST_SECRET,
        { expiresIn: "-1s" } // already expired
      );

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.verifyPin({ email: "user@example.com", pin: "111111", pinToken })
      ).rejects.toThrow(/expired/);
    });

    it("rejects email mismatch in pinToken", async () => {
      const pinToken = jwt.sign(
        { email: "other@example.com", pin: "111111", purpose: "pin-verification" },
        TEST_SECRET,
        { expiresIn: "10m" }
      );

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.verifyPin({ email: "user@example.com", pin: "111111", pinToken })
      ).rejects.toThrow(/mismatch/);
    });

    it("rejects invalid purpose in pinToken", async () => {
      const pinToken = jwt.sign(
        { email: "user@example.com", pin: "111111", purpose: "wrong-purpose" },
        TEST_SECRET,
        { expiresIn: "10m" }
      );

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.verifyPin({ email: "user@example.com", pin: "111111", pinToken })
      ).rejects.toThrow(/Invalid token purpose/);
    });

    it("verifies static PIN against database", async () => {
      const emailRecord = {
        id: 1,
        email: "static@example.com",
        defaultPin: "654321",
        isActive: true,
        accessCount: 5,
        lastAccessAt: null,
      };
      mockSelect.mockReturnValue(chainableSelect([emailRecord]));
      mockInsert.mockReturnValue(chainableInsert());
      mockUpdate.mockReturnValue(chainableUpdate());

      const { ctx, cookieJar } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.verifyPin({
        email: "static@example.com",
        pin: "654321",
      });

      expect(result.success).toBe(true);
      expect(result.email).toBe("static@example.com");
      expect(cookieJar["units_sg_access"]).toBeDefined();
    });

    it("rejects wrong static PIN", async () => {
      const emailRecord = {
        id: 1,
        email: "static@example.com",
        defaultPin: "654321",
        isActive: true,
        accessCount: 0,
        lastAccessAt: null,
      };
      mockSelect.mockReturnValue(chainableSelect([emailRecord]));

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(
        caller.access.verifyPin({ email: "static@example.com", pin: "000000" })
      ).rejects.toThrow(/Invalid or expired PIN/);
    });
  });

  describe("checkSession", () => {
    it("returns not authenticated when no token provided", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.checkSession();
      expect(result.authenticated).toBe(false);
      expect(result.email).toBeNull();
    });

    it("returns not authenticated for empty token", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.checkSession({ sessionToken: "" });
      expect(result.authenticated).toBe(false);
    });

    it("returns authenticated for valid session token in DB", async () => {
      const sessionRow = {
        id: 1,
        email: "user@example.com",
        sessionToken: "valid-session-token-abc",
        expiresAt: new Date(Date.now() + 86400000),
        createdAt: new Date(),
      };
      mockSelect.mockReturnValue(chainableSelect([sessionRow]));

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.checkSession({ sessionToken: "valid-session-token-abc" });
      expect(result.authenticated).toBe(true);
      expect(result.email).toBe("user@example.com");
    });

    it("returns not authenticated for expired session", async () => {
      mockSelect.mockReturnValue(chainableSelect([]));

      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.checkSession({ sessionToken: "expired-token" });
      expect(result.authenticated).toBe(false);
      expect(result.email).toBeNull();
    });

    it("reads session token from cookie header when not passed as input", async () => {
      const sessionRow = {
        id: 1,
        email: "cookie@example.com",
        sessionToken: "cookie-token-xyz",
        expiresAt: new Date(Date.now() + 86400000),
        createdAt: new Date(),
      };
      mockSelect.mockReturnValue(chainableSelect([sessionRow]));

      const { ctx } = createPublicContext();
      (ctx.req.headers as any).cookie = "units_sg_access=cookie-token-xyz; other=value";
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.checkSession();
      expect(result.authenticated).toBe(true);
      expect(result.email).toBe("cookie@example.com");
    });
  });

  describe("logout", () => {
    it("clears session cookie and deletes session from DB", async () => {
      const { ctx, clearedCookies } = createPublicContext();
      (ctx.req.headers as any).cookie = "units_sg_access=session-to-delete";
      mockDelete.mockReturnValue(chainableDelete());

      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.logout();

      expect(result.success).toBe(true);
      expect(clearedCookies).toContain("units_sg_access");
    });

    it("succeeds even when no session cookie exists", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.access.logout();
      expect(result.success).toBe(true);
    });
  });
});
