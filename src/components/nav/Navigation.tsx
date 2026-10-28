import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { copy } from '../../data/copy';
import { useActiveSection } from '../../hooks/useActiveSection';
import { scrollToSection } from '../../lib/utils';
import styles from './Navigation.module.css';

const sectionIds = ['home', 'about', 'projects', 'skills', 'contact'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  const activeHref = `#${activeId}`;

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <a
            href="#home"
            className={styles.logo}
            aria-label="JARVIS — back to top"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          >
            <span className={styles.logoGlyph}>J</span>
            <span className={styles.logoText}>ARVIS</span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className={styles.desktopNav}>
            {copy.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`${styles.navLink} ${activeHref === link.href ? styles.active : ''}`}
                aria-current={activeHref === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Status pill */}
          <div className={styles.statusPill} aria-label="System status: online">
            <span className={styles.statusDot} />
            <span className={styles.statusText}>ONLINE</span>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={styles.menuToggle}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className={styles.mobileNav}
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <nav aria-label="Mobile navigation">
              {copy.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`${styles.mobileLink} ${activeHref === link.href ? styles.active : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  aria-current={activeHref === link.href ? 'page' : undefined}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className={styles.mobileLinkIndex}>0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className={styles.mobileContact}>
              <a href={`mailto:${copy.contact.email}`} className={styles.mobileEmail}>
                {copy.contact.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

