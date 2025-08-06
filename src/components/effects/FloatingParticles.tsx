'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingParticlesProps {
  particleCount?: number;
  colors?: string[];
  sizeRange?: [number, number];
  speedRange?: [number, number];
  opacityRange?: [number, number];
  enableMouseInteraction?: boolean;
  className?: string;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  particleCount = 50,
  colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff8000'],
  sizeRange = [2, 6],
  speedRange = [20, 60],
  opacityRange = [0.3, 0.8],
  enableMouseInteraction = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // 파티클 생성
    const createParticle = (): HTMLDivElement => {
      const particle = document.createElement('div');
      const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${opacity};
        pointer-events: none;
        box-shadow: 0 0 ${size * 2}px ${color};
      `;

      return particle;
    };

    // 파티클 애니메이션
    const animateParticle = (particle: HTMLDivElement) => {
      const startX = Math.random() * width;
      const startY = height + 10;
      const endX = Math.random() * width;
      const endY = -10;
      const duration = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;

      gsap.to(particle, {
        x: endX - startX,
        y: endY - startY,
        duration: duration,
        ease: 'none',
        onComplete: () => {
          // 파티클 재사용
          const newStartX = Math.random() * width;
          const newEndX = Math.random() * width;
          
          particle.style.left = `${newStartX}px`;
          particle.style.top = `${height + 10}px`;
          
          gsap.to(particle, {
            x: newEndX - newStartX,
            y: -10 - (height + 10),
            duration: duration,
            ease: 'none',
            onComplete: () => animateParticle(particle),
          });
        },
      });
    };

    // 파티클들 생성 및 애니메이션 시작
    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle();
      container.appendChild(particle);
      particlesRef.current.push(particle);
      
      // 지연 시작으로 자연스러운 효과
      setTimeout(() => animateParticle(particle), Math.random() * 5000);
    }

    // 마우스 인터랙션
    if (enableMouseInteraction) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        particlesRef.current.forEach((particle) => {
          const particleRect = particle.getBoundingClientRect();
          const particleX = particleRect.left + particleRect.width / 2 - rect.left;
          const particleY = particleRect.top + particleRect.height / 2 - rect.top;
          
          const distance = Math.hypot(mouseX - particleX, mouseY - particleY);
          const maxDistance = 100;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
            const pushX = Math.cos(angle) * force * 2;
            const pushY = Math.sin(angle) * force * 2;

            gsap.to(particle, {
              x: `+=${pushX}`,
              y: `+=${pushY}`,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        });
      };

      container.addEventListener('mousemove', handleMouseMove);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        particlesRef.current.forEach(particle => {
          gsap.killTweensOf(particle);
          particle.remove();
        });
        particlesRef.current = [];
      };
    }

    return () => {
      particlesRef.current.forEach(particle => {
        gsap.killTweensOf(particle);
        particle.remove();
      });
      particlesRef.current = [];
    };
  }, [particleCount, colors, sizeRange, speedRange, opacityRange, enableMouseInteraction]);

  return (
    <div
      ref={containerRef}
      className={`floating-particles ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    />
  );
};

export default FloatingParticles; 