'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  duration = 0.5,
  variant = 'fadeIn'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };

    switch (variant) {
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 }
        };
      default:
        return baseVariants;
    }
  };

  const characters = text.split('');

  return (
    <div ref={ref} className={`split-text ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={getVariants()}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block"
          style={{
            display: char === ' ' ? 'inline' : 'inline-block'
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}; 