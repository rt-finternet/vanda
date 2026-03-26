import { describe, expect, it } from "vitest";
import { Resend } from "resend";

describe("Resend API Key Validation", () => {
  it("should have a valid Resend API key format and authenticate", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey).toBeTruthy();
    expect(apiKey).toMatch(/^re_/);

    const resend = new Resend(apiKey);

    // Call domains.list(): a sending-restricted key will return a 401
    // with name "restricted_api_key", which proves the key is valid but
    // correctly scoped to sending only. An invalid key returns "missing_api_key"
    // or "invalid_api_key".
    const { data, error } = await resend.domains.list();

    if (error) {
      // A restricted key is expected and correct for our use case
      expect(error.name).toBe("restricted_api_key");
      expect(error.message).toContain("send emails");
    } else {
      // Full-access key also works
      expect(data).toBeDefined();
    }
  });

  it("should have RESEND_FROM_EMAIL configured", () => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    expect(fromEmail).toBeTruthy();
    expect(fromEmail).toContain("@");
  });
});
