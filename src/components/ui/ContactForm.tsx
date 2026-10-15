"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const fieldClass = (hasError: boolean) =>
  cn(
    "w-full border bg-background px-3 py-2.5 font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
    hasError ? "border-destructive" : "border-border"
  );

const labelClass =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send");

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setErrors({
        message:
          "Could not send. You can also write to wafoaristide@gmail.com directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="border-l-2 border-primary border-y border-r border-y-border border-r-border p-6"
      >
        <p className="label-accent">Sent</p>
        <p className="mt-3 leading-relaxed">
          Thanks — I&apos;ll get back to you within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            className={fieldClass(Boolean(errors.name))}
          />
          {errors.name && (
            <p className="mt-1 font-mono text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            className={fieldClass(Boolean(errors.email))}
          />
          {errors.email && (
            <p className="mt-1 font-mono text-xs text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          aria-invalid={Boolean(errors.subject)}
          className={fieldClass(Boolean(errors.subject))}
        />
        {errors.subject && (
          <p className="mt-1 font-mono text-xs text-destructive">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldClass(Boolean(errors.message)), "resize-none")}
        />
        {errors.message && (
          <p className="mt-1 font-mono text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      <Button type="submit" variant="secondary" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
