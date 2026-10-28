import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { copy } from '../../data/copy';
import { hasSpeechSynthesis } from '../../lib/utils';
import styles from './JarvisVoicePlayer.module.css';

interface JarvisVoicePlayerProps {
  active?: boolean;
}

export default function JarvisVoicePlayer({ active = true }: JarvisVoicePlayerProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hasSpokenRef = useRef(false);
  const isMutedRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  isMutedRef.current = isMuted;

  const getJarvisVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('UK') ||
            v.name.includes('British') ||
            v.name.includes('Natural') ||
            v.name.includes('George') ||
            v.name.includes('Daniel') ||
            v.name.includes('Male'))
      ) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      voices[0] ||
      null
    );
  }, []);

  const speak = useCallback(() => {
    if (!hasSpeechSynthesis()) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(copy.intro.fullText);
    utterance.rate = 0.92;
    utterance.pitch = 0.88;
    utterance.lang = 'en-US';

    const voice = getJarvisVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsMuted(false);
      hasSpokenRef.current = true;
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  }, [getJarvisVoice]);

  const stop = useCallback(() => {
    if (!hasSpeechSynthesis()) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsMuted(true);
  }, []);

  const toggleMute = () => {
    if (isSpeaking) {
      stop();
    } else {
      setIsMuted(false);
      speak();
    }
  };

  const replay = () => {
    setIsMuted(false);
    speak();
  };

  useEffect(() => {
    if (!hasSpeechSynthesis() || !active) return;

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Voices loaded
      };
    }

    // Try autoplay unmuted immediately on page load
    try {
      speak();
    } catch {
      // Autoplay blocked by browser policy
    }

    // Trigger on first user interaction if browser delayed speech
    const handleFirstInteraction = () => {
      if (!hasSpokenRef.current && !isMutedRef.current) {
        speak();
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      cleanup();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speak, active]);

  if (!hasSpeechSynthesis()) return null;

  return (
    <aside
      className={`${styles.player} ${isSpeaking ? styles.playerSpeaking : ''}`}
      aria-label="JARVIS Voice Assistant"
    >
      <div className={styles.statusGroup}>
        <div className={styles.wave} aria-hidden="true">
          <span className={`${styles.bar} ${!isSpeaking ? styles.barIdle : ''}`} />
          <span className={`${styles.bar} ${!isSpeaking ? styles.barIdle : ''}`} />
          <span className={`${styles.bar} ${!isSpeaking ? styles.barIdle : ''}`} />
          <span className={`${styles.bar} ${!isSpeaking ? styles.barIdle : ''}`} />
        </div>
        <span className={styles.label}>
          {isSpeaking ? 'JARVIS SPEAKING' : isMuted ? 'JARVIS MUTED' : 'JARVIS VOICE'}
        </span>
      </div>

      <button
        className={styles.btn}
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute JARVIS voice' : 'Mute JARVIS voice'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      <button
        className={styles.btn}
        onClick={replay}
        aria-label="Replay JARVIS introduction"
        title="Replay Voice"
      >
        <RotateCcw size={14} />
      </button>
    </aside>
  );
}

