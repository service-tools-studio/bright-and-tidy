"use client";

import { useState } from "react";
import { SparkleIcon } from "@/app/components/icons";
import { quoteServices } from "@/app/lib/quote";

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  if (status === "success") {
    return (
      <div className="rounded-[2rem] bg-white px-6 py-12 text-center shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5 sm:px-10">
        <SparkleIcon className="mx-auto mb-4 h-8 w-8 text-sun-deep" />
        <h2 className="font-serif text-3xl font-semibold">You&apos;re on our list.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Thanks for reaching out. We&apos;ll review your details and get back
          to you shortly with a free quote.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-[2rem] bg-white px-6 py-8 shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5 sm:px-10"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);

        setStatus("sending");
        setError("");

        try {
          const response = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              phone: data.get("phone"),
              email: data.get("email"),
              service: data.get("service"),
              details: data.get("details"),
            }),
          });

          if (!response.ok) {
            const result = (await response.json().catch(() => null)) as {
              error?: string;
            } | null;
            throw new Error(result?.error || "Something went wrong.");
          }

          setStatus("success");
        } catch (submitError) {
          setStatus("error");
          setError(
            submitError instanceof Error
              ? submitError.message
              : "Something went wrong.",
          );
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Name
          <input
            required
            name="name"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-base font-normal outline-none focus:border-sun-deep"
          />
        </label>
        <label className="block text-sm font-semibold">
          Phone
          <input
            required
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-base font-normal outline-none focus:border-sun-deep"
          />
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          Email
          <input
            required
            name="email"
            type="email"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-base font-normal outline-none focus:border-sun-deep"
          />
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          Service
          <select
            name="service"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-base font-normal outline-none focus:border-sun-deep"
            defaultValue={quoteServices[0]}
          >
            {quoteServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          Tell us about the space
          <textarea
            name="details"
            rows={4}
            className="mt-2 w-full resize-none rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-base font-normal outline-none focus:border-sun-deep"
            placeholder="Home size, frequency, or anything we should know."
          />
        </label>
      </div>

      {status === "error" ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun px-7 py-3.5 text-lg font-semibold text-ink transition-colors hover:bg-sun-deep disabled:opacity-70 sm:w-auto"
      >
        <SparkleIcon className="h-4 w-4" />
        {status === "sending" ? "Sending..." : "Request My Quote"}
      </button>
    </form>
  );
}
