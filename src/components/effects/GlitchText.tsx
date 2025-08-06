'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GlitchTextProps {
  text: string;
  glitchIntensity?: number;
  glitchDuration?: number;
  glitchInterval?: number;
  enableHover?: boolean;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  glitchIntensity = 0.1,
  glitchDuration = 0.2,
  glitchInterval = 3000,
  enableHover = true,
  className = '',
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const createGlitchText = (originalText: string): string => {
    return originalText
      .split('')
      .map(char => 
        Math.random() < glitchIntensity 
          ? glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)]
          : char
      )
      .join('');
  };

  const triggerGlitch = () => {
    if (!textRef.current || isGlitching) return;

    setIsGlitching(true);
    const originalText = textRef.current.textContent || '';
    
    // 글리치 효과 시작
    const glitchText = createGlitchText(originalText);
    textRef.current.textContent = glitchText;
    
    // CSS 글리치 효과
    gsap.to(textRef.current, {
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
      skewX: Math.random() * 10 - 5,
      skewY: Math.random() * 10 - 5,
      duration: glitchDuration,
      ease: 'power2.inOut',
      onComplete: () => {
        // 원래 텍스트로 복원
        gsap.to(textRef.current, {
          x: 0,
          y: 0,
          skewX: 0,
          skewY: 0,
          duration: glitchDuration,
          ease: 'power2.inOut',
          onComplete: () => {
            textRef.current!.textContent = originalText;
            setIsGlitching(false);
          },
        });
      },
    });
  };

  useEffect(() => {
    if (!textRef.current) return;

    // 주기적 글리치 효과
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% 확률로 글리치 발생
        triggerGlitch();
      }
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [glitchIntensity, glitchDuration, glitchInterval]);

  const handleMouseEnter = () => {
    if (!enableHover) return;
    triggerGlitch();
  };

  const handleClick = () => {
    triggerGlitch();
  };

  return (
    <div
      ref={textRef}
      className={`glitch-text ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#ffffff',
        textShadow: `
          2px 2px 0px #ff0000,
          -2px -2px 0px #00ffff,
          2px -2px 0px #ffff00,
          -2px 2px 0px #ff00ff
        `,
        cursor: 'pointer',
        position: 'relative',
        display: 'inline-block',
        transition: 'all 0.3s ease',
      }}
    >
      {text}
    </div>
  );
};

export default GlitchText; 