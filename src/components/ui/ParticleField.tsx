import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  className?: string;
  count?: number;
}

const isMobile = () => window.innerWidth < 768;

export default function ParticleField({ className, count }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = isMobile();
    const particleCount = count ?? (mobile ? 20 : 55);
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const createParticle = (): Particle => {
      const maxLife = 120 + Math.random() * 180;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        opacity: 0,
        size: 1 + Math.random() * 1.5,
        life: 0,
        maxLife,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife; // stagger initial lives
      particles.push(p);
    }

    const COLORS = ['rgba(6, 182, 212,', 'rgba(124, 58, 237,', 'rgba(59, 130, 246,'];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        if (p.life > p.maxLife) {
          particles[i] = createParticle();
          continue;
        }

        const t = p.life / p.maxLife;
        // Fade in first 20%, full opacity middle, fade out last 20%
        let alpha = 0;
        if (t < 0.2) alpha = t / 0.2;
        else if (t > 0.8) alpha = (1 - t) / 0.2;
        else alpha = 1;
        alpha *= 0.35;

        p.x += p.vx;
        p.y += p.vy;

        const color = COLORS[i % COLORS.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [reducedMotion, count]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  );
}

