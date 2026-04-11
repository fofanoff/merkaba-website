import { NextRequest, NextResponse } from "next/server";
import { sendTelegram, sendEmail } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const messenger = formData.get("messenger") as string;
    const plan = formData.get("plan") as string;
    const locale = formData.get("_locale") as string;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const message = [
      "🤝 Заявка Founding Partner",
      "",
      `👤 ${name}`,
      `📧 ${email}`,
      messenger ? `💬 ${messenger}` : "",
      plan ? `📋 План: ${plan}` : "",
      locale ? `🌍 Язык: ${locale}` : "",
      "",
      `Источник: Founding Partners`,
    ].filter(Boolean).join("\n");

    await Promise.allSettled([
      sendTelegram(message),
      sendEmail({
        subject: `Founding Partner: ${name}`,
        text: message,
        replyTo: email,
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
