import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionReveal from '../ui/SectionReveal';
import styles from './Skills.module.css';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const reducedMotion = useReducedMotion();

  const active = skillCategories.find((c) => c.id === activeCategory) ?? skillCategories[0];

  return (
    <section id="skills" className={`section ${styles.skills}`} aria-label="Skills">
      <div className="grid-overlay" />
      <div className={`atmo-glow ${styles.glow}`} />

      <div className="container">
        <SectionReveal>
          <span className={`label-mono ${styles.label}`}>Skills Intelligence</span>
          <h2 className={styles.heading}>Capability Matrix</h2>
          <p className={styles.sub}>
            Self-assessed proficiency levels — all values are editable and reflect current working knowledge.
          </p>
        </SectionReveal>

        <div className={styles.layout}>
          {/* Category tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Skill categories">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls={`skillpanel-${cat.id}`}
                id={`skilltab-${cat.id}`}
                className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className={styles.tabIcon} aria-hidden="true">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Skills panel */}
          <div
            className={styles.panel}
            role="tabpanel"
            id={`skillpanel-${active.id}`}
            aria-labelledby={`skilltab-${active.id}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className={styles.skillList}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {active.skills.map((skill, i) => (
                  <SkillBar
                    key={`${active.id}-${skill.name}`}
                    name={skill.name}
                    level={skill.level}
                    index={i}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
  reducedMotion: boolean;
}

function SkillBar({ name, level, index, reducedMotion }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const shouldAnimate = inView && !reducedMotion;

  return (
    <div ref={ref} className={styles.skillRow}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel} aria-label={`${level} percent`}>{level}%</span>
      </div>

      <div
        className={styles.barTrack}
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency: ${level}%`}
      >
        <motion.div
          className={styles.barFill}
          initial={{ width: reducedMotion ? `${level}%` : '0%' }}
          animate={shouldAnimate ? { width: `${level}%` } : reducedMotion ? { width: `${level}%` } : {}}
          transition={{
            duration: 0.9,
            delay: index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            background: `linear-gradient(90deg, var(--color-cyan), var(--color-electric-glow) ${level}%)`,
          }}
        />
        <motion.div
          className={styles.barGlow}
          initial={{ width: reducedMotion ? `${level}%` : '0%' }}
          animate={shouldAnimate ? { width: `${level}%` } : reducedMotion ? { width: `${level}%` } : {}}
          transition={{
            duration: 0.9,
            delay: index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </div>
  );
}

