"use client";

import {
  type FocusEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { buildBookingCalendlyUrl } from "@/app/lib/booking-calendly";
import {
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  CLEANING_TYPES,
  CONDITION_OPTIONS,
  CONTACT_OPTIONS,
  EMPTY_CLEANING_LEAD_FORM,
  TIMING_OPTIONS,
  type CleaningLeadFormState,
  type CleaningLeadMode,
  type FieldErrors,
  fieldDomId,
  firstStepErrorField,
  formatPhoneInput,
  getLeadFormSteps,
  validateCleaningLeadStep,
} from "@/app/lib/quote";

const focusRing =
  "focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink";
const inputClass =
  `mt-1.5 w-full rounded-xl border border-ink/15 bg-cream px-3 py-2.5 text-base text-ink transition placeholder:text-muted/70 ${focusRing}`;
const inputErrorClass =
  `mt-1.5 w-full rounded-xl border border-red-400 bg-cream px-3 py-2.5 text-base text-ink ring-2 ring-red-200 ${focusRing}`;
const radioClass = `h-4 w-4 shrink-0 border-ink/30 text-sun accent-sun ${focusRing}`;
const selectClass = `${inputClass} appearance-none bg-size-[1.1rem] bg-position-[right_0.7rem_center] bg-no-repeat pr-10`;
const selectErrorClass = `${inputErrorClass} appearance-none bg-size-[1.1rem] bg-position-[right_0.7rem_center] bg-no-repeat pr-10`;
const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23545454' viewBox='0 0 16 16'%3E%3Cpath d='M4.5 6l3.5 4 3.5-4'/%3E%3C/svg%3E")`,
} as const;
const fieldLabel =
  "text-xs font-semibold uppercase tracking-[0.12em] text-muted";
const btnPrimary =
  `inline-flex min-h-11 items-center justify-center rounded-full bg-sun px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-none transition hover:brightness-95 ${focusRing}`;
const btnSecondary =
  `inline-flex min-h-11 items-center justify-center rounded-full border border-ink/20 bg-white px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-ink transition hover:bg-cream ${focusRing}`;

type Props = {
  mode?: CleaningLeadMode;
  initialCleaningType?: string;
};

export function QuoteForm({
  mode = "quote",
  initialCleaningType,
}: Props) {
  const isQuote = mode === "quote";
  const steps = getLeadFormSteps(mode);
  const [form, setForm] = useState<CleaningLeadFormState>(() => ({
    ...EMPTY_CLEANING_LEAD_FORM,
    ...(initialCleaningType ? { cleaningType: initialCleaningType } : {}),
  }));
  const formLoadedAtRef = useRef(Date.now());
  const formCardRef = useRef<HTMLFormElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusStepRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] =
    useState<CleaningLeadFormState | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [stepIndex, setStepIndex] = useState(0);
  const statusId = useId();

  const lastStep = steps.length - 1;
  const stepMeta = steps[stepIndex];
  const stepId = stepMeta?.id ?? "";

  function scrollElementBelowHeader(el: HTMLElement | null) {
    if (!el) return;
    const headerHeight = 100;
    const gapBelowHeader = 12;
    const targetTop =
      el.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      gapBelowHeader;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }

  function focusFirstStepControl() {
    const card = formCardRef.current;
    if (!card) return;
    const firstField = card.querySelector<HTMLElement>(
      'input:not([type="hidden"]), select, textarea',
    );
    firstField?.focus();
  }

  useEffect(() => {
    if (!shouldFocusStepRef.current) return;
    shouldFocusStepRef.current = false;
    const frame = window.requestAnimationFrame(() => {
      focusFirstStepControl();
      scrollWizardBelowHeader();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [stepIndex]);

  useEffect(() => {
    if (!submitSuccess) return;
    window.requestAnimationFrame(() => {
      scrollElementBelowHeader(successCardRef.current);
      successHeadingRef.current?.focus();
    });
  }, [submitSuccess]);

  const canAttemptSubmit = useMemo(() => !isSubmitting, [isSubmitting]);

  function scrollWizardBelowHeader() {
    if (window.matchMedia("(min-width: 1280px)").matches) return;
    scrollElementBelowHeader(formCardRef.current);
  }

  function handleWizardFocusIn(e: FocusEvent<HTMLFormElement>) {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.matches("input, select, textarea")) return;

    const card = formCardRef.current;
    if (!card) return;

    const firstField = card.querySelector<HTMLElement>(
      'input:not([type="hidden"]), select, textarea',
    );
    if (target !== firstField) return;
    scrollWizardBelowHeader();
  }

  function update<K extends keyof CleaningLeadFormState>(
    key: K,
    value: CleaningLeadFormState[K],
  ) {
    const leavingSpecificDate = key === "timing" && value !== "Specific date";
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(leavingSpecificDate ? { specificDate: "" } : {}),
    }));
    setSubmitError(null);
    setFieldErrors((prev) => {
      if (!prev[key] && !(leavingSpecificDate && prev.specificDate)) return prev;
      const next = { ...prev };
      delete next[key];
      if (leavingSpecificDate) delete next.specificDate;
      return next;
    });
  }

  function focusField(key: keyof CleaningLeadFormState) {
    const el = document.getElementById(fieldDomId(key));
    if (el instanceof HTMLElement) {
      el.focus({ preventScroll: true });
    }
  }

  function goToStep(next: number) {
    setFieldErrors({});
    setSubmitError(null);
    shouldFocusStepRef.current = true;
    setStepIndex(next);
  }

  function advanceStep() {
    const errors = validateCleaningLeadStep(form, mode, stepIndex);
    setFieldErrors(errors);
    const firstInvalid = firstStepErrorField(errors, mode, stepIndex);
    if (firstInvalid) {
      focusField(firstInvalid);
      return false;
    }
    if (stepIndex < lastStep) {
      goToStep(stepIndex + 1);
      return false;
    }
    return true;
  }

  async function finishSubmit() {
    if (!canAttemptSubmit) return;
    setIsSubmitting(true);
    setSubmitError(null);
    const snapshot = { ...form };

    try {
      const leadPath = isQuote ? "Personalized Quote" : "Book Online";
      const calendlyUrl = buildBookingCalendlyUrl({
        form: snapshot,
        leadPath,
      });
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...snapshot,
          leadPath,
          formLoadedAt: formLoadedAtRef.current,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send your request.");
      }

      setSubmittedSnapshot(snapshot);
      setSubmitSuccess(true);
      setForm({
        ...EMPTY_CLEANING_LEAD_FORM,
        ...(initialCleaningType ? { cleaningType: initialCleaningType } : {}),
      });
      setStepIndex(0);
      formLoadedAtRef.current = Date.now();

      if (!isQuote) {
        window.open(calendlyUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to send your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canAttemptSubmit) return;
    const ready = advanceStep();
    if (!ready) return;
    await finishSubmit();
  }

  function openCalendlyFromSuccess() {
    if (!submittedSnapshot) return;
    const url = buildBookingCalendlyUrl({
      form: submittedSnapshot,
      leadPath: isQuote ? "Personalized Quote" : "Book Online",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (submitSuccess) {
    if (!isQuote) {
      return (
        <div
          ref={successCardRef}
          data-lead-wizard="booking"
          className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-sm sm:p-8"
        >
          <div aria-live="polite">
            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              className="font-serif text-2xl font-semibold text-ink outline-none"
            >
              You&apos;re all set — pick a time in the new tab.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              We&apos;ve saved your details. If the scheduling tab didn&apos;t
              open, use the button below.
            </p>
          </div>
          <button
            type="button"
            onClick={openCalendlyFromSuccess}
            className={`${btnPrimary} mt-6 w-full sm:w-auto`}
          >
            See Available Times →
          </button>
        </div>
      );
    }

    return (
      <div
        ref={successCardRef}
        data-lead-wizard="quote"
        className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <div aria-live="polite">
          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            className="font-serif text-2xl font-semibold text-ink outline-none"
          >
            Thanks! We&apos;ll put together your personalized estimate.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            We&apos;ve received the details about your home and a member of our
            team will be in touch within 1–2 business hours.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-sun bg-sun/30 px-5 py-5">
          <h3 className="font-serif text-lg font-semibold text-ink">
            Want to reserve a cleaning time now?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            You don&apos;t have to wait for your estimate to reserve a spot.
            We&apos;ll still confirm your final price with you before cleaning
            begins.
          </p>
          <button
            type="button"
            onClick={openCalendlyFromSuccess}
            className={`${btnPrimary} mt-4 w-full sm:w-auto`}
          >
            Reserve your cleaning →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formCardRef}
      id={isQuote ? "quote-wizard" : "book-wizard"}
      data-lead-wizard={isQuote ? "quote" : "booking"}
      onSubmit={onSubmit}
      onFocus={handleWizardFocusIn}
      className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-sm sm:p-8 outline-none"
      tabIndex={-1}
      noValidate
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Step {stepIndex + 1} of {steps.length}
        </p>
        <div className="flex flex-1 justify-end gap-1.5" aria-hidden>
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={`h-1.5 w-5 rounded-full sm:w-7 ${index <= stepIndex ? "bg-sun" : "bg-ink/10"
                }`}
            />
          ))}
        </div>
      </div>

      <h2 className="mt-5 font-serif text-xl font-semibold text-ink sm:text-2xl">
        {stepMeta.title}
      </h2>

      <div className="mt-5 space-y-4">
        {stepId === "name" ? (
          <div className="grid gap-4">
            <Field
              label="First name *"
              htmlFor={fieldDomId("firstName")}
              error={fieldErrors.firstName}
            >
              <input
                id={fieldDomId("firstName")}
                name="firstName"
                autoComplete="given-name"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={fieldErrors.firstName ? inputErrorClass : inputClass}
                aria-invalid={Boolean(fieldErrors.firstName)}
                required
              />
            </Field>
            <Field
              label="Last name *"
              htmlFor={fieldDomId("lastName")}
              error={fieldErrors.lastName}
            >
              <input
                id={fieldDomId("lastName")}
                name="lastName"
                autoComplete="family-name"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={fieldErrors.lastName ? inputErrorClass : inputClass}
                aria-invalid={Boolean(fieldErrors.lastName)}
                required
              />
            </Field>
          </div>
        ) : null}

        {stepId === "contact" ? (
          <div className="grid gap-4">
            <Field
              label="Mobile phone *"
              htmlFor={fieldDomId("mobilePhone")}
              error={fieldErrors.mobilePhone}
            >
              <input
                id={fieldDomId("mobilePhone")}
                name="mobilePhone"
                type="tel"
                autoComplete="tel"
                value={form.mobilePhone}
                onChange={(e) =>
                  update("mobilePhone", formatPhoneInput(e.target.value))
                }
                className={
                  fieldErrors.mobilePhone ? inputErrorClass : inputClass
                }
                placeholder="(503) 555-1234"
                aria-invalid={Boolean(fieldErrors.mobilePhone)}
                required
              />
            </Field>
            <Field
              label="Email *"
              htmlFor={fieldDomId("email")}
              error={fieldErrors.email}
            >
              <input
                id={fieldDomId("email")}
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={fieldErrors.email ? inputErrorClass : inputClass}
                aria-invalid={Boolean(fieldErrors.email)}
                required
              />
            </Field>
          </div>
        ) : null}

        {stepId === "preference" ? (
          <fieldset>
            <legend className={fieldLabel}>
              How would you prefer we contact you? *
            </legend>
            <div className="mt-3 flex flex-col gap-2">
              {CONTACT_OPTIONS.map((option, index) => (
                <label
                  key={option}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-ink"
                >
                  <input
                    id={
                      index === 0
                        ? fieldDomId("contactPreference")
                        : `${fieldDomId("contactPreference")}-${index}`
                    }
                    type="radio"
                    name="contactPreference"
                    value={option}
                    checked={form.contactPreference === option}
                    onChange={() => update("contactPreference", option)}
                    className={radioClass}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
            {fieldErrors.contactPreference ? (
              <p className="mt-2 text-sm font-medium text-red-600">
                {fieldErrors.contactPreference}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        {stepId === "address" ? (
          <Field
            label="Service address *"
            htmlFor={fieldDomId("address")}
            error={fieldErrors.address}
          >
            <input
              id={fieldDomId("address")}
              name="address"
              autoComplete="street-address"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className={fieldErrors.address ? inputErrorClass : inputClass}
              placeholder="Street, city, ZIP"
              aria-invalid={Boolean(fieldErrors.address)}
              required
            />
          </Field>
        ) : null}

        {stepId === "service" ? (
          <Field
            label="What type of cleaning do you need? *"
            htmlFor={fieldDomId("cleaningType")}
            error={fieldErrors.cleaningType}
          >
            <select
              id={fieldDomId("cleaningType")}
              name="cleaningType"
              value={form.cleaningType}
              onChange={(e) => update("cleaningType", e.target.value)}
              className={
                fieldErrors.cleaningType ? selectErrorClass : selectClass
              }
              style={selectStyle}
              aria-describedby={
                form.cleaningType === "Standard Cleaning"
                  ? "cl-standard-note"
                  : undefined
              }
              aria-invalid={Boolean(fieldErrors.cleaningType)}
              required
            >
              <option value="" disabled>
                Select a cleaning type
              </option>
              {CLEANING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {form.cleaningType === "Standard Cleaning" ? (
              <div
                id="cl-standard-note"
                role="note"
                className="mt-3 rounded-xl border border-sun bg-sun/40 px-4 py-3"
              >
                <p className="text-sm leading-relaxed text-ink">
                  Note: Standard rates apply to homes that have had a
                  professional cleaning within the past 2–4 weeks. If it&apos;s
                  been longer, we usually recommend starting with a Deep
                  Cleaning.
                </p>
              </div>
            ) : null}
          </Field>
        ) : null}

        {stepId === "home" ? (
          <div className="grid gap-4">
            <Field
              label="Approximate home size *"
              htmlFor={fieldDomId("homeSize")}
              error={fieldErrors.homeSize}
            >
              <input
                id={fieldDomId("homeSize")}
                name="homeSize"
                type="number"
                min={1}
                inputMode="numeric"
                value={form.homeSize}
                onChange={(e) => update("homeSize", e.target.value)}
                className={fieldErrors.homeSize ? inputErrorClass : inputClass}
                placeholder="e.g. 1800"
                aria-invalid={Boolean(fieldErrors.homeSize)}
                required
              />
            </Field>
            <Field
              label="Bedrooms *"
              htmlFor={fieldDomId("bedrooms")}
              error={fieldErrors.bedrooms}
            >
              <select
                id={fieldDomId("bedrooms")}
                name="bedrooms"
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", e.target.value)}
                className={
                  fieldErrors.bedrooms ? selectErrorClass : selectClass
                }
                style={selectStyle}
                aria-invalid={Boolean(fieldErrors.bedrooms)}
                required
              >
                <option value="" disabled>
                  Select bedrooms
                </option>
                {BEDROOM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Bathrooms *"
              htmlFor={fieldDomId("bathrooms")}
              error={fieldErrors.bathrooms}
            >
              <select
                id={fieldDomId("bathrooms")}
                name="bathrooms"
                value={form.bathrooms}
                onChange={(e) => update("bathrooms", e.target.value)}
                className={
                  fieldErrors.bathrooms ? selectErrorClass : selectClass
                }
                style={selectStyle}
                aria-invalid={Boolean(fieldErrors.bathrooms)}
                required
              >
                <option value="" disabled>
                  Select bathrooms
                </option>
                {BATHROOM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        ) : null}

        {stepId === "condition" ? (
          <fieldset>
            <legend className={fieldLabel}>
              How would you describe the current condition? *
            </legend>
            <div className="mt-3 space-y-2">
              {CONDITION_OPTIONS.map((option, index) => (
                <label
                  key={option}
                  className="flex min-h-11 cursor-pointer items-start gap-2 text-sm text-ink"
                >
                  <input
                    id={
                      index === 0
                        ? fieldDomId("condition")
                        : `${fieldDomId("condition")}-${index}`
                    }
                    type="radio"
                    name="condition"
                    value={option}
                    checked={form.condition === option}
                    onChange={() => update("condition", option)}
                    className={`mt-0.5 ${radioClass}`}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {fieldErrors.condition ? (
              <p className="mt-2 text-sm font-medium text-red-600">
                {fieldErrors.condition}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        {stepId === "timing" ? (
          <fieldset>
            <legend className={fieldLabel}>
              When are you hoping to have the cleaning done? *
            </legend>
            <div className="mt-3 space-y-2">
              {TIMING_OPTIONS.map((option, index) => (
                <label
                  key={option}
                  className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-ink"
                >
                  <input
                    id={
                      index === 0
                        ? fieldDomId("timing")
                        : `${fieldDomId("timing")}-${index}`
                    }
                    type="radio"
                    name="timing"
                    value={option}
                    checked={form.timing === option}
                    onChange={() => update("timing", option)}
                    className={radioClass}
                    required
                  />
                  {option}
                  {option === "Specific date" ? ":" : null}
                </label>
              ))}
              {form.timing === "Specific date" ? (
                <input
                  id={fieldDomId("specificDate")}
                  name="specificDate"
                  type="date"
                  value={form.specificDate}
                  onChange={(e) => update("specificDate", e.target.value)}
                  className={`${fieldErrors.specificDate ? inputErrorClass : inputClass} max-w-xs`}
                  aria-invalid={Boolean(fieldErrors.specificDate)}
                  required
                />
              ) : null}
            </div>
            {fieldErrors.timing ? (
              <p className="mt-2 text-sm font-medium text-red-600">
                {fieldErrors.timing}
              </p>
            ) : null}
            {form.timing === "Specific date" && fieldErrors.specificDate ? (
              <p className="mt-2 text-sm font-medium text-red-600">
                {fieldErrors.specificDate}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        {stepId === "notes" ? (
          <Field
            label="Anything you'd like us to know? (optional)"
            htmlFor={fieldDomId("notes")}
          >
            <textarea
              id={fieldDomId("notes")}
              name="notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={5}
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Tell us about any areas that need extra attention, pets, special requests, or anything else that may help us estimate your cleaning."
            />
          </Field>
        ) : null}
      </div>

      <div className="mt-8 space-y-3 border-t border-ink/10 pt-6">
        <div aria-live="polite" id={statusId}>
          {stepIndex === lastStep ? (
            <p className="text-xs leading-relaxed text-muted">
              {isQuote
                ? "We'll review your details and get back to you within 1-2 business hours."
                : "Next you'll choose an available cleaning time. We'll confirm your final price before cleaning begins."}
            </p>
          ) : null}
          {submitError ? (
            <p className="text-sm font-medium text-red-600">{submitError}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row-reverse sm:items-center">
          <button
            type="submit"
            disabled={!canAttemptSubmit}
            aria-describedby={statusId}
            className={`${btnPrimary} w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[12rem]`}
          >
            {isSubmitting
              ? isQuote
                ? "Sending…"
                : "Loading available times…"
              : stepIndex === lastStep
                ? isQuote
                  ? "Submit quote request"
                  : "See Available Times →"
                : "Continue"}
          </button>
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={() => goToStep(stepIndex - 1)}
              disabled={isSubmitting}
              className={`${btnSecondary} w-full sm:w-auto`}
            >
              Back
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  className = "",
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={fieldLabel}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
