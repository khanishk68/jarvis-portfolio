import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, SkipForward, RotateCcw } from 'lucide-react';
import { copy } from '../../data/copy';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { hasSpeechSynthesis } from '../../lib/utils';
import styles from './JarvisIntro.module.css';

interface JarvisIntroProps {
  onComplete: () => void;
}

export default function JarvisIntro({ onComplete }: JarvisIntroProps) {
  const reducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceAvailable] = useState(hasSpeechSynthesis);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const lines = copy.intro.lines;
  const currentLine = lines[lineIndex] ?? '';

  // Typewriter effect
  useEffect(() => {
    if (reducedMotion) {
      setLineIndex(lines.length - 1);
      setCharIndex(lines[lines.length - 1]?.length ?? 0);
      return;
    }

    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
      return () => clearTimeout(t);
    }

    if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex, currentLine.length, lines.length, reducedMotion]);

  // Speech synthesis
  const speak = useCallback(() => {
    if (!hasSpeechSynthesis()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(copy.intro.fullText);
    u.rate = 0.9;
    u.pitch = 0.85;
    u.lang = 'en-US';
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  }, []);

  const stopSpeak = useCallback(() => {
    if (hasSpeechSynthesis()) window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (voiceEnabled) speak();
    else stopSpeak();
    return () => { if (voiceEnabled) stopSpeak(); };
  }, [voiceEnabled, speak, stopSpeak]);

  // Auto-complete after last line fully typed
  useEffect(() => {
    if (lineIndex === lines.length - 1 && charIndex === currentLine.length) {
      const t = setTimeout(() => {}, 0); // keep open until user proceeds
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, currentLine.length, lines.length]);

  const handleSkip = () => {
    stopSpeak();
    onComplete();
  };

  const handleReplay = () => {
    setLineIndex(0);
    setCharIndex(0);
    if (voiceEnabled) speak();
  };

  return (
    <motion.section
      className={styles.intro}
      aria-label="JARVIS introduction"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background */}
      <div className="grid-overlay" />
      <div className={`atmo-glow ${styles.glow}`} />

      {/* JARVIS identifier */}
      <motion.div
        className={styles.identifier}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className={styles.identifierDot} />
        <span className={styles.identifierLabel}>JARVIS — SYSTEM INTERFACE</span>
      </motion.div>

      {/* Typewriter dialogue */}
      <div className={styles.dialogue} aria-live="polite">
        {reducedMotion ? (
          lines.map((line, i) => (
            <motion.p
              key={i}
              className={`${styles.line} ${i === lines.length - 1 ? styles.last : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {line}
            </motion.p>
          ))
        ) : (
          <>
            {lines.slice(0, lineIndex).map((line, i) => (
              <p key={i} className={styles.line}>{line}</p>
            ))}
            <p className={`${styles.line} ${styles.typing}`}>
              {currentLine.slice(0, charIndex)}
              <span className={styles.typingCursor} aria-hidden="true">|</span>
            </p>
          </>
        )}
      </div>

      {/* Controls */}
      <motion.div
        className={styles.controls}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {voiceAvailable && (
          <>
            <button
              className={styles.controlBtn}
              onClick={() => setVoiceEnabled((v) => !v)}
              aria-label={voiceEnabled ? 'Mute JARVIS voice' : 'Enable JARVIS voice (browser speech synthesis)'}
              title={voiceEnabled ? 'Mute' : 'Enable voice'}
            >
              {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{voiceEnabled ? 'Mute' : 'Voice'}</span>
            </button>

            <button
              className={styles.controlBtn}
              onClick={handleReplay}
              aria-label="Replay introduction"
            >
              <RotateCcw size={16} />
              <span>Replay</span>
            </button>
          </>
        )}

        <button
          className={`${styles.controlBtn} ${styles.primary}`}
          onClick={handleSkip}
          aria-label="Continue to portfolio"
        >
          <SkipForward size={16} />
          <span>Continue</span>
        </button>
      </motion.div>

      {/* Voice note */}
      {voiceAvailable && (
        <p className={styles.voiceNote}>
          Voice uses browser speech synthesis — no external service.
        </p>
      )}
    </motion.section>
  );
}

