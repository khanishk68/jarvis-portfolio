import React from 'react';
import { motion } from 'framer-motion';
import styles from './GlowButton.module.css';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export default function GlowButton({ variant = 'primary', children, className, ...props }: GlowButtonProps) {
  return (
    <motion.button
      className={`${styles.btn} ${styles[variant]} ${className ?? ''}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}

