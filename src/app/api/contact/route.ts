import { NextRequest, NextResponse } from "next/server";
import { sendTelegram, sendEmail } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { name, company, website, email, phone, industry, language, comment } = data;
    if (!name || !company || !website || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const message = [
      "📩 Новая заявка с merkaba.vip",
      "",
      `👤 ${name}`,
      `🏢 ${company}`,
      `🌐 ${website}`,
      `📧 ${email}`,
      phone ? `📱 ${phone}` : "",
      industry ? `🏭 ${industry}` : "",
      language ? `🌍 ${language}` : "",
      comment ? `💬 ${comment}` : "",
      "",
      `Источник: контактная форма`,
    ].filter(Boolean).join("\n");

    // Send both in parallel
    await Promise.allSettled([
      sendTelegram(message),
      sendEmail({
        subject: `Новая заявка: ${name} - ${company}`,
        text: message,
        replyTo: email,
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
