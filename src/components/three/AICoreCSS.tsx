import styles from './AICoreCSS.module.css';

/** CSS-only AI core — shown when WebGL is unavailable or Three.js is loading */
export default function AICoreCSS() {
  return (
    <div className={styles.core} aria-hidden="true">
      {/* Central orb */}
      <div className={styles.orb} />

      {/* Rings */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`${styles.ring} ${styles[`ring${i}`]}`} />
      ))}

      {/* Rotating hexagon grid */}
      <div className={styles.hexGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.hexNode} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Scan line */}
      <div className={styles.scanLine} />

      {/* Corner decorators */}
      {['tl', 'tr', 'bl', 'br'].map((pos) => (
        <div key={pos} className={`${styles.corner} ${styles[pos]}`} />
      ))}
    </div>
  );
}

