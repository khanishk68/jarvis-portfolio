import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const PHASES = [
  { threshold: 0, text: 'INITIALIZING SYSTEM ARCHITECTURE' },
  { threshold: 28, text: 'LOADING AI NEURAL MATRIX' },
  { threshold: 58, text: 'CALIBRATING HOLOGRAPHIC INTERFACE' },
  { threshold: 85, text: 'OPTIMIZING TELEMETRY & ASSETS' },
  { threshold: 100, text: 'ALL SYSTEMS OPERATIONAL' },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  const handleFinish = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Keydown to skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleFinish]);

  // Smooth progress incrementation
  useEffect(() => {
    if (reducedMotion) {
      handleFinish();
      return;
    }

    const duration = 1800; // total duration ms
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Easing curve: faster start, smooth finish
      const rawProgress = Math.min(100, Math.round((currentStep / steps) * 100));
      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(timer);
        setTimeout(handleFinish, 240);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [handleFinish, reducedMotion]);

  const currentStatus =
    [...PHASES].reverse().find((p) => progress >= p.threshold)?.text ?? PHASES[0].text;

  return (
    <motion.div
      className={styles.loadingOverlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading JARVIS System"
    >
      {/* Background grid & atmospheric glow */}
      <div className="grid-overlay" />
      <div className={`atmo-glow ${styles.glow}`} />

      <div className={styles.hudContainer}>
        {/* System badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>JARVIS OS // BOOT TELEMETRY</span>
        </div>

        {/* Reactor / Holographic HUD rings */}
        <div className={styles.reactor} aria-hidden="true">
          <div className={styles.outerRing} />
          <div className={styles.midRing} />
          <div className={styles.innerCore}>
            <div className={styles.counterWrap}>
              <span className={styles.percentage}>{progress}</span>
              <span className={styles.percentSign}>%</span>
            </div>
          </div>
        </div>

        {/* Telemetry status & progress bar */}
        <div className={styles.telemetry}>
          <div className={styles.statusText} aria-live="polite">
            <span className={styles.statusPrompt}>{'>'}</span>
            <span>{currentStatus}</span>
          </div>

          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer info & skip button */}
      <div className={styles.footerInfo}>
        <span>KHANISHK // AI PORTFOLIO SYSTEM</span>
        <button
          className={styles.skipBtn}
          onClick={handleFinish}
          aria-label="Skip loading animation"
        >
          Skip Intro <span aria-hidden="true">[ESC]</span>
        </button>
      </div>
    </motion.div>
  );
}

