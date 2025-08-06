'use client';

import { motion } from 'framer-motion';
import { useEffect, useCallback } from 'react';
import { 
  Notifications, 
  Search, 
  DarkMode, 
  LightMode,
  Refresh,
  People,
  AttachMoney,
  ShoppingCart,
  TrackChanges,
  Mouse
} from '@mui/icons-material';
import { useDashboardStore } from '../store/dashboardStore';
import { CyberpunkBackground } from '../components/backgrounds/CyberpunkBackground';
import { Sidebar } from '../components/dashboard/Sidebar';
import { StatCard } from '../components/dashboard/StatCard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { SplitText } from '../components/animations/SplitText';
import NeonText from '../components/effects/NeonText';
import FloatingParticles from '../components/effects/FloatingParticles';
import GlitchText from '../components/effects/GlitchText';
import SplashCursor from '../components/effects/SplashCursor';
import styles from './dashboard.module.css';

// 방명록 월별 데이터
const guestbookData = [
  { x: 'Jan', y: 25 },
  { x: 'Feb', y: 32 },
  { x: 'Mar', y: 45 },
  { x: 'Apr', y: 38 },
  { x: 'May', y: 52 },
  { x: 'Jun', y: 48 },
];

const viewsData = [
  { x: 'Jan', y: 1200 },
  { x: 'Feb', y: 1800 },
  { x: 'Mar', y: 2200 },
  { x: 'Apr', y: 1900 },
  { x: 'May', y: 2800 },
  { x: 'Jun', y: 2400 },
];

export default function Dashboard() {
  const { 
    isDarkMode, 
    toggleTheme, 
    guestbookStats, 
    updateGuestbookStats,
    guestbookPosts,
    sidebarOpen,
    notifications,
    addNotification,
    uiSettings,
    updateUISettings
  } = useDashboardStore();

  // 실시간 데이터 업데이트 시뮬레이션
  const updateStatsData = useCallback(() => {
    updateGuestbookStats({
      totalPosts: guestbookStats.totalPosts + Math.floor(Math.random() * 3 - 1),
      publishedPosts: guestbookStats.publishedPosts + Math.floor(Math.random() * 2),
      unpublishedPosts: guestbookStats.unpublishedPosts + Math.floor(Math.random() * 2 - 1),
      totalViews: guestbookStats.totalViews + Math.floor(Math.random() * 50 - 25),
      totalComments: guestbookStats.totalComments + Math.floor(Math.random() * 10 - 5),
      monthlyGrowth: guestbookStats.monthlyGrowth + (Math.random() * 2 - 1)
    });
  }, [guestbookStats, updateGuestbookStats]);

  // 알림 추가 시뮬레이션
  const addRandomNotification = useCallback(() => {
    if (Math.random() > 0.7) {
      addNotification({
        message: '새로운 방명록이 작성되었습니다!',
        type: 'success'
      });
    }
  }, [addNotification]);

  useEffect(() => {
    const statsInterval = setInterval(updateStatsData, 5000);
    const notificationInterval = setInterval(addRandomNotification, 10000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(notificationInterval);
    };
  }, [updateStatsData, addRandomNotification]);

  return (
    <div className={styles.dashboard}>
      {/* 사이버펑크 배경 */}
      <CyberpunkBackground />
      
      {/* 플로팅 파티클 효과 */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <FloatingParticles 
          particleCount={60}
          colors={['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff8000', '#8000ff']}
          sizeRange={[2, 5]}
          speedRange={[15, 40]}
          opacityRange={[0.3, 0.7]}
          enableMouseInteraction={true}
        />
      </div>
      
      {/* Fluid Simulation Splash Cursor */}
      {uiSettings.splashCursor && (
        <SplashCursor 
          SIM_RESOLUTION={uiSettings.fluidSettings.SIM_RESOLUTION}
          DYE_RESOLUTION={uiSettings.fluidSettings.DYE_RESOLUTION}
          CAPTURE_RESOLUTION={uiSettings.fluidSettings.CAPTURE_RESOLUTION}
          DENSITY_DISSIPATION={uiSettings.fluidSettings.DENSITY_DISSIPATION}
          VELOCITY_DISSIPATION={uiSettings.fluidSettings.VELOCITY_DISSIPATION}
          PRESSURE={uiSettings.fluidSettings.PRESSURE}
          PRESSURE_ITERATIONS={uiSettings.fluidSettings.PRESSURE_ITERATIONS}
          CURL={uiSettings.fluidSettings.CURL}
          SPLAT_RADIUS={uiSettings.fluidSettings.SPLAT_RADIUS}
          SPLAT_FORCE={uiSettings.fluidSettings.SPLAT_FORCE}
          SHADING={uiSettings.fluidSettings.SHADING}
          COLOR_UPDATE_SPEED={uiSettings.fluidSettings.COLOR_UPDATE_SPEED}
          BACK_COLOR={uiSettings.fluidSettings.BACK_COLOR}
          TRANSPARENT={uiSettings.fluidSettings.TRANSPARENT}
        />
      )}
      
      {/* 사이드바 */}
      <Sidebar />
      
      {/* 메인 콘텐츠 */}
      <div className={`${styles.mainContent} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        {/* 헤더 */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.header}
          style={{
            backdropFilter: uiSettings.blurEffect ? 'blur(8px)' : 'none',
            boxShadow: uiSettings.glowEffect ? '0 0 20px rgba(147, 51, 234, 0.1)' : 'none',
            transition: `all ${uiSettings.animationSpeed / 100}s ease`,
          }}
        >
          <div className={styles.headerContent}>
            <div>
              <NeonText 
                text="Welcome! MGsFlow 방명록 관리"
                color="#00ffff"
                glowIntensity={2}
                animationSpeed={2}
                enableHover={true}
                enableTyping={false}
                className={styles.welcomeText}
              />
              <GlitchText 
                text="방명록을 관리해보세요!"
                glitchIntensity={0.1}
                glitchDuration={0.2}
                glitchInterval={5000}
                enableHover={true}
                className={styles.subtitle}
              />
            </div>
            
            <div className={styles.headerActions}>
              {/* 검색 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={styles.searchContainer}
                style={{
                  borderRadius: uiSettings.borderRadius === 'small' ? '4px' : 
                             uiSettings.borderRadius === 'large' ? '12px' : '8px',
                  transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                }}
              >
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={styles.searchInput}
                  style={{
                    fontSize: uiSettings.fontSize === 'small' ? '0.875rem' :
                             uiSettings.fontSize === 'large' ? '1.125rem' :
                             uiSettings.fontSize === 'xlarge' ? '1.25rem' : '1rem',
                  }}
                />
              </motion.div>
              
              {/* Fluid Simulation Splash Cursor 토글 */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => updateUISettings({ splashCursor: !uiSettings.splashCursor })}
                className={`${styles.actionButton} ${uiSettings.splashCursor ? styles.activeButton : styles.inactiveButton}`}
                style={{
                  borderRadius: uiSettings.borderRadius === 'small' ? '4px' : 
                             uiSettings.borderRadius === 'large' ? '12px' : '8px',
                  transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                  boxShadow: uiSettings.glowEffect ? '0 0 10px rgba(147, 51, 234, 0.2)' : 'none',
                }}
                title={uiSettings.splashCursor ? "Disable Fluid Cursor" : "Enable Fluid Cursor"}
              >
                <Mouse />
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {uiSettings.splashCursor ? 'ON' : 'OFF'}
                </span>
              </motion.button>
              
              {/* 알림 */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={styles.actionButton}
                style={{
                  borderRadius: uiSettings.borderRadius === 'small' ? '4px' : 
                             uiSettings.borderRadius === 'large' ? '12px' : '8px',
                  transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                  boxShadow: uiSettings.glowEffect ? '0 0 10px rgba(147, 51, 234, 0.2)' : 'none',
                }}
              >
                <Notifications />
                {notifications.length > 0 && (
                  <span className={styles.notificationBadge}>
                    {notifications.length}
                  </span>
                )}
              </motion.button>
              
              {/* 테마 토글 */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={styles.actionButton}
                style={{
                  borderRadius: uiSettings.borderRadius === 'small' ? '4px' : 
                             uiSettings.borderRadius === 'large' ? '12px' : '8px',
                  transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                  boxShadow: uiSettings.glowEffect ? '0 0 10px rgba(147, 51, 234, 0.2)' : 'none',
                }}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </motion.button>
              
              {/* 새로고침 */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={styles.actionButton}
                style={{
                  borderRadius: uiSettings.borderRadius === 'small' ? '4px' : 
                             uiSettings.borderRadius === 'large' ? '12px' : '8px',
                  transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                  boxShadow: uiSettings.glowEffect ? '0 0 10px rgba(147, 51, 234, 0.2)' : 'none',
                }}
              >
                <Refresh />
              </motion.button>
            </div>
          </div>
        </motion.header>
        
        {/* 대시보드 콘텐츠 */}
        <main className={styles.main}>
          {/* 통계 카드 그리드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.statsGrid}
            style={{
              gap: uiSettings.spacing === 'compact' ? '1rem' : 
                   uiSettings.spacing === 'spacious' ? '2rem' : '1.5rem',
              transition: `all ${uiSettings.animationSpeed / 100}s ease`,
            }}
          >
            <StatCard
              title="총 방명록"
              value={guestbookStats.totalPosts}
              change={guestbookStats.monthlyGrowth}
              icon={<People />}
              color="purple"
              delay={0.1}
            />
            <StatCard
              title="발행된 방명록"
              value={guestbookStats.publishedPosts}
              change={8.2}
              icon={<AttachMoney />}
              color="cyan"
              delay={0.2}
            />
            <StatCard
              title="미발행 방명록"
              value={guestbookStats.unpublishedPosts}
              change={-2.1}
              icon={<ShoppingCart />}
              color="green"
              delay={0.3}
            />
            <StatCard
              title="총 조회수"
              value={guestbookStats.totalViews}
              change={5.4}
              icon={<TrackChanges />}
              color="orange"
              delay={0.4}
            />
          </motion.div>
          
          {/* 차트 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={styles.chartsGrid}
            style={{
              gap: uiSettings.spacing === 'compact' ? '1rem' : 
                   uiSettings.spacing === 'spacious' ? '2rem' : '1.5rem',
              transition: `all ${uiSettings.animationSpeed / 100}s ease`,
            }}
          >
            <ChartCard
              title="월별 방명록 작성"
              data={guestbookData}
              color="purple"
              delay={0.6}
            />
            <ChartCard
              title="월별 조회수"
              data={viewsData}
              color="cyan"
              delay={0.7}
            />
          </motion.div>
          
          {/* 추가 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={styles.additionalSection}
            style={{
              gap: uiSettings.spacing === 'compact' ? '1rem' : 
                   uiSettings.spacing === 'spacious' ? '2rem' : '1.5rem',
              transition: `all ${uiSettings.animationSpeed / 100}s ease`,
            }}
          >
            {/* 최근 방명록 활동 */}
            <div className={styles.recentActivity}>
              <h3 className={styles.sectionTitle}>최근 방명록 활동</h3>
              <div className={styles.activityList}>
                {guestbookPosts.slice(0, 4).map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className={styles.activityItem}
                    style={{
                      borderRadius: uiSettings.borderRadius === 'small' ? '4px' : 
                                 uiSettings.borderRadius === 'large' ? '12px' : '8px',
                      transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                      boxShadow: uiSettings.glowEffect ? '0 0 10px rgba(147, 51, 234, 0.1)' : 'none',
                    }}
                  >
                    <div className={styles.userAvatar}>
                      <span className={styles.userInitial}>
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <div className={styles.activityContent}>
                      <div className={styles.userName}>{post.author}</div>
                      <div className={styles.userAction}>{post.title}</div>
                    </div>
                    <div className={styles.activityTime}>
                      {new Date(post.created_at).toLocaleDateString('ko-KR')}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* 빠른 액션 */}
            <div className={styles.quickActions}>
              <h3 className={styles.sectionTitle}>빠른 액션</h3>
              <div className={styles.actionList}>
                {[
                  { label: '새 방명록 작성', color: 'purple' },
                  { label: '방명록 관리', color: 'cyan' },
                  { label: '데이터 내보내기', color: 'green' },
                  { label: '시스템 설정', color: 'orange' },
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${styles.actionButton} ${styles[`action${action.color.charAt(0).toUpperCase() + action.color.slice(1)}`]}`}
                    style={{
                      borderRadius: uiSettings.borderRadius === 'small' ? '4px' : 
                                 uiSettings.borderRadius === 'large' ? '12px' : '8px',
                      transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                      boxShadow: uiSettings.glowEffect ? '0 0 10px rgba(147, 51, 234, 0.1)' : 'none',
                    }}
                  >
                    <span className={styles.actionLabel}>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
