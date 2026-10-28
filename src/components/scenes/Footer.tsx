import { ChevronUp, Mail, Phone } from 'lucide-react';
import { copy } from '../../data/copy';
import { scrollToSection } from '../../lib/utils';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="divider" />

      <div className={`container ${styles.inner}`}>
        {/* Left: JARVIS status */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <span className={styles.logoGlyph}>J</span>
            <span className={styles.logoText}>ARVIS</span>
          </div>

          {/* Status indicator — clearly labeled as static */}
          <div
            className={styles.status}
            title={copy.footer.statusNote}
            aria-label={`Status indicator: ${copy.footer.status} (static display, not a live AI connection)`}
          >
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>{copy.footer.status}</span>
          </div>

          <p className={styles.attribution}>{copy.footer.attribution}</p>
        </div>

        {/* Center: Nav links */}
        <nav className={styles.navLinks} aria-label="Footer navigation">
          {copy.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className={styles.navLink}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Contact + back to top */}
        <div className={styles.right}>
          <a
            href={`mailto:${copy.contact.email}`}
            className={styles.contactLink}
            aria-label={`Email ${copy.contact.email}`}
          >
            <Mail size={14} />
            <span>{copy.contact.email}</span>
          </a>
          <a
            href={copy.contact.phoneLink}
            className={styles.contactLink}
            aria-label={`Call ${copy.contact.phone}`}
          >
            <Phone size={14} />
            <span>{copy.contact.phone}</span>
          </a>

          <button
            className={styles.backToTop}
            onClick={() => scrollToSection('home')}
            aria-label={copy.footer.backToTop}
            title={copy.footer.backToTop}
          >
            <ChevronUp size={16} />
            <span>{copy.footer.backToTop}</span>
          </button>
        </div>
      </div>

      {/* Bottom stripe */}
      <div className={styles.bottomStripe}>
        <div className="container">
          <span className={styles.bottomText}>
            Built with React + Vite + TypeScript + Framer Motion + Three.js
          </span>
        </div>
      </div>
    </footer>
  );
}

