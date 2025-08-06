'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown
} from '@mui/icons-material';
import { useDashboardStore } from '../../store/dashboardStore';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon?: React.ReactNode;
  color?: 'purple' | 'cyan' | 'green' | 'orange' | 'red';
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'purple',
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { uiSettings } = useDashboardStore();

  const formatValue = (val: number | string) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toString();
    }
    return val;
  };

  const getColorClass = () => {
    switch (color) {
      case 'purple':
        return styles.purple;
      case 'cyan':
        return styles.cyan;
      case 'green':
        return styles.green;
      case 'orange':
        return styles.orange;
      case 'red':
        return styles.red;
      default:
        return styles.purple;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: uiSettings.animationSpeed / 100 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: uiSettings.glowEffect ? 
          (color === 'purple' ? '0 0 30px rgba(147, 51, 234, 0.3)' : '0 0 30px rgba(34, 211, 238, 0.3)') : 
          'none'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${styles.card} ${getColorClass()}`}
      style={{
        borderRadius: uiSettings.borderRadius === 'small' ? '8px' : 
                   uiSettings.borderRadius === 'large' ? '16px' : '12px',
        transition: `all ${uiSettings.animationSpeed / 100}s ease`,
        backdropFilter: uiSettings.blurEffect ? 'blur(8px)' : 'none',
      }}
    >
      {/* 글로우 효과 */}
      {uiSettings.glowEffect && <div className={styles.glowEffect} />}
      
      {/* 카드 내용 */}
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title} style={{
            fontSize: uiSettings.fontSize === 'small' ? '0.875rem' :
                     uiSettings.fontSize === 'large' ? '1.125rem' :
                     uiSettings.fontSize === 'xlarge' ? '1.25rem' : '1rem',
          }}>
            {title}
          </div>
          <motion.div
            className={styles.icon}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: uiSettings.animationSpeed / 100, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        </div>
        
        <div className={styles.valueContainer}>
          <div className={styles.value} style={{
            fontSize: uiSettings.fontSize === 'small' ? '1.5rem' :
                     uiSettings.fontSize === 'large' ? '2rem' :
                     uiSettings.fontSize === 'xlarge' ? '2.25rem' : '1.75rem',
          }}>
            {formatValue(value)}
          </div>
        </div>
        
        {change !== undefined && (
          <div className={styles.changeContainer}>
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: uiSettings.animationSpeed / 100 }}
            >
              {change >= 0 ? (
                <TrendingUp className={styles.trendIcon} />
              ) : (
                <TrendingDown className={styles.trendIcon} />
              )}
            </motion.div>
            <span className={`${styles.changeText} ${change >= 0 ? styles.positive : styles.negative}`} style={{
              fontSize: uiSettings.fontSize === 'small' ? '0.75rem' :
                       uiSettings.fontSize === 'large' ? '0.875rem' :
                       uiSettings.fontSize === 'xlarge' ? '1rem' : '0.8rem',
            }}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
      
      {/* 사이버펑크 라인 효과 */}
      {uiSettings.glowEffect && (
        <>
          <div className={styles.topLine} />
          <div className={styles.rightLine} />
        </>
      )}
    </motion.div>
  );
}; 