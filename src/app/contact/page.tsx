'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Footer from '@/components/Footer';

function StaggeredTitle({
  text,
  mounted,
}: {
  text: string;
  mounted: boolean;
}) {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[92px] leading-[0.85] tracking-tight uppercase text-dark select-none flex flex-wrap gap-x-[0.25em] gap-y-0 text-left">
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex overflow-hidden py-1 select-none"
        >
          {word.split('').map((char) => {
            const charDelay = globalCharIndex * 20;
            globalCharIndex++;
            return (
              <span
                key={globalCharIndex}
                className={`inline-block transition-all duration-700 ease-out transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                style={{ transitionDelay: `${150 + charDelay}ms` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function StaggeredTagline({
  text,
  mounted,
}: {
  text: string;
  mounted: boolean;
}) {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#555555] font-semibold leading-relaxed flex flex-wrap gap-x-[0.25em] gap-y-0 text-left">
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex overflow-hidden py-0.5 -my-0.5 select-none"
        >
          {word.split('').map((char) => {
            const charDelay = globalCharIndex * 8;
            globalCharIndex++;
            return (
              <span
                key={globalCharIndex}
                className={`inline-block transition-all duration-500 ease-out transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                  }`}
                style={{ transitionDelay: `${350 + charDelay}ms` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('domingo@oneenterprise.ai');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

  const isFormValid =
    formData.name.trim() !== '' &&
    isEmailValid &&
    formData.message.trim() !== '';

  const isSubmitDisabled = isSubmitting || !isFormValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xnnloyna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-light text-dark selection:bg-accent selection:text-light">
      <Navbar />

      {/* Main Contact Section - Matching Navbar px-4 padding */}
      <section
        id="contact-page"
        data-theme="light"
        className="w-full min-h-screen flex flex-col justify-start items-start bg-light text-dark pt-28 sm:pt-36 md:pt-44 pb-16 md:pb-24 px-4"
      >
        {/* Header: Title on the left, description next to it */}
        <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 max-w-7xl">
          {/* Left: Title with Kinetic Staggered Animation */}
          <div className="flex flex-col items-start max-w-2xl">
            <StaggeredTitle text="LET'S BUILD THE RIGHT SYSTEM" mounted={mounted} />
          </div>

          {/* Right: Description next to it with Kinetic Staggered Reveal */}
          <div className="max-w-md lg:max-w-lg pt-0.5 md:pt-0.5 lg:pt-1 text-left">
            <StaggeredTagline
              text="Tell us about the opportunity, bottleneck, or growth goal. We’ll help identify the right strategy and turn it into a practical digital solution."
              mounted={mounted}
            />
          </div>
        </div>

        {/* Content Row: Direct Channels on Left, Form on Right */}
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10 lg:gap-14 pt-12 sm:pt-16 md:pt-20 transition-all duration-700 ease-out transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          style={{ transitionDelay: '500ms' }}
        >
          {/* Direct Inquiries & Office Info - order-2 on mobile (under form), order-1 on tablet & desktop */}
          <div className="md:col-span-5 order-2 md:order-1 flex flex-col text-left justify-between space-y-6">
            <div className="flex flex-col space-y-5">
              <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-dark leading-[0.9] tracking-wide uppercase">
                DIRECT CHANNELS &amp; OFFICE
              </h2>

              {/* Direct Info Cards */}
              <div className="flex flex-col gap-3 pt-1">
                {/* Email Us */}
                <div className="p-4 rounded-xl bg-dark/[0.02] border border-dark/10 flex items-center justify-between gap-4">
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-ibm-mono text-[11px] uppercase text-dark/40 font-semibold">
                      Email Us
                    </span>
                    <a
                      href="mailto:domingo@oneenterprise.ai"
                      className="font-jakarta font-bold text-dark text-base sm:text-lg hover:text-accent transition-colors truncate no-underline"
                    >
                      domingo@oneenterprise.ai
                    </a>
                    <span className="font-jakarta text-xs text-[#666666] font-medium mt-0.5">
                      Send us an email anytime
                    </span>
                  </div>
                  <Button
                    size="sm"
                    text={copiedEmail ? 'COPIED' : 'COPY'}
                    onClick={handleCopyEmail}
                    className="shrink-0"
                  />
                </div>

                {/* Call Us */}
                <div className="p-4 rounded-xl bg-dark/[0.02] border border-dark/10 flex items-center justify-between gap-4">
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-ibm-mono text-[11px] uppercase text-dark/40 font-semibold">
                      Call Us
                    </span>
                    <a
                      href="tel:5615420047"
                      className="font-jakarta font-bold text-dark text-base sm:text-lg hover:text-accent transition-colors truncate no-underline"
                    >
                      561-542-0047
                    </a>
                    <span className="font-jakarta text-xs text-[#666666] font-medium mt-0.5">
                      Mon-Fri from 8am to 6pm
                    </span>
                  </div>
                  <Button
                    size="sm"
                    text="CALL"
                    link="tel:5615420047"
                    className="shrink-0"
                  />
                </div>

                {/* Visit Us / Office */}
                <div className="p-4 rounded-xl bg-dark/[0.02] border border-dark/10 flex flex-col gap-1">
                  <span className="font-ibm-mono text-[11px] uppercase text-dark/40 font-semibold">
                    Visit Our Office
                  </span>
                  <p className="font-jakarta font-bold text-dark text-base sm:text-lg leading-snug">
                    30 N Gould Street, Suite R<br />
                    Sheridan, WY 82801
                  </p>
                </div>

                {/* Working Hours */}
                <div className="p-4 rounded-xl bg-dark/[0.02] border border-dark/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-ibm-mono text-[11px] uppercase text-dark/40 font-semibold">
                      Working Hours
                    </span>
                    <span className="font-jakarta font-bold text-dark text-sm sm:text-base">
                      Monday - Friday
                    </span>
                    <span className="font-jakarta text-xs text-[#666666] font-medium">
                      8:00 AM - 6:00 PM EST
                    </span>
                  </div>
                  <span className="font-ibm-mono text-xs font-bold text-dark">
                    OPEN MON-FRI
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex flex-col pt-4 border-t border-dark/10">
              <span className="font-ibm-mono text-[11px] uppercase tracking-wider text-dark/40 font-semibold mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-4 font-ibm-mono text-xs font-semibold text-[#555555]">
                <a
                  href="https://www.linkedin.com/company/business-evolution-ai-be-ai/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dark transition-colors no-underline"
                >
                  LinkedIn
                </a>
                <span>/</span>
                <a
                  href="mailto:domingo@oneenterprise.ai"
                  className="hover:text-dark transition-colors no-underline"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Project Inquiry Form - order-1 on mobile (above channels), order-2 on tablet & desktop */}
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="w-full bg-dark/[0.02] border border-dark/10 rounded-2xl p-6 sm:p-8 md:p-10 text-left">
              {/* Form Header */}
              <div className="mb-6">
                <h3 className="font-bebas text-3xl sm:text-4xl text-dark tracking-wide uppercase">
                  SEND US A MESSAGE
                </h3>
                <p className="font-jakarta text-xs sm:text-sm text-[#555555] font-semibold mt-1">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                {/* Input Fields Row: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-name" className="font-ibm-mono text-xs uppercase tracking-wider text-dark/70 font-semibold">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (status !== 'idle') setStatus('idle');
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-light border border-dark/15 focus:border-accent focus:outline-none transition-colors duration-200 text-dark placeholder:text-dark/30 font-jakarta font-medium text-sm"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-email" className="font-ibm-mono text-xs uppercase tracking-wider text-dark/70 font-semibold">
                      Work Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (status !== 'idle') setStatus('idle');
                      }}
                      className={`w-full px-4 py-3 rounded-lg bg-light text-dark placeholder:text-dark/30 font-jakarta font-medium text-sm focus:outline-none transition-colors duration-200 border ${
                        formData.email.length > 0 && !isEmailValid
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-dark/15 focus:border-accent'
                      }`}
                    />
                  </div>
                </div>

                {/* Input Fields Row: Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-phone" className="font-ibm-mono text-xs uppercase tracking-wider text-dark/70 font-semibold">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (status !== 'idle') setStatus('idle');
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-light border border-dark/15 focus:border-accent focus:outline-none transition-colors duration-200 text-dark placeholder:text-dark/30 font-jakarta font-medium text-sm"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-company" className="font-ibm-mono text-xs uppercase tracking-wider text-dark/70 font-semibold">
                      Company / Organization
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Acme Ventures or Stealth Startup"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (status !== 'idle') setStatus('idle');
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-light border border-dark/15 focus:border-accent focus:outline-none transition-colors duration-200 text-dark placeholder:text-dark/30 font-jakarta font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="contact-message" className="font-ibm-mono text-xs uppercase tracking-wider text-dark/70 font-semibold">
                    Project Overview / Objectives *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about what you want to achieve, timeline, and key technical goals..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (status !== 'idle') setStatus('idle');
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-light border border-dark/15 focus:border-accent focus:outline-none transition-colors duration-200 text-dark placeholder:text-dark/30 font-jakarta font-medium text-sm resize-none"
                  />
                </div>

                {/* Submit Button & Status Line */}
                <div className="pt-2 relative pb-6 sm:pb-5">
                  <Button
                    type="submit"
                    text={isSubmitting ? 'SENDING' : 'SEND MESSAGE'}
                    size="lg"
                    disabled={isSubmitDisabled}
                    className="min-w-[175px] md:min-w-[200px]"
                  />

                  <p
                    className={`font-jakarta text-xs sm:text-sm font-semibold absolute left-0 top-[calc(100%-16px)] sm:top-[calc(100%-14px)] transition-all duration-300 pointer-events-none ${
                      status === 'error'
                        ? 'text-red-500 opacity-100 translate-y-0'
                        : status === 'success'
                        ? 'text-accent opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-1'
                    }`}
                  >
                    {status === 'error'
                      ? 'Something went wrong. Please try again or email us directly.'
                      : "Message received, we'll get back to you shortly"}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
