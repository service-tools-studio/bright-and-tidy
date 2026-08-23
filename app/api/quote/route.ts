import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { parseQuoteRequest } from "@/app/lib/quote";
import { site } from "@/app/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const password = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!password) {
    return NextResponse.json(
      { error: "Email is not configured." },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const quote = parseQuoteRequest(body);

  if (!quote) {
    return NextResponse.json({ error: "Please fill out the required fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: site.quoteEmail,
      pass: password,
    },
  });

  const details = quote.details || "No additional details provided.";

  try {
    await transporter.sendMail({
      from: `"${site.name}" <${site.quoteEmail}>`,
      to: site.quoteEmail,
      replyTo: quote.email,
      subject: `New quote request from ${quote.name}`,
      text: [
        `Name: ${quote.name}`,
        `Phone: ${quote.phone}`,
        `Email: ${quote.email}`,
        `Service: ${quote.service}`,
        "",
        "Details:",
        details,
      ].join("\n"),
    });
  } catch {
    return NextResponse.json(
      { error: "We couldn't send your request. Please try again or call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
