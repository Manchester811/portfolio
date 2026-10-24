import { NextResponse } from "next/server";

export const runtime = "nodejs";
/** Never cache this route — it is a POST endpoint that talks to an API. */
export const dynamic = "force-dynamic";

/* ── Config ─────────────────────────────────────────────────────────────── */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL?.trim() || "rishabhkanha007@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>";

/* ── Limits ─────────────────────────────────────────────────────────────── */

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_SUBJECT = 150;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

/**
 * In-memory rate limiter.
 *
 * Best-effort only: on Vercel each serverless instance keeps its own map, so
 * the effective limit scales with traffic rather than being global. Good enough
 * to stop a script hammering one warm instance; for a hard guarantee use a
 * shared store (Upstash/Vercel KV) — see TODO in the final report.
 */
const hits = new Map<string, number[]>();

const rateLimited = (key: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
};

/* ── Validation ─────────────────────────────────────────────────────────── */

interface Payload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** Honeypot — must stay empty. Bots fill every input they find. */
  website: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const asString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

type Result = { ok: true; payload: Payload } | { ok: false; error: string };

const validate = (body: Record<string, unknown>): Result => {
  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const subject = asString(body.subject);
  const message = asString(body.message);
  const website = asString(body.website);

  if (!name) return { ok: false, error: "Please enter your name." };
  if (name.length > MAX_NAME) {
    return { ok: false, error: `Name must be under ${MAX_NAME} characters.` };
  }

  if (!email) return { ok: false, error: "Please enter your email address." };
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (phone.length > MAX_PHONE) {
    return { ok: false, error: `Phone must be under ${MAX_PHONE} characters.` };
  }

  if (subject.length > MAX_SUBJECT) {
    return { ok: false, error: `Subject must be under ${MAX_SUBJECT} characters.` };
  }

  if (!message) return { ok: false, error: "Please enter a message." };
  if (message.length < MIN_MESSAGE) {
    return { ok: false, error: `Message must be at least ${MIN_MESSAGE} characters.` };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: `Message must be under ${MAX_MESSAGE} characters.` };
  }

  return { ok: true, payload: { name, email, phone, subject, message, website } };
};

/* ── Email helpers ──────────────────────────────────────────────────────── */

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildEmail = (p: Payload, ip: string) => {
  const subject = p.subject || "Portfolio Contact";

  const text = [
    `Name:    ${p.name}`,
    `Email:   ${p.email}`,
    `Phone:   ${p.phone || "Not provided"}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    p.message,
    "",
    "—",
    `Sent from the portfolio contact form (IP ${ip})`,
  ].join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:#0a0a0a;color:#ededed;padding:24px;border-radius:12px">
      <h2 style="margin:0 0 16px;font-size:18px">New portfolio enquiry</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#8f8f8f">Name</td><td style="padding:4px 0">${escapeHtml(p.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#8f8f8f">Email</td><td style="padding:4px 0">${escapeHtml(p.email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#8f8f8f">Phone</td><td style="padding:4px 0">${escapeHtml(p.phone || "Not provided")}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#8f8f8f">Subject</td><td style="padding:4px 0">${escapeHtml(subject)}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #2a2a2a;margin:20px 0" />
      <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap">${escapeHtml(p.message)}</p>
      <hr style="border:none;border-top:1px solid #2a2a2a;margin:20px 0" />
      <p style="margin:0;font-size:12px;color:#6b6b6b">Sent from the portfolio contact form (IP ${escapeHtml(ip)})</p>
    </div>
  `;

  return { subject, text, html };
};

/* ── Route ──────────────────────────────────────────────────────────────── */

export async function POST(request: Request) {
  /*
   * Order matters: parse, then reject cheaply (honeypot + validation), and only
   * then touch the rate limiter or the mail provider. Doing it this way means a
   * bot cannot burn a visitor's quota with honeypot spam, and a malformed
   * request gets a useful 400 even when the mail key is missing.
   */
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = validate(body);

  // Honeypot filled => bot. Report success so it does not learn to adapt.
  if (result.ok && result.payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  if (!RESEND_API_KEY) {
    // Fail loudly in logs, politely to the sender.
    console.error("[contact] RESEND_API_KEY is not set.");
    return NextResponse.json(
      { ok: false, error: "The contact form is not configured yet. Please email me directly." },
      { status: 503 }
    );
  }

  const { subject, text, html } = buildEmail(result.payload, ip);

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: result.payload.email,
        subject,
        text,
        html,
      }),
    });
  } catch (error) {
    console.error("[contact] Resend request failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again or email me directly." },
      { status: 502 }
    );
  }

  if (!resendResponse.ok) {
    const detail = await resendResponse.text().catch(() => "");
    console.error("[contact] Resend error:", resendResponse.status, detail);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again or email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
