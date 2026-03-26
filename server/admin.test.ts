import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/* ── Mocks ── */

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

/* ── Helpers ── */

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

/** Chainable select: .from().orderBy().limit() or .from().where().orderBy() */
function chainableSelect(rows: any[]) {
  const chain: any = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue(rows),
  };
  // When no .limit() is called (e.g., listEmails), the orderBy resolves the promise
  chain.orderBy = vi.fn().mockImplementation(() => {
    const p = Promise.resolve(rows);
    (p as any).limit = vi.fn().mockResolvedValue(rows);
    return p;
  });
  chain.from = vi.fn().mockReturnValue(chain);
  chain.where = vi.fn().mockReturnValue(chain);
  return chain;
}

/** Chainable insert: .values() */
function chainableInsert(error?: any) {
  const chain = {
    values: error ? vi.fn().mockRejectedValue(error) : vi.fn().mockResolvedValue(undefined),
  };
  return chain;
}

/** Chainable update: .set().where() */
function chainableUpdate() {
  const chain = {
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue(undefined),
  };
  return chain;
}

/** Chainable delete: .where() */
function chainableDelete() {
  const chain = {
    where: vi.fn().mockResolvedValue(undefined),
  };
  return chain;
}

/* ── Tests ── */

describe("admin router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    vi.clearAllMocks();
    caller = appRouter.createCaller(createPublicContext());
  });

  describe("listEmails", () => {
    it("returns an array of allowed emails", async () => {
      const rows = [
        { id: 1, email: "alice@example.com", name: "Alice", organization: "Org A", isActive: true, defaultPin: null, accessCount: 3, lastAccessAt: null, createdAt: new Date() },
        { id: 2, email: "bob@example.com", name: "Bob", organization: "Org B", isActive: false, defaultPin: "123456", accessCount: 0, lastAccessAt: null, createdAt: new Date() },
      ];
      mockSelect.mockReturnValue(chainableSelect(rows));

      const result = await caller.admin.listEmails();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0].email).toBe("alice@example.com");
    });

    it("returns empty array when no emails exist", async () => {
      mockSelect.mockReturnValue(chainableSelect([]));
      const result = await caller.admin.listEmails();
      expect(result).toEqual([]);
    });
  });

  describe("addEmail", () => {
    it("adds a new email successfully", async () => {
      mockInsert.mockReturnValue(chainableInsert());
      const result = await caller.admin.addEmail({ email: "new@example.com" });
      expect(result.success).toBe(true);
    });

    it("adds email with all optional fields", async () => {
      mockInsert.mockReturnValue(chainableInsert());
      const result = await caller.admin.addEmail({
        email: "full@example.com",
        name: "Full User",
        organization: "Full Org",
        defaultPin: "654321",
      });
      expect(result.success).toBe(true);
    });

    it("lowercases the email before inserting", async () => {
      const insertChain = chainableInsert();
      mockInsert.mockReturnValue(insertChain);

      await caller.admin.addEmail({ email: "UPPER@EXAMPLE.COM" });

      expect(insertChain.values).toHaveBeenCalledWith(
        expect.objectContaining({ email: "upper@example.com" })
      );
    });

    it("rejects invalid email format", async () => {
      await expect(
        caller.admin.addEmail({ email: "not-an-email" })
      ).rejects.toThrow();
    });

    it("rejects PIN that is not exactly 6 digits", async () => {
      await expect(
        caller.admin.addEmail({ email: "test@example.com", defaultPin: "12" })
      ).rejects.toThrow();
    });

    it("rejects PIN that is too long", async () => {
      await expect(
        caller.admin.addEmail({ email: "test@example.com", defaultPin: "1234567" })
      ).rejects.toThrow();
    });

    it("handles duplicate email conflict", async () => {
      const dupError = new Error("Duplicate entry");
      (dupError as any).code = "ER_DUP_ENTRY";
      mockInsert.mockReturnValue(chainableInsert(dupError));

      await expect(
        caller.admin.addEmail({ email: "dup@example.com" })
      ).rejects.toThrow(/already exists/);
    });

    it("allows adding email without optional PIN (undefined)", async () => {
      const insertChain = chainableInsert();
      mockInsert.mockReturnValue(insertChain);

      const result = await caller.admin.addEmail({ email: "nopin@example.com" });
      expect(result.success).toBe(true);
      expect(insertChain.values).toHaveBeenCalledWith(
        expect.objectContaining({ defaultPin: null })
      );
    });
  });

  describe("toggleEmail", () => {
    it("toggles email to active", async () => {
      mockUpdate.mockReturnValue(chainableUpdate());
      const result = await caller.admin.toggleEmail({ id: 1, isActive: true });
      expect(result.success).toBe(true);
    });

    it("toggles email to inactive", async () => {
      mockUpdate.mockReturnValue(chainableUpdate());
      const result = await caller.admin.toggleEmail({ id: 1, isActive: false });
      expect(result.success).toBe(true);
    });

    it("rejects non-numeric id", async () => {
      await expect(
        caller.admin.toggleEmail({ id: "abc" as any, isActive: true })
      ).rejects.toThrow();
    });
  });

  describe("deleteEmail", () => {
    it("deletes an email by id", async () => {
      mockDelete.mockReturnValue(chainableDelete());
      const result = await caller.admin.deleteEmail({ id: 1 });
      expect(result.success).toBe(true);
    });

    it("rejects non-numeric id", async () => {
      await expect(
        caller.admin.deleteEmail({ id: "abc" as any })
      ).rejects.toThrow();
    });
  });

  describe("revokeSession", () => {
    it("revokes a session by id", async () => {
      mockDelete.mockReturnValue(chainableDelete());
      const result = await caller.admin.revokeSession({ id: 42 });
      expect(result.success).toBe(true);
    });
  });

  describe("listLogs", () => {
    it("returns access logs with default limit", async () => {
      const logs = [
        { id: 1, email: "user@example.com", action: "pin_requested", ipAddress: "1.2.3.4", createdAt: new Date() },
      ];
      mockSelect.mockReturnValue(chainableSelect(logs));

      const result = await caller.admin.listLogs();
      expect(Array.isArray(result)).toBe(true);
    });

    it("accepts custom limit", async () => {
      mockSelect.mockReturnValue(chainableSelect([]));
      const result = await caller.admin.listLogs({ limit: 10 });
      expect(Array.isArray(result)).toBe(true);
    });

    it("rejects limit below 1", async () => {
      await expect(
        caller.admin.listLogs({ limit: 0 })
      ).rejects.toThrow();
    });

    it("rejects limit above 500", async () => {
      await expect(
        caller.admin.listLogs({ limit: 501 })
      ).rejects.toThrow();
    });
  });

  describe("listSessions", () => {
    it("returns active sessions", async () => {
      const sessions = [
        { id: 1, email: "user@example.com", sessionToken: "abc", expiresAt: new Date(Date.now() + 86400000), createdAt: new Date() },
      ];
      mockSelect.mockReturnValue(chainableSelect(sessions));

      const result = await caller.admin.listSessions();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("stats", () => {
    it("returns numeric stats", async () => {
      // Stats does three separate select queries, each using destructuring:
      // const [emailRows] = await db.select({...}).from(...)
      // The mock must return an awaitable that resolves to an array.
      let callCount = 0;
      mockSelect.mockImplementation(() => {
        callCount++;
        let data: any[];
        if (callCount === 1) {
          data = [{ total: 5, active: 3 }];
        } else if (callCount === 2) {
          data = [{ count: 2 }];
        } else {
          data = [{ count: 10 }];
        }
        // Build a chain where the terminal call resolves to the array
        const chain: any = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue(data),
          then: (resolve: any, reject?: any) => Promise.resolve(data).then(resolve, reject),
        };
        return chain;
      });

      const result = await caller.admin.stats();
      expect(typeof result.totalEmails).toBe("number");
      expect(typeof result.activeEmails).toBe("number");
      expect(typeof result.activeSessions).toBe("number");
      expect(typeof result.totalLogs).toBe("number");
      expect(result.totalEmails).toBe(5);
      expect(result.activeEmails).toBe(3);
      expect(result.activeSessions).toBe(2);
      expect(result.totalLogs).toBe(10);
    });

    it("handles zero counts gracefully", async () => {
      mockSelect.mockImplementation(() => {
        const data = [{ total: 0, active: 0, count: 0 }];
        const chain: any = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue(data),
          then: (resolve: any, reject?: any) => Promise.resolve(data).then(resolve, reject),
        };
        return chain;
      });

      const result = await caller.admin.stats();
      expect(result.totalEmails).toBe(0);
      expect(result.activeEmails).toBe(0);
    });
  });
});
