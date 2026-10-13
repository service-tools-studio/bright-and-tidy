import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildBookingCalendlyUrl } from "@/app/lib/booking-calendly";
import {
  buildCleaningLeadEmailBody,
  buildCleaningLeadEmailSubject,
  parseCleaningLeadPayload,
} from "@/app/lib/quote";
import {
  checkRateLimit,
  getClientIp,
  isSubmitTimingValid,
} from "@/app/lib/quote-guard";
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

  if (!checkRateLimit(getClientIp(request)).allowed) {
    return NextResponse.json(
      {
        error: `Too many requests. Please try again later or call us at ${site.phoneDisplay}.`,
      },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const quote = parseCleaningLeadPayload(body);

  if (!quote) {
    return NextResponse.json(
      { error: "Please fill out the required fields." },
      { status: 400 },
    );
  }

  if (!isSubmitTimingValid(quote.formLoadedAt)) {
    return NextResponse.json({ ok: true });
  }

  const calendlyUrl = buildBookingCalendlyUrl({
    form: quote,
    leadPath: quote.leadPath ?? "Personalized Quote",
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: site.quoteEmail,
      pass: password,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${site.name}" <${site.quoteEmail}>`,
      to: site.quoteEmail,
      replyTo: quote.email,
      subject: buildCleaningLeadEmailSubject(quote),
      text: buildCleaningLeadEmailBody(quote, { calendlyUrl }),
    });
  } catch {
    return NextResponse.json(
      { error: "We couldn't send your request. Please try again or call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
