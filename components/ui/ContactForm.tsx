"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { contact, site } from "@/content/profile";

type Fields = { name: string; email: string; company: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Fields = { name: "", email: "", company: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(fields.email.trim())) errors.email = "That email doesn't look right.";
  if (fields.message.trim().length < 10) errors.message = "Please write at least a short message (10+ characters).";
  return errors;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [botField, setBotField] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const update = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const body = new URLSearchParams({ "form-name": "contact", "bot-field": botField, ...fields });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form POST failed with ${res.status}`);
      setStatus("success");
      setFields(EMPTY);
    } catch {
      // Fields are deliberately kept so the visitor never loses their message.
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-block border border-line bg-surface p-8">
        <p className="display-md text-ink">{contact.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[15px] text-ink underline decoration-line underline-offset-[6px] hover:text-accent hover:decoration-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      name="contact"
      method="POST"
      noValidate
      onSubmit={onSubmit}
      aria-describedby={status === "error" ? "contact-error" : undefined}
      className="grid gap-5 rounded-block border border-line bg-surface p-6 md:p-8"
    >
      <p hidden aria-hidden="true">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" value={fields.name} onChange={update("name")} error={errors.name} />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={update("email")}
          error={errors.email}
        />
      </div>
      <Field
        label="Company"
        optional
        name="company"
        autoComplete="organization"
        value={fields.company}
        onChange={update("company")}
      />
      <Field label="Message" name="message" multiline value={fields.message} onChange={update("message")} error={errors.message} />

      {status === "error" && (
        <p id="contact-error" role="alert" className="rounded-[8px] border border-accent px-4 py-3 text-[15px] text-ink">
          {contact.errorMessage}{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
            {site.email}
          </a>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-accent-ink transition-opacity duration-200 ease-out hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "Sending…" : status === "error" ? "Try again" : "Send message"}
        </button>
        <p className="text-[13px] text-muted">Prefer email? {site.email}</p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof Fields;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  multiline?: boolean;
};

function Field({ label, name, value, onChange, error, type = "text", autoComplete, optional, multiline }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    onChange,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    required: !optional,
    className: `w-full rounded-[10px] border bg-bg px-4 py-3 text-[16px] text-ink placeholder:text-muted transition-colors duration-200 ease-out focus:border-accent focus:outline-none ${
      error ? "border-accent" : "border-line"
    }`,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {multiline ? <textarea rows={6} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={errorId} className="mt-2 text-[14px] text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
