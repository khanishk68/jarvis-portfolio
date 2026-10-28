import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { copy } from '../../data/copy';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import AICoreCSS from '../three/AICoreCSS';
import styles from './BootSequence.module.css';

const AICore = lazy(() => import('../three/AICore'));

interface BootSequenceProps {
  onComplete: () => void;
}

const TOTAL_DURATION = 6000; // ms before auto-advance

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<number>(0);
  const [sysLineIndex, setSysLineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // If reduced motion, skip directly to end
  useEffect(() => {
    if (reducedMotion) {
      handleSkip();
    }
  }, [reducedMotion]);

  // Phase timer
  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => setPhase(5), 4400),
      setTimeout(() => setPhase(6), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  // System text ticker
  useEffect(() => {
    if (reducedMotion || phase < 1) return;
    const interval = setInterval(() => {
      setSysLineIndex((i) => {
        if (i >= copy.boot.systemLines.length - 1) {
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [phase, reducedMotion]);

  // Auto-advance
  useEffect(() => {
    if (reducedMotion) return;
    const t = setTimeout(() => handleExit(), TOTAL_DURATION);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  // Keyboard skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') handleSkip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSkip = () => {
    setPhase(6);
    setTimeout(handleExit, 300);
  };

  const handleExit = () => {
    setVisible(false);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.boot}
          role="region"
          aria-label="JARVIS boot sequence"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Background grid */}
          <div className="grid-overlay" />

          {/* Atmospheric glows */}
          <div className={`atmo-glow ${styles.glow1}`} />
          <div className={`atmo-glow ${styles.glow2}`} />

          {/* AI Core */}
          <motion.div
            className={styles.coreWrap}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<AICoreCSS />}>
              <AICore />
            </Suspense>
          </motion.div>

          {/* System log */}
          <motion.div
            className={styles.sysLog}
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-live="polite"
          >
            {copy.boot.systemLines.slice(0, sysLineIndex + 1).map((line, i) => (
              <div
                key={i}
                className={`${styles.sysLine} ${i === sysLineIndex ? styles.active : ''}`}
              >
                <span className={styles.prompt}>{'>'}</span>
                {line}
              </div>
            ))}
            {phase >= 1 && <span className={styles.cursor} aria-hidden="true">_</span>}
          </motion.div>

          {/* Main headline */}
          <motion.div
            className={styles.headline}
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            animate={phase >= 4 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className={styles.headlineText}>{copy.boot.headline}</h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            className={styles.subheadline}
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{copy.boot.subheadline}</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase >= 6 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <button
              className={styles.ctaBtn}
              onClick={handleExit}
              aria-label="Enter portfolio"
            >
              {copy.boot.cta}
              <span className={styles.ctaBtnArrow} aria-hidden="true">→</span>
            </button>
          </motion.div>

          {/* Skip button — always visible */}
          <button
            className={styles.skipBtn}
            onClick={handleSkip}
            aria-label="Skip intro animation"
          >
            <span>{copy.boot.skip}</span>
            <span className={styles.escBadge} aria-hidden="true">ESC</span>
          </button>

          {/* Screen reader announcement */}
          <div className="sr-only" aria-live="assertive">
            {phase >= 4 ? copy.boot.headline : ''}
            {phase >= 5 ? '. ' + copy.boot.subheadline : ''}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

