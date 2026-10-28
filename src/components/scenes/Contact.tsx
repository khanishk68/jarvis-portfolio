import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { copy } from '../../data/copy';
import { copyToClipboard } from '../../lib/utils';
import SectionReveal from '../ui/SectionReveal';
import GlowButton from '../ui/GlowButton';
import styles from './Contact.module.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(copy.contact.email);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) errs.message = 'Message is required.';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    // Open email client (no backend configured)
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${copy.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-label="Contact">
      <div className="grid-overlay" />
      <div className={`atmo-glow ${styles.glow}`} />

      <div className="container">
        <SectionReveal>
          <span className={`label-mono ${styles.label}`}>{copy.contact.label}</span>
          <h2 className={styles.heading}>
            {copy.contact.headline.split('\n').map((line, i) => (
              <span key={i}>
                {i === 0 ? line : <><br /><span className="text-gradient-cyan">{line}</span></>}
              </span>
            ))}
          </h2>
          <p className={styles.sub}>{copy.contact.subtext}</p>
        </SectionReveal>

        <div className={styles.layout}>
          {/* Info column */}
          <SectionReveal delay={0.1}>
            <div className={styles.infoCol}>
              {/* Email */}
              <div className={styles.contactItem}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <Mail size={18} />
                </div>
                <div className={styles.contactDetail}>
                  <span className={styles.contactDetailLabel}>Email</span>
                  <div className={styles.contactDetailValue}>
                    <a
                      href={`mailto:${copy.contact.email}`}
                      className={styles.contactLink}
                      aria-label={`Send email to ${copy.contact.email}`}
                    >
                      {copy.contact.email}
                    </a>
                    <button
                      className={styles.copyBtn}
                      onClick={handleCopyEmail}
                      aria-label={copied ? 'Email copied!' : 'Copy email address'}
                      title={copied ? 'Copied!' : 'Copy email'}
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.contactItem}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <Phone size={18} />
                </div>
                <div className={styles.contactDetail}>
                  <span className={styles.contactDetailLabel}>Phone</span>
                  <a
                    href={copy.contact.phoneLink}
                    className={styles.contactLink}
                    aria-label={`Call ${copy.contact.phone}`}
                  >
                    {copy.contact.phone}
                  </a>
                </div>
              </div>

              {/* Social links */}
              {(copy.contact.social.github || copy.contact.social.linkedin || copy.contact.social.twitter) && (
                <div className={styles.socialRow} aria-label="Social profiles">
                  {copy.contact.social.github && (
                    <a
                      href={copy.contact.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="GitHub Profile"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {copy.contact.social.linkedin && (
                    <a
                      href={copy.contact.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {copy.contact.social.twitter && (
                    <a
                      href={copy.contact.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="Twitter / X Profile"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                </div>
              )}

              {/* Form note */}
              <div className={styles.formNote}>
                <p>{copy.contact.formNote}</p>
              </div>
            </div>
          </SectionReveal>

          {/* Form column */}
          <SectionReveal delay={0.2}>
            <form
              ref={formRef}
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/* Name */}
              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.fieldLabel}>
                  Name <span aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`${styles.fieldInput} ${errors.name ? styles.fieldError : ''}`}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-required="true"
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span id="error-name" className={styles.errorMsg} role="alert">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.fieldLabel}>
                  Email <span aria-label="required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`${styles.fieldInput} ${errors.email ? styles.fieldError : ''}`}
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span id="error-email" className={styles.errorMsg} role="alert">{errors.email}</span>
                )}
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.fieldLabel}>
                  Message <span aria-label="required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={`${styles.fieldInput} ${styles.fieldTextarea} ${errors.message ? styles.fieldError : ''}`}
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                  aria-required="true"
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <span id="error-message" className={styles.errorMsg} role="alert">{errors.message}</span>
                )}
              </div>

              <GlowButton type="submit" variant="primary" aria-label="Send message via email client">
                <Send size={15} />
                Send Message
              </GlowButton>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

