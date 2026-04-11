const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD;

export async function sendTelegram(text: string): Promise<void> {
  if (!TG_TOKEN || !TG_CHAT_ID) {
    console.warn("Telegram not configured");
    return;
  }

  const res = await fetch(
    `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    }
  );

  if (!res.ok) {
    console.error("Telegram send failed:", await res.text());
  }
}

export async function sendEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  if (!GMAIL_USER || !GMAIL_PASS) {
    console.warn("Gmail not configured");
    return;
  }

  // Use nodemailer-compatible approach via fetch to Gmail SMTP
  // Since we can't use nodemailer in edge/serverless easily,
  // we'll use a simple SMTP relay approach
  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Merkaba Digital <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: replyTo || GMAIL_USER,
      subject,
      text,
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }
}
