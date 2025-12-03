import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  targetX: number;
  targetY: number;
  melt: number;
}

export default function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number>();
  const spawnCounterRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleWindowResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawMeltingParticle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      melt: number,
      opacity: number
    ) => {
      const baseSize = 8;
      const meltAmount = baseSize * melt * 2;

      ctx.fillStyle = `rgba(74, 222, 128, ${opacity * 0.8})`;

      ctx.beginPath();
      ctx.ellipse(x, y, baseSize - meltAmount * 0.5, baseSize + meltAmount, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(74, 222, 128, ${opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (melt > 0.2) {
        ctx.fillStyle = `rgba(74, 222, 128, ${opacity * 0.4})`;
        const drips = Math.floor(melt * 8);
        for (let i = 0; i < drips; i++) {
          const dripX = x + (Math.sin(i * 0.7) * baseSize * melt);
          const dripY = y + baseSize + (i * meltAmount * 0.3);
          ctx.beginPath();
          ctx.arc(dripX, dripY, 2 + melt * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      spawnCounterRef.current++;
      if (spawnCounterRef.current % 20 === 0 && particlesRef.current.length < 50) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 400 + Math.random() * 300,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          melt: 0,
        });
      }

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++;

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const meltkRadius = 250;

        if (distToMouse < meltkRadius) {
          particle.melt = Math.min(1, particle.melt + 0.03);
        } else {
          particle.melt = Math.max(0, particle.melt - 0.01);
        }

        const progress = particle.life / particle.maxLife;
        let opacity = 0.7;

        if (progress > 0.75) {
          opacity *= 1 - ((progress - 0.75) / 0.25);
        }

        if (particle.melt < 0.1) {
          const wanderStrength = 0.02;
          particle.vx += (Math.random() - 0.5) * wanderStrength;
          particle.vy += (Math.random() - 0.5) * wanderStrength;

          particle.vx *= 0.995;
          particle.vy *= 0.995;
        } else {
          particle.vx *= 0.85;
          particle.vy *= 0.85;
          particle.vy += 0.15;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y > canvas.height + 20) {
          particle.life = particle.maxLife;
        }

        drawMeltingParticle(ctx, particle.x, particle.y, particle.melt, opacity);

        return particle.life < particle.maxLife;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleWindowResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleWindowResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
