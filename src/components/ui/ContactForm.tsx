"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

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

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      // Succès
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset après 5 secondes
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      
      // Afficher l'erreur avec option de fallback
      setErrors({ 
        message: `Erreur lors de l'envoi. Vous pouvez aussi m'écrire directement à wafoaristide@gmail.com` 
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

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
        <div className="text-green-600 dark:text-green-400 mb-2">
          ✅ Message envoyé avec succès !
        </div>
        <p className="text-sm text-green-600 dark:text-green-400">
          Je vous répondrai dans les 24-48 heures.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nom *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.name ? "border-red-500" : "border-border"
            }`}
            placeholder="Votre nom"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.email ? "border-red-500" : "border-border"
            }`}
            placeholder="votre@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Sujet *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.subject ? "border-red-500" : "border-border"
          }`}
          placeholder="Objet de votre message"
        />
        {errors.subject && (
          <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
            errors.message ? "border-red-500" : "border-border"
          }`}
          placeholder="Décrivez votre projet ou votre demande..."
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  );
}
