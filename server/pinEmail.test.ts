import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock Resend before importing the module
const mockSend = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

// Ensure env vars are set for the module
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || "re_test_key";
process.env.RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "test@neurail.io";

import { sendPortalPinEmail } from "./pinEmail";

describe("sendPortalPinEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends an email with the correct recipient", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-123" }, error: null });

    const result = await sendPortalPinEmail({
      to: "user@example.com",
      pin: "123456",
      expiresInMinutes: 10,
    });

    expect(result.id).toBe("email-123");
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "user@example.com",
        subject: "Your UNITS|SG portal access PIN",
      })
    );
  });

  it("includes the PIN in both HTML and text body", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-456" }, error: null });

    await sendPortalPinEmail({
      to: "user@example.com",
      pin: "987654",
      expiresInMinutes: 15,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain("987654");
    expect(call.text).toContain("987654");
  });

  it("includes recipient name in greeting when provided", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-789" }, error: null });

    await sendPortalPinEmail({
      to: "alice@example.com",
      pin: "111111",
      recipientName: "Alice",
      expiresInMinutes: 10,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain("Hello Alice,");
    expect(call.text).toContain("Hello Alice,");
  });

  it("uses generic greeting when no name provided", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-000" }, error: null });

    await sendPortalPinEmail({
      to: "user@example.com",
      pin: "222222",
      expiresInMinutes: 10,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain("Hello,");
    expect(call.text).toContain("Hello,");
  });

  it("includes organization badge when provided", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-org" }, error: null });

    await sendPortalPinEmail({
      to: "user@example.com",
      pin: "333333",
      organization: "Finternet Labs",
      expiresInMinutes: 10,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain("Finternet Labs");
    expect(call.text).toContain("Finternet Labs");
  });

  it("includes expiration time in the email", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-exp" }, error: null });

    await sendPortalPinEmail({
      to: "user@example.com",
      pin: "444444",
      expiresInMinutes: 5,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain("5 minutes");
    expect(call.text).toContain("5 minutes");
  });

  it("sends BCC to rajeev.tummala@finternetlab.io", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-bcc" }, error: null });

    await sendPortalPinEmail({
      to: "user@example.com",
      pin: "555555",
      expiresInMinutes: 10,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.bcc).toBe("rajeev.tummala@finternetlab.io");
  });

  it("escapes HTML special characters in name and organization", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-xss" }, error: null });

    await sendPortalPinEmail({
      to: "user@example.com",
      pin: "666666",
      recipientName: '<script>alert("xss")</script>',
      organization: '"><img src=x onerror=alert(1)>',
      expiresInMinutes: 10,
    });

    const call = mockSend.mock.calls[0][0];
    // The escapeHtml function converts < > " ' to HTML entities
    expect(call.html).not.toContain("<script>");
    expect(call.html).not.toContain('<img src=x');
    expect(call.html).toContain("&lt;script&gt;");
    expect(call.html).toContain("&quot;&gt;&lt;img");
  });

  it("renders 6 individual digit boxes in HTML", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-digits" }, error: null });

    await sendPortalPinEmail({
      to: "user@example.com",
      pin: "123456",
      expiresInMinutes: 10,
    });

    const call = mockSend.mock.calls[0][0];
    // Each digit should be in its own span
    expect(call.html).toContain(">1</span>");
    expect(call.html).toContain(">2</span>");
    expect(call.html).toContain(">3</span>");
    expect(call.html).toContain(">4</span>");
    expect(call.html).toContain(">5</span>");
    expect(call.html).toContain(">6</span>");
  });

  it("throws when Resend returns an error", async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "Invalid recipient" },
    });

    await expect(
      sendPortalPinEmail({
        to: "bad@example.com",
        pin: "777777",
        expiresInMinutes: 10,
      })
    ).rejects.toThrow("Invalid recipient");
  });

  it("returns null id when Resend returns no data", async () => {
    mockSend.mockResolvedValue({ data: null, error: null });

    const result = await sendPortalPinEmail({
      to: "user@example.com",
      pin: "888888",
      expiresInMinutes: 10,
    });

    expect(result.id).toBeNull();
  });

  it("includes security notice in the email", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-sec" }, error: null });

    await sendPortalPinEmail({
      to: "user@example.com",
      pin: "999999",
      expiresInMinutes: 10,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain("Security Notice");
    expect(call.html).toContain("single use only");
    expect(call.text).toContain("single use only");
  });
});
