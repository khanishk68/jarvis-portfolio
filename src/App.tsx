import { useState } from 'react';
import './styles/tokens.css';
import './styles/global.css';
import CustomCursor from './components/cursor/CustomCursor';
import Navigation from './components/nav/Navigation';
import BootSequence from './components/scenes/BootSequence';
import JarvisIntro from './components/scenes/JarvisIntro';
import Hero from './components/scenes/Hero';
import About from './components/scenes/About';
import Projects from './components/scenes/Projects';
import Skills from './components/scenes/Skills';
import Contact from './components/scenes/Contact';
import Footer from './components/scenes/Footer';
import JarvisVoicePlayer from './components/audio/JarvisVoicePlayer';

type Stage = 'boot' | 'intro' | 'main';

export default function App() {
  const [stage, setStage] = useState<Stage>('main');

  return (
    <>
      {/* Custom cursor — only renders on fine pointer devices */}
      <CustomCursor />

      {/* Boot sequence (available on demand) */}
      {stage === 'boot' && (
        <BootSequence onComplete={() => setStage('main')} />
      )}

      {/* JARVIS intro narration (available on demand) */}
      {stage === 'intro' && (
        <JarvisIntro onComplete={() => setStage('main')} />
      )}

      {/* Main portfolio — opens directly */}
      {stage === 'main' && (
        <>
          {/* Skip to content — first focusable element */}
          <a href="#home" className="skip-to-content">
            Skip to main content
          </a>

          <Navigation />

          {/* JARVIS background voice — unmuted by default, zero captions */}
          <JarvisVoicePlayer />

          <main id="main-content">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
