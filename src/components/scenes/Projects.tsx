import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp, Code2 } from 'lucide-react';
import { projects } from '../../data/projects';
import { copy } from '../../data/copy';
import SectionReveal from '../ui/SectionReveal';
import styles from './Projects.module.css';

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  'in-progress': 'In Progress',
  prototype: 'Prototype',
};

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className={`section ${styles.projects}`} aria-label="Projects">
      <div className="grid-overlay" />
      <div className={`atmo-glow ${styles.glow}`} />

      <div className="container">
        <SectionReveal>
          <span className={`label-mono ${styles.label}`}>Project Universe</span>
          <h2 className={styles.heading}>What I Build</h2>
        </SectionReveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <SectionReveal key={project.id} delay={i * 0.12}>
              <article
                className={`glass-card ${styles.card} ${expanded === project.id ? styles.expanded : ''}`}
                aria-label={`Project: ${project.name}`}
              >
                {/* Card header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardMeta}>
                    <div className={styles.cardIcon} aria-hidden="true">
                      <Code2 size={20} />
                    </div>
                    <span className={`${styles.statusBadge} ${styles[project.status]}`}>
                      {STATUS_LABELS[project.status]}
                    </span>
                  </div>

                  <h3 className={styles.cardName}>{project.name}</h3>
                  <p className={styles.cardTagline}>{project.tagline}</p>
                  <p className={styles.cardSummary}>{project.summary}</p>

                  {/* Stack */}
                  <div className={styles.stack} aria-label="Technology stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className={styles.stackPill}>{tech}</span>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.repoUrl || project.demoUrl) && (
                    <div className={styles.links}>
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.linkBtn}
                          aria-label={`View ${project.name} source code on GitHub`}
                        >
                          <Github size={14} />
                          <span>Repository</span>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}
                          aria-label={`Open ${project.name} live demo`}
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Expand toggle */}
                <button
                  className={styles.expandToggle}
                  onClick={() => toggle(project.id)}
                  aria-expanded={expanded === project.id}
                  aria-label={expanded === project.id
                    ? `Collapse ${project.name} details`
                    : `Expand ${project.name} details`}
                >
                  <span>Details</span>
                  {expanded === project.id
                    ? <ChevronUp size={14} />
                    : <ChevronDown size={14} />}
                </button>

                {/* Expandable details */}
                <AnimatePresence initial={false}>
                  {expanded === project.id && (
                    <motion.div
                      className={styles.details}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className={styles.detailsInner}>
                        <div className={styles.detailBlock}>
                          <span className={styles.detailLabel}>The Problem</span>
                          <p className={styles.detailText}>{project.problem}</p>
                        </div>
                        <div className={styles.detailBlock}>
                          <span className={styles.detailLabel}>The Solution</span>
                          <p className={styles.detailText}>{project.solution}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

