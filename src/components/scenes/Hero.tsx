import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { copy } from '../../data/copy';
import { scrollToSection } from '../../lib/utils';
import ParticleField from '../ui/ParticleField';
import GlowButton from '../ui/GlowButton';
import styles from './Hero.module.css';

const ROLE_INTERVAL = 2800;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % copy.hero.roles.length);
    }, ROLE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className={`section ${styles.hero}`} aria-label="Hero">
      {/* Particles */}
      <ParticleField className={styles.particles} />

      {/* Background glow */}
      <div className={`atmo-glow ${styles.glow1}`} />
      <div className={`atmo-glow ${styles.glow2}`} />
      <div className="grid-overlay" />

      <div className={`container ${styles.content}`}>
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className={`label-mono ${styles.greeting}`}>
            <span className={styles.greetingDot} aria-hidden="true" />
            {copy.hero.greeting}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.name}>{copy.hero.name}</h1>
        </motion.div>

        {/* Animated role ticker */}
        <motion.div
          className={styles.roleTicker}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          aria-live="polite"
          aria-label={`Current role: ${copy.hero.roles[roleIndex]}`}
        >
          <span className={styles.rolePrefix} aria-hidden="true">// </span>
          <motion.span
            key={roleIndex}
            className={styles.roleText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {copy.hero.roles[roleIndex]}
          </motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {copy.hero.tagline.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlowButton
            onClick={() => scrollToSection('projects')}
            variant="primary"
            aria-label="Go to projects section"
          >
            {copy.hero.cta.primary}
          </GlowButton>
          <GlowButton
            onClick={() => scrollToSection('contact')}
            variant="ghost"
            aria-label="Go to contact section"
          >
            {copy.hero.cta.secondary}
          </GlowButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          className={styles.scrollIndicator}
          onClick={() => scrollToSection('about')}
          aria-label={copy.hero.scroll}
          title={copy.hero.scroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className={styles.scrollText}>{copy.hero.scroll}</span>
          <ChevronDown className={styles.scrollIcon} size={18} />
        </motion.button>
      </div>
    </section>
  );
}

