import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, company, website, email } = data;
    if (!name || !company || !website || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Log the submission (in production, send email/notification)
    console.log("Contact form submission:", data);

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // TODO: Optional Telegram notification

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
