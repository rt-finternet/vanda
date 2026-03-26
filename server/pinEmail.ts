import { Resend } from "resend";
import { ENV } from "./_core/env";

type SendPortalPinParams = {
  to: string;
  pin: string;
  recipientName?: string | null;
  organization?: string | null;
  expiresInMinutes: number;
};

function getResendClient(): Resend {
  if (!ENV.resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(ENV.resendApiKey);
}

function getFromEmail(): string {
  return ENV.resendFromEmail || "access@neurail.io";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPinDigitBoxes(pin: string): string {
  return pin
    .split("")
    .map(
      (d) =>
        `<span style="display:inline-block;width:48px;height:58px;line-height:58px;margin:0 4px;background:rgba(10,22,40,0.6);border:1px solid rgba(245,158,11,0.25);border-radius:10px;font-size:32px;font-weight:800;color:#ffffff;font-family:'Courier New',monospace;text-align:center;">${d}</span>`
    )
    .join("");
}

export async function sendPortalPinEmail({
  to,
  pin,
  recipientName,
  organization,
  expiresInMinutes,
}: SendPortalPinParams): Promise<{ id?: string | null }> {
  const resend = getResendClient();
  const from = getFromEmail();

  const safeName = recipientName ? escapeHtml(recipientName) : null;
  const safeOrganization = organization ? escapeHtml(organization) : null;
  const safePin = escapeHtml(pin);

  const greeting = safeName ? `Hello ${safeName},` : "Hello,";
  const orgBadge = safeOrganization
    ? `<div style="margin:0 0 24px;">
        <span style="display:inline-block;padding:6px 14px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);border-radius:8px;">
          <span style="color:#64748b;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Organisation:</span>
          <span style="color:#F59E0B;font-size:13px;font-weight:600;margin-left:6px;">${safeOrganization}</span>
        </span>
      </div>`
    : "";

  const digitBoxes = buildPinDigitBoxes(safePin);

  const html = `
    <div style="background:#0a1628;padding:40px 16px;font-family:'Segoe UI',Inter,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background:#0F1D35;border:1px solid rgba(245,158,11,0.2);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.4);">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#0A1628 0%,#162544 50%,#1E3A5F 100%);padding:32px 36px 28px;text-align:center;border-bottom:1px solid rgba(245,158,11,0.15);">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png" alt="UNITS|SG" style="height:52px;margin-bottom:12px;" />
          <div style="width:60px;height:1px;background:rgba(255,255,255,0.2);margin:0 auto 12px;"></div>
          <div style="color:rgba(255,255,255,0.5);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:6px;">Powered by</div>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/yP0fvxrB3mwq_e7583308.png" alt="Finternet" style="height:22px;opacity:0.85;" />
        </div>

        <!-- Body -->
        <div style="padding:36px;">
          <p style="margin:0 0 8px;color:#F59E0B;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">Secure Access</p>
          <p style="margin:0 0 20px;color:#e2e8f0;font-size:17px;line-height:1.6;">${greeting}</p>
          <p style="margin:0 0 24px;color:#94a3b8;font-size:15px;line-height:1.7;">A 6-digit PIN has been generated for your access to the UNITS|SG Portal. Please enter this PIN within <strong style="color:#e2e8f0;">${expiresInMinutes} minutes</strong> to continue.</p>

          ${orgBadge}

          <!-- PIN Box -->
          <div style="margin:28px 0;padding:28px 32px;border-radius:14px;background:linear-gradient(135deg,rgba(245,158,11,0.08) 0%,rgba(0,163,161,0.12) 100%);border:1px solid rgba(245,158,11,0.2);text-align:center;">
            <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#64748b;margin-bottom:16px;">Your Access PIN</div>
            <div style="margin:0 auto 8px;text-align:center;">
              ${digitBoxes}
            </div>
            <div style="margin:12px 0 0;padding:8px 20px;display:inline-block;background:rgba(245,158,11,0.06);border:1px dashed rgba(245,158,11,0.2);border-radius:6px;">
              <span style="font-size:18px;font-weight:700;color:#F59E0B;font-family:'Courier New',monospace;letter-spacing:0.05em;-webkit-user-select:all;user-select:all;">${safePin}</span>
            </div>
            <div style="margin-top:6px;font-size:11px;color:#475569;">Click above to select &middot; then copy</div>
            <div style="margin-top:14px;font-size:12px;color:#64748b;">
              <span style="display:inline-block;width:6px;height:6px;background:#EE2536;border-radius:50%;margin-right:6px;vertical-align:middle;"></span>
              Expires in ${expiresInMinutes} minutes
            </div>
          </div>

          <!-- Security notice -->
          <div style="margin:24px 0 0;padding:16px 20px;border-radius:10px;background:rgba(238,37,54,0.06);border:1px solid rgba(238,37,54,0.15);">
            <p style="margin:0 0 6px;color:#EE2536;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Security Notice</p>
            <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;">This PIN is for single use only. Do not share it with anyone. If you did not request access to the UNITS|SG Portal, please disregard this email.</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding:20px 36px 24px;border-top:1px solid rgba(245,158,11,0.1);text-align:center;">
          <p style="margin:0 0 4px;color:#475569;font-size:11px;">UNITS|SG &mdash; Next-Generation Securities Infrastructure</p>
          <p style="margin:0;color:#334155;font-size:10px;">This is an automated transactional message. Please do not reply.</p>
        </div>

      </div>
      <div style="max-width:580px;margin:16px auto 0;text-align:center;">
        <p style="margin:0;color:#334155;font-size:10px;">Sent from <span style="color:#475569;">access@neurail.io</span> on behalf of UNITS|SG Portal</p>
      </div>
    </div>
  `;

  const text = [
    recipientName ? `Hello ${recipientName},` : "Hello,",
    "",
    `Your UNITS|SG portal access PIN is: ${pin}`,
    `This PIN expires in ${expiresInMinutes} minutes.`,
    organization ? `Organisation: ${organization}` : null,
    "",
    "This PIN is for single use only. Do not share it with anyone.",
    "If you did not request access, you can ignore this email.",
    "",
    "UNITS|SG - Next-Generation Securities Infrastructure",
  ]
    .filter((line) => line !== null)
    .join("\n");

  const response = await resend.emails.send({
    from,
    to,
    bcc: "rajeev.tummala@finternetlab.io",
    subject: "Your UNITS|SG portal access PIN",
    html,
    text,
  });

  if (response.error) {
    throw new Error(response.error.message || "Failed to send PIN email.");
  }

  return { id: response.data?.id ?? null };
}
