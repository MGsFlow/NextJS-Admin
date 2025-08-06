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
  TrackChanges
} from '@mui/icons-material';
import { useDashboardStore } from '../store/dashboardStore';
import { CyberpunkBackground } from '../components/backgrounds/CyberpunkBackground';
import { Sidebar } from '../components/dashboard/Sidebar';
import { StatCard } from '../components/dashboard/StatCard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { SplitText } from '../components/animations/SplitText';
import styles from './dashboard.module.css';

// 샘플 차트 데이터
const chartData = [
  { x: 'Jan', y: 65 },
  { x: 'Feb', y: 78 },
  { x: 'Mar', y: 90 },
  { x: 'Apr', y: 81 },
  { x: 'May', y: 95 },
  { x: 'Jun', y: 88 },
];

const revenueData = [
  { x: 'Jan', y: 12000 },
  { x: 'Feb', y: 15000 },
  { x: 'Mar', y: 18000 },
  { x: 'Apr', y: 16000 },
  { x: 'May', y: 22000 },
  { x: 'Jun', y: 19000 },
];

export default function Dashboard() {
  const { 
    isDarkMode, 
    toggleTheme, 
    stats, 
    updateStats,
    sidebarOpen,
    notifications,
    addNotification,
    uiSettings
  } = useDashboardStore();

  // 실시간 데이터 업데이트 시뮬레이션
  const updateStatsData = useCallback(() => {
    updateStats({
      visitors: stats.visitors + Math.floor(Math.random() * 10 - 5),
      revenue: stats.revenue + Math.floor(Math.random() * 100 - 50),
      orders: stats.orders + Math.floor(Math.random() * 5 - 2),
      conversion: stats.conversion + (Math.random() * 0.2 - 0.1)
    });
  }, [stats, updateStats]);

  // 알림 추가 시뮬레이션
  const addRandomNotification = useCallback(() => {
    if (Math.random() > 0.7) {
      addNotification({
        message: '새로운 주문이 들어왔습니다!',
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
              <SplitText
                text="Welcome back, Admin"
                className={styles.welcomeText}
                variant="slideRight"
              />
              <p className={styles.subtitle}>Here's what's happening with your projects today.</p>
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
              title="Total Visitors"
              value={stats.visitors}
              change={12.5}
              icon={<People />}
              color="purple"
              delay={0.1}
            />
            <StatCard
              title="Revenue"
              value={stats.revenue}
              change={8.2}
              icon={<AttachMoney />}
              color="cyan"
              delay={0.2}
            />
            <StatCard
              title="Orders"
              value={stats.orders}
              change={-2.1}
              icon={<ShoppingCart />}
              color="green"
              delay={0.3}
            />
            <StatCard
              title="Conversion Rate"
              value={`${stats.conversion.toFixed(1)}%`}
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
              title="User Engagement"
              data={chartData}
              color="purple"
              delay={0.6}
            />
            <ChartCard
              title="Revenue Trend"
              data={revenueData}
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
            {/* 최근 활동 */}
            <div className={styles.recentActivity}>
              <h3 className={styles.sectionTitle}>Recent Activity</h3>
              <div className={styles.activityList}>
                {[
                  { user: 'John Doe', action: 'placed an order', time: '2 minutes ago' },
                  { user: 'Jane Smith', action: 'completed payment', time: '5 minutes ago' },
                  { user: 'Mike Johnson', action: 'left a review', time: '10 minutes ago' },
                  { user: 'Sarah Wilson', action: 'subscribed to newsletter', time: '15 minutes ago' },
                ].map((activity, index) => (
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
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div className={styles.activityContent}>
                      <div className={styles.userName}>{activity.user}</div>
                      <div className={styles.userAction}>{activity.action}</div>
                    </div>
                    <div className={styles.activityTime}>{activity.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* 빠른 액션 */}
            <div className={styles.quickActions}>
              <h3 className={styles.sectionTitle}>Quick Actions</h3>
              <div className={styles.actionList}>
                {[
                  { label: 'Add New User', color: 'purple' },
                  { label: 'Generate Report', color: 'cyan' },
                  { label: 'Export Data', color: 'green' },
                  { label: 'System Settings', color: 'orange' },
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
