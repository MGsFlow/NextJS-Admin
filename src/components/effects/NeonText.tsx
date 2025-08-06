'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface NeonTextProps {
  text: string;
  color?: string;
  glowIntensity?: number;
  animationSpeed?: number;
  enableHover?: boolean;
  enableTyping?: boolean;
  className?: string;
}

const NeonText: React.FC<NeonTextProps> = ({
  text,
  color = '#00ffff',
  glowIntensity = 2,
  animationSpeed = 2,
  enableHover = true,
  enableTyping = false,
  className = '',
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // 네온 글로우 효과
    const glowAnimation = gsap.to(textRef.current, {
      textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color}`,
      duration: animationSpeed,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      glowAnimation.kill();
    };
  }, [color, animationSpeed]);

  useEffect(() => {
    if (!enableTyping || !typingRef.current) return;

    const chars = text.split('');
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < chars.length) {
        typingRef.current!.textContent += chars[currentIndex];
        currentIndex++;
        setTimeout(typeNextChar, 100);
      }
    };

    typeNextChar();
  }, [text, enableTyping]);

  const handleMouseEnter = () => {
    if (!enableHover || !textRef.current) return;

    gsap.to(textRef.current, {
      scale: 1.1,
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}`,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!enableHover || !textRef.current) return;

    gsap.to(textRef.current, {
      scale: 1,
      textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color}`,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={textRef}
      className={`neon-text ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        color: color,
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        cursor: enableHover ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color}`,
      }}
    >
      {enableTyping ? (
        <span ref={typingRef}></span>
      ) : (
        text
      )}
    </div>
  );
};

export default NeonText; 