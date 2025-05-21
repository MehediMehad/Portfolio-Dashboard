"use client";

import type React from "react";

import { useState } from "react";
import { Loader2 } from "lucide-react";
// import { sendContactForm } from "@/actions/contact"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");

    try {
      // await sendContactForm(formData)
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-white font-medium mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#1a1025] border ${
            errors.name ? "border-red-500" : "border-[#2d1b4d]"
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors`}
          placeholder="John Doe"
          disabled={formStatus === "submitting"}
        />
        {errors.name && (
          <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-white font-medium mb-2">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#1a1025] border ${
            errors.email ? "border-red-500" : "border-[#2d1b4d]"
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors`}
          placeholder="john@example.com"
          disabled={formStatus === "submitting"}
        />
        {errors.email && (
          <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-white font-medium mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#1a1025] border ${
            errors.subject ? "border-red-500" : "border-[#2d1b4d]"
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors`}
          placeholder="Project Inquiry"
          disabled={formStatus === "submitting"}
        />
        {errors.subject && (
          <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-white font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 bg-[#1a1025] border ${
            errors.message ? "border-red-500" : "border-[#2d1b4d]"
          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors resize-none`}
          placeholder="Your message here..."
          disabled={formStatus === "submitting"}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={formStatus === "submitting"}
          className="w-full bg-gradient-to-r from-[#a855f7] to-[#d8b4fe] text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#a855f7]/20 transition-all duration-300 flex items-center justify-center"
        >
          {formStatus === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>

      {/* Success Message */}
      {formStatus === "success" && (
        <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
          <p className="font-medium">Message sent successfully!</p>
          <p className="text-sm">
            Thank you for reaching out. I&lsquo;ll get back to you soon.
          </p>
        </div>
      )}

      {/* Error Message */}
      {formStatus === "error" && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
          <p className="font-medium">Failed to send message</p>
          <p className="text-sm">
            Please try again later or contact me directly via email.
          </p>
        </div>
      )}
    </form>
  );
}
