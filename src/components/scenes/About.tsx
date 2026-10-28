import { useState } from 'react';
import { copy } from '../../data/copy';
import SectionReveal from '../ui/SectionReveal';
import styles from './About.module.css';

const interests = copy.about.interests;

export default function About() {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="about" className={`section ${styles.about}`} aria-label="About Khanishk">
      <div className="grid-overlay" />
      <div className={`atmo-glow ${styles.glow}`} />

      <div className="container">
        {/* Section label */}
        <SectionReveal>
          <span className={`label-mono ${styles.label}`}>{copy.about.label}</span>
        </SectionReveal>

        <div className={styles.layout}>
          {/* Pull quote */}
          <SectionReveal delay={0.1}>
            <div className={styles.quoteColumn}>
              <blockquote className={styles.pullQuote}>
                {copy.about.pullQuote}
              </blockquote>

              {/* Interest tags */}
              <div className={styles.interests} aria-label="Areas of interest">
                {interests.map((interest) => (
                  <span key={interest} className={styles.interestTag}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Bio */}
          <div className={styles.bioColumn}>
            {copy.about.bio.map((para, i) => (
              <SectionReveal key={i} delay={0.15 + i * 0.1}>
                <p className={styles.bioPara}>{para}</p>
              </SectionReveal>
            ))}

            {/* Decorative divider */}
            <SectionReveal delay={0.45}>
              <div className={styles.profileCard}>
                <div className={styles.profileCardInner}>
                  <div className={styles.profileAvatar} aria-label="Profile photo">
                    {!avatarError ? (
                      <img
                        src="/profile.jpg"
                        alt={copy.name}
                        className={styles.profileImg}
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <span className={styles.profileInitial}>K</span>
                    )}
                    <div className={styles.avatarRing} />
                  </div>
                  <div className={styles.profileInfo}>
                    <span className={styles.profileName}>{copy.name}</span>
                    <span className={styles.profileSub}>Creator of JARVIS</span>
                  </div>
                </div>

                {/* Decorative data readout */}
                <div className={styles.dataReadout}>
                  {['AI Systems', 'Software Dev', 'Creative Tech'].map((tag) => (
                    <div key={tag} className={styles.dataRow}>
                      <span className={styles.dataKey}>INTEREST</span>
                      <span className={styles.dataVal}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

