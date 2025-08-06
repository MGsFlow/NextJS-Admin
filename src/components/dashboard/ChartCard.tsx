'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { useDashboardStore } from '../../store/dashboardStore';

interface ChartCardProps {
  title: string;
  data: Array<{ x: string; y: number }>;
  color?: 'purple' | 'cyan' | 'green';
  delay?: number;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  color = 'purple',
  delay = 0
}) => {
  const [animatedData, setAnimatedData] = useState(data.map(() => 0));
  const [isHovered, setIsHovered] = useState(false);
  const { uiSettings } = useDashboardStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data.map(d => d.y));
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [data, delay]);

  const maxValue = Math.max(...data.map(d => d.y));
  const minValue = Math.min(...data.map(d => d.y));
  const range = maxValue - minValue;

  const colorMap = {
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      line: 'stroke-purple-400',
      fill: 'fill-purple-400/20',
      glow: 'shadow-purple-500/20'
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      text: 'text-cyan-400',
      line: 'stroke-cyan-400',
      fill: 'fill-cyan-400/20',
      glow: 'shadow-cyan-500/20'
    },
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      text: 'text-green-400',
      line: 'stroke-green-400',
      fill: 'fill-green-400/20',
      glow: 'shadow-green-500/20'
    }
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: uiSettings.animationSpeed / 100 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: uiSettings.glowEffect ? 
          `0 0 30px ${colors.glow.split('/')[0].split('-')[1] === 'purple' ? 'rgba(147, 51, 234, 0.3)' : 'rgba(34, 211, 238, 0.3)'}` : 
          'none'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative p-6 rounded-xl border backdrop-blur-sm
        ${colors.bg} ${colors.border}
        transition-all duration-300 ease-out
        group cursor-pointer
      `}
      style={{
        borderRadius: uiSettings.borderRadius === 'small' ? '8px' : 
                   uiSettings.borderRadius === 'large' ? '16px' : '12px',
        transition: `all ${uiSettings.animationSpeed / 100}s ease`,
        backdropFilter: uiSettings.blurEffect ? 'blur(8px)' : 'none',
      }}
    >
      {/* 글로우 효과 */}
      {uiSettings.glowEffect && (
        <div className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ${colors.glow}
        `} style={{
          borderRadius: uiSettings.borderRadius === 'small' ? '8px' : 
                     uiSettings.borderRadius === 'large' ? '16px' : '12px',
        }} />
      )}
      
      {/* 카드 헤더 */}
      <div className="relative z-10 mb-6">
        <h3 className={`text-lg font-medium ${colors.text}`} style={{
          fontSize: uiSettings.fontSize === 'small' ? '1rem' :
                   uiSettings.fontSize === 'large' ? '1.25rem' :
                   uiSettings.fontSize === 'xlarge' ? '1.5rem' : '1.125rem',
        }}>
          {title}
        </h3>
      </div>

      {/* 차트 영역 */}
      <div className="relative z-10 h-48">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 200"
          className="w-full h-full"
        >
          {/* 그리드 라인 */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(147, 51, 234, 0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* 데이터 포인트들 */}
          {animatedData.map((value, index) => {
            const x = (index / (data.length - 1)) * 400;
            const y = 200 - ((value - minValue) / range) * 180;
            
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={colors.line.split('-')[1] === 'purple' ? '#a855f7' : '#22d3ee'}
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1.5 : 1 }}
                transition={{ delay: index * 0.1, duration: uiSettings.animationSpeed / 100 }}
              />
            );
          })}
          
          {/* 라인 차트 */}
          <motion.path
            d={animatedData.map((value, index) => {
              const x = (index / (data.length - 1)) * 400;
              const y = 200 - ((value - minValue) / range) * 180;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            stroke={colors.line.split('-')[1] === 'purple' ? '#a855f7' : '#22d3ee'}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: uiSettings.animationSpeed / 50, delay }}
          />
          
          {/* 영역 채우기 */}
          <motion.path
            d={`${animatedData.map((value, index) => {
              const x = (index / (data.length - 1)) * 400;
              const y = 200 - ((value - minValue) / range) * 180;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')} L 400 200 L 0 200 Z`}
            fill={colors.fill.split('/')[1] === '20' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(34, 211, 238, 0.1)'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: uiSettings.animationSpeed / 100, delay: delay + 0.5 }}
          />
        </svg>
      </div>

      {/* 통계 정보 */}
      <div className="relative z-10 mt-4 flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold text-white" style={{
            fontSize: uiSettings.fontSize === 'small' ? '1.5rem' :
                     uiSettings.fontSize === 'large' ? '2rem' :
                     uiSettings.fontSize === 'xlarge' ? '2.25rem' : '1.75rem',
          }}>
            {Math.round(animatedData[animatedData.length - 1])}
          </div>
          <div className="text-sm text-gray-400" style={{
            fontSize: uiSettings.fontSize === 'small' ? '0.75rem' :
                     uiSettings.fontSize === 'large' ? '0.875rem' :
                     uiSettings.fontSize === 'xlarge' ? '1rem' : '0.8rem',
          }}>
            Current Value
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: uiSettings.animationSpeed / 100 }}
          >
            <TrendingUp className="text-green-400 text-sm" />
          </motion.div>
          <span className="text-sm text-green-400" style={{
            fontSize: uiSettings.fontSize === 'small' ? '0.75rem' :
                     uiSettings.fontSize === 'large' ? '0.875rem' :
                     uiSettings.fontSize === 'xlarge' ? '1rem' : '0.8rem',
          }}>
            +12.5%
          </span>
        </div>
      </div>
      
      {/* 사이버펑크 라인 효과 */}
      {uiSettings.glowEffect && (
        <>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </>
      )}
    </motion.div>
  );
}; 