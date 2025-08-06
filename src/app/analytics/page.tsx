'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart,
  PieChart,
  Timeline,
  Assessment,
  Visibility,
  Speed,
  Devices
} from '@mui/icons-material';
import { useDashboardStore } from '../../store/dashboardStore';
import { CyberpunkBackground } from '../../components/backgrounds/CyberpunkBackground';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { SplitText } from '../../components/animations/SplitText';
import styles from './analytics.module.css';

// 샘플 데이터
const analyticsData = {
  pageViews: 45678,
  uniqueVisitors: 23456,
  bounceRate: 32.5,
  avgSessionDuration: 245,
  conversionRate: 3.2,
  topPages: [
    { page: '/home', views: 12345, change: 12.5 },
    { page: '/products', views: 9876, change: 8.2 },
    { page: '/about', views: 6543, change: -2.1 },
    { page: '/contact', views: 4321, change: 15.7 },
  ],
  trafficSources: [
    { source: 'Organic Search', percentage: 45, color: '#a855f7' },
    { source: 'Direct', percentage: 25, color: '#22d3ee' },
    { source: 'Social Media', percentage: 20, color: '#22c55e' },
    { source: 'Referral', percentage: 10, color: '#f97316' },
  ],
  deviceData: [
    { device: 'Desktop', percentage: 65, color: '#a855f7' },
    { device: 'Mobile', percentage: 30, color: '#22d3ee' },
    { device: 'Tablet', percentage: 5, color: '#22c55e' },
  ]
};

export default function Analytics() {
  const { sidebarOpen } = useDashboardStore();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  return (
    <div className={styles.analytics}>
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
        >
          <div className={styles.headerContent}>
            <div>
              <SplitText
                text="Analytics Dashboard"
                className={styles.title}
                variant="slideRight"
              />
              <p className={styles.subtitle}>Comprehensive insights into your website performance</p>
            </div>
            
            <div className={styles.periodSelector}>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={styles.select}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>
        </motion.header>
        
        {/* 메인 콘텐츠 */}
        <main className={styles.main}>
          {/* 주요 지표 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.metricsGrid}
          >
            <div className={`${styles.metricCard} ${styles.purple}`}>
              <div className={styles.metricIcon}>
                <Visibility />
              </div>
              <div className={styles.metricContent}>
                <h3>Page Views</h3>
                <div className={styles.metricValue}>{analyticsData.pageViews.toLocaleString()}</div>
                <div className={styles.metricChange}>
                  <TrendingUp className={styles.trendIcon} />
                  <span>+12.5%</span>
                </div>
              </div>
            </div>

            <div className={`${styles.metricCard} ${styles.cyan}`}>
              <div className={styles.metricIcon}>
                <Assessment />
              </div>
              <div className={styles.metricContent}>
                <h3>Unique Visitors</h3>
                <div className={styles.metricValue}>{analyticsData.uniqueVisitors.toLocaleString()}</div>
                <div className={styles.metricChange}>
                  <TrendingUp className={styles.trendIcon} />
                  <span>+8.2%</span>
                </div>
              </div>
            </div>

            <div className={`${styles.metricCard} ${styles.green}`}>
              <div className={styles.metricIcon}>
                <Speed />
              </div>
              <div className={styles.metricContent}>
                <h3>Avg. Session</h3>
                <div className={styles.metricValue}>{analyticsData.avgSessionDuration}s</div>
                <div className={styles.metricChange}>
                  <TrendingUp className={styles.trendIcon} />
                  <span>+5.4%</span>
                </div>
              </div>
            </div>

            <div className={`${styles.metricCard} ${styles.orange}`}>
              <div className={styles.metricIcon}>
                <BarChart />
              </div>
              <div className={styles.metricContent}>
                <h3>Bounce Rate</h3>
                <div className={styles.metricValue}>{analyticsData.bounceRate}%</div>
                <div className={styles.metricChange}>
                  <TrendingDown className={styles.trendIcon} />
                  <span>-2.1%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 차트 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={styles.chartsSection}
          >
            {/* 트래픽 소스 */}
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Traffic Sources</h3>
              <div className={styles.pieChart}>
                {analyticsData.trafficSources.map((source, index) => (
                  <motion.div
                    key={source.source}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={styles.pieSlice}
                    style={{
                      background: `conic-gradient(${source.color} 0deg ${source.percentage * 3.6}deg, transparent ${source.percentage * 3.6}deg)`
                    }}
                  >
                    <div className={styles.pieCenter}>
                      <div className={styles.pieLabel}>{source.percentage}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className={styles.legend}>
                {analyticsData.trafficSources.map((source) => (
                  <div key={source.source} className={styles.legendItem}>
                    <div 
                      className={styles.legendColor} 
                      style={{ backgroundColor: source.color }}
                    />
                    <span>{source.source}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 디바이스 분포 */}
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Device Distribution</h3>
              <div className={styles.barChart}>
                {analyticsData.deviceData.map((device, index) => (
                  <motion.div
                    key={device.device}
                    initial={{ width: 0 }}
                    animate={{ width: `${device.percentage}%` }}
                    transition={{ delay: 0.8 + index * 0.2, duration: 1 }}
                    className={styles.bar}
                    style={{ backgroundColor: device.color }}
                  >
                    <span className={styles.barLabel}>{device.device}</span>
                    <span className={styles.barValue}>{device.percentage}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 상세 데이터 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={styles.detailsSection}
          >
            <div className={styles.topPages}>
              <h3 className={styles.sectionTitle}>Top Pages</h3>
              <div className={styles.pageList}>
                {analyticsData.topPages.map((page, index) => (
                  <motion.div
                    key={page.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={styles.pageItem}
                  >
                    <div className={styles.pageInfo}>
                      <div className={styles.pageName}>{page.page}</div>
                      <div className={styles.pageViews}>{page.views.toLocaleString()} views</div>
                    </div>
                    <div className={`${styles.pageChange} ${page.change >= 0 ? styles.positive : styles.negative}`}>
                      {page.change >= 0 ? '+' : ''}{page.change}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className={styles.realtimeStats}>
              <h3 className={styles.sectionTitle}>Real-time Activity</h3>
              <div className={styles.activityFeed}>
                {[
                  { user: 'User123', action: 'viewed /products', time: '2s ago' },
                  { user: 'User456', action: 'clicked CTA button', time: '5s ago' },
                  { user: 'User789', action: 'added to cart', time: '12s ago' },
                  { user: 'User101', action: 'completed purchase', time: '18s ago' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className={styles.activityItem}
                  >
                    <div className={styles.activityDot} />
                    <div className={styles.activityContent}>
                      <div className={styles.activityUser}>{activity.user}</div>
                      <div className={styles.activityAction}>{activity.action}</div>
                    </div>
                    <div className={styles.activityTime}>{activity.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
} 