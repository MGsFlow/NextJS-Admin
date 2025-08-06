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
  Devices,
  Message,
  ThumbUp,
  Person
} from '@mui/icons-material';
import { useDashboardStore } from '../../store/dashboardStore';
import { CyberpunkBackground } from '../../components/backgrounds/CyberpunkBackground';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { SplitText } from '../../components/animations/SplitText';
import styles from './analytics.module.css';

// 방명록 분석 데이터
const analyticsData = {
  totalPosts: 156,
  totalViews: 28450,
  totalComments: 892,
  avgLikes: 15.2,
  topPosts: [
    { title: '안녕하세요! 멋진 포트폴리오네요', views: 245, likes: 12, change: 12.5 },
    { title: 'React 프로젝트에 대해 궁금해요', views: 189, likes: 8, change: 8.2 },
    { title: 'TypeScript 사용 경험 공유', views: 156, likes: 15, change: -2.1 },
    { title: '프론트엔드 개발자 커리어 조언', views: 312, likes: 25, change: 15.7 },
  ],
  postCategories: [
    { category: '인사/소개', percentage: 35, color: '#a855f7' },
    { category: '기술 질문', percentage: 25, color: '#22d3ee' },
    { category: '경험 공유', percentage: 20, color: '#22c55e' },
    { category: '커리어 조언', percentage: 20, color: '#f97316' },
  ],
  engagementData: [
    { metric: '높은 참여', percentage: 45, color: '#a855f7' },
    { metric: '보통 참여', percentage: 35, color: '#22d3ee' },
    { metric: '낮은 참여', percentage: 20, color: '#22c55e' },
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
                text="방명록 분석 대시보드"
                className={styles.title}
                variant="slideRight"
              />
              <p className={styles.subtitle}>방명록 성과에 대한 종합적인 인사이트</p>
            </div>
            
            <div className={styles.periodSelector}>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={styles.select}
              >
                <option value="7d">최근 7일</option>
                <option value="30d">최근 30일</option>
                <option value="90d">최근 90일</option>
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
                <Message />
              </div>
              <div className={styles.metricContent}>
                <h3>총 방명록</h3>
                <div className={styles.metricValue}>{analyticsData.totalPosts.toLocaleString()}</div>
                <div className={styles.metricChange}>
                  <TrendingUp className={styles.trendIcon} />
                  <span>+12.5%</span>
                </div>
              </div>
            </div>

            <div className={`${styles.metricCard} ${styles.cyan}`}>
              <div className={styles.metricIcon}>
                <Visibility />
              </div>
              <div className={styles.metricContent}>
                <h3>총 조회수</h3>
                <div className={styles.metricValue}>{analyticsData.totalViews.toLocaleString()}</div>
                <div className={styles.metricChange}>
                  <TrendingUp className={styles.trendIcon} />
                  <span>+8.2%</span>
                </div>
              </div>
            </div>

            <div className={`${styles.metricCard} ${styles.green}`}>
              <div className={styles.metricIcon}>
                <ThumbUp />
              </div>
              <div className={styles.metricContent}>
                <h3>평균 좋아요</h3>
                <div className={styles.metricValue}>{analyticsData.avgLikes}</div>
                <div className={styles.metricChange}>
                  <TrendingUp className={styles.trendIcon} />
                  <span>+5.4%</span>
                </div>
              </div>
            </div>

            <div className={`${styles.metricCard} ${styles.orange}`}>
              <div className={styles.metricIcon}>
                <Person />
              </div>
              <div className={styles.metricContent}>
                <h3>총 댓글</h3>
                <div className={styles.metricValue}>{analyticsData.totalComments}</div>
                <div className={styles.metricChange}>
                  <TrendingUp className={styles.trendIcon} />
                  <span>+15.2%</span>
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
            {/* 방명록 카테고리 */}
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>방명록 카테고리</h3>
              <div className={styles.pieChart}>
                {analyticsData.postCategories.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={styles.pieSlice}
                    style={{
                      background: `conic-gradient(${category.color} 0deg ${category.percentage * 3.6}deg, transparent ${category.percentage * 3.6}deg)`
                    }}
                  >
                    <div className={styles.pieCenter}>
                      <div className={styles.pieLabel}>{category.percentage}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className={styles.legend}>
                {analyticsData.postCategories.map((category) => (
                  <div key={category.category} className={styles.legendItem}>
                    <div 
                      className={styles.legendColor} 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 참여도 분포 */}
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>참여도 분포</h3>
              <div className={styles.barChart}>
                {analyticsData.engagementData.map((engagement, index) => (
                  <motion.div
                    key={engagement.metric}
                    initial={{ width: 0 }}
                    animate={{ width: `${engagement.percentage}%` }}
                    transition={{ delay: 0.8 + index * 0.2, duration: 1 }}
                    className={styles.bar}
                    style={{ backgroundColor: engagement.color }}
                  >
                    <span className={styles.barLabel}>{engagement.metric}</span>
                    <span className={styles.barValue}>{engagement.percentage}%</span>
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
              <h3 className={styles.sectionTitle}>인기 방명록</h3>
              <div className={styles.pageList}>
                {analyticsData.topPosts.map((post, index) => (
                  <motion.div
                    key={post.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={styles.pageItem}
                  >
                    <div className={styles.pageInfo}>
                      <div className={styles.pageName}>{post.title}</div>
                      <div className={styles.pageViews}>{post.views.toLocaleString()} 조회수, {post.likes} 좋아요</div>
                    </div>
                    <div className={`${styles.pageChange} ${post.change >= 0 ? styles.positive : styles.negative}`}>
                      {post.change >= 0 ? '+' : ''}{post.change}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className={styles.realtimeStats}>
              <h3 className={styles.sectionTitle}>실시간 활동</h3>
              <div className={styles.activityFeed}>
                {[
                  { user: '김개발', action: '새 방명록 작성', time: '2분 전' },
                  { user: '이프론트', action: '방명록에 좋아요', time: '5분 전' },
                  { user: '박타입', action: '댓글 작성', time: '12분 전' },
                  { user: '최성능', action: '방명록 조회', time: '18분 전' },
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