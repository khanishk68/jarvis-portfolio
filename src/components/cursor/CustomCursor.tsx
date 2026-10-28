import { useCursor } from '../../hooks/useCursor';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const { dotRef, ringRef } = useCursor();

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}

