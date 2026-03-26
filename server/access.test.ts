import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
      ip: "127.0.0.1",
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("access router", () => {
  it("should have requestPin procedure defined", () => {
    const caller = appRouter.createCaller(createPublicContext());
    // Verify the access.requestPin procedure exists
    expect(caller.access).toBeDefined();
    expect(caller.access.requestPin).toBeDefined();
    expect(typeof caller.access.requestPin).toBe("function");
  });

  it("should have verifyPin procedure defined", () => {
    const caller = appRouter.createCaller(createPublicContext());
    expect(caller.access.verifyPin).toBeDefined();
    expect(typeof caller.access.verifyPin).toBe("function");
  });

  it("should have checkSession procedure defined", () => {
    const caller = appRouter.createCaller(createPublicContext());
    expect(caller.access.checkSession).toBeDefined();
    expect(typeof caller.access.checkSession).toBe("function");
  });

  it("should reject requestPin with invalid email format", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.access.requestPin({ email: "not-an-email" })
    ).rejects.toThrow();
  });

  it("should reject verifyPin with invalid input", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.access.verifyPin({ email: "test@example.com", pin: "12" })
    ).rejects.toThrow();
  });

  it("checkSession should return not authenticated for empty token", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.access.checkSession({ sessionToken: "" });
    expect(result.authenticated).toBe(false);
  });

  it("checkSession should return not authenticated for invalid token", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.access.checkSession({ sessionToken: "invalid-jwt-token" });
    expect(result.authenticated).toBe(false);
  });
});
