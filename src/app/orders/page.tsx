'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Search,
  FilterList,
  Add,
  Edit,
  Delete,
  Visibility,
  Message,
  Publish,
  CheckCircle,
  Cancel,
  Pending,
  TrendingUp,
  ThumbUp,
  Person,
  Schedule
} from '@mui/icons-material';
import { 
  Chip,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import { useDashboardStore } from '../../store/dashboardStore';
import { CyberpunkBackground } from '../../components/backgrounds/CyberpunkBackground';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { SplitText } from '../../components/animations/SplitText';
import styles from './orders.module.css';

// 방명록 발행 데이터
const guestbookData = [
  {
    id: '#GB-001',
    author: '김개발',
    email: 'kim.dev@example.com',
    title: '안녕하세요! 멋진 포트폴리오네요',
    content: '정말 인상적인 포트폴리오입니다. React와 TypeScript를 활용한 프로젝트들이 특히 흥미롭네요.',
    status: 'published',
    date: '2024-01-15',
    views: 245,
    likes: 12,
    tags: ['인사', '포트폴리오']
  },
  {
    id: '#GB-002',
    author: '이프론트',
    email: 'lee.front@example.com',
    title: 'React 프로젝트에 대해 궁금해요',
    content: 'React 프로젝트에서 상태 관리는 어떻게 하시나요? Zustand를 사용하신다고 하던데...',
    status: 'published',
    date: '2024-01-14',
    views: 189,
    likes: 8,
    tags: ['React', '질문']
  },
  {
    id: '#GB-003',
    author: '박타입',
    email: 'park.type@example.com',
    title: 'TypeScript 사용 경험 공유',
    content: 'TypeScript를 사용하면서 타입 안정성 덕분에 버그가 많이 줄어들었어요. 추천합니다!',
    status: 'published',
    date: '2024-01-13',
    views: 156,
    likes: 15,
    tags: ['TypeScript', '경험']
  },
  {
    id: '#GB-004',
    author: '최성능',
    email: 'choi.perf@example.com',
    title: 'Next.js 성능 최적화 팁',
    content: 'Next.js에서 성능을 최적화하는 몇 가지 방법을 공유하고 싶습니다...',
    status: 'unpublished',
    date: '2024-01-12',
    views: 0,
    likes: 0,
    tags: ['Next.js', '최적화']
  },
  {
    id: '#GB-005',
    author: '정커리어',
    email: 'jung.career@example.com',
    title: '프론트엔드 개발자 커리어 조언',
    content: '프론트엔드 개발자로서 경력을 쌓는 방법에 대해 조언을 드리고 싶습니다...',
    status: 'draft',
    date: '2024-01-11',
    views: 0,
    likes: 0,
    tags: ['커리어', '조언']
  },
];

export default function Orders() {
  const { sidebarOpen } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const filteredGuestbooks = guestbookData.filter(guestbook => {
    const matchesSearch = guestbook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guestbook.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || guestbook.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return '#22c55e';
      case 'unpublished':
        return '#22d3ee';
      case 'draft':
        return '#f97316';
      case 'pending':
        return '#a855f7';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <Publish />;
      case 'unpublished':
        return <Edit />;
      case 'draft':
        return <Schedule />;
      case 'pending':
        return <Pending />;
      case 'cancelled':
        return <Cancel />;
      default:
        return <Pending />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return '발행됨';
      case 'unpublished':
        return '미발행';
      case 'draft':
        return '임시저장';
      case 'pending':
        return '검토중';
      case 'cancelled':
        return '취소됨';
      default:
        return status;
    }
  };

  const totalGuestbooks = guestbookData.length;
  const publishedGuestbooks = guestbookData.filter(guestbook => guestbook.status === 'published').length;
  const unpublishedGuestbooks = guestbookData.filter(guestbook => guestbook.status === 'unpublished').length;
  const draftGuestbooks = guestbookData.filter(guestbook => guestbook.status === 'draft').length;

  return (
    <div className={styles.orders}>
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
                text="방명록 발행 관리"
                className={styles.title}
                variant="slideRight"
              />
              <p className={styles.subtitle}>방명록의 발행 상태를 관리하세요</p>
            </div>
            
            <div className={styles.headerActions}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.exportButton}
              >
                <TrendingUp />
                <span>데이터 내보내기</span>
              </motion.button>
            </div>
          </div>
        </motion.header>
        
        {/* 메인 콘텐츠 */}
        <main className={styles.main}>
          {/* 필터 및 검색 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.filters}
          >
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="방명록 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterContainer}>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">모든 상태</option>
                <option value="published">발행됨</option>
                <option value="unpublished">미발행</option>
                <option value="draft">임시저장</option>
                <option value="pending">검토중</option>
                <option value="cancelled">취소됨</option>
              </select>
              
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">모든 날짜</option>
                <option value="today">오늘</option>
                <option value="week">이번 주</option>
                <option value="month">이번 달</option>
              </select>
            </div>
          </motion.div>

          {/* 방명록 통계 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.statsGrid}
          >
            <div className={`${styles.statCard} ${styles.purple}`}>
              <div className={styles.statIcon}>
                <Message />
              </div>
              <div className={styles.statContent}>
                <h3>총 방명록</h3>
                <div className={styles.statValue}>{totalGuestbooks}</div>
                <div className={styles.statChange}>이번 달 +15개</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.cyan}`}>
              <div className={styles.statIcon}>
                <Publish />
              </div>
              <div className={styles.statContent}>
                <h3>발행된 방명록</h3>
                <div className={styles.statValue}>{publishedGuestbooks}</div>
                <div className={styles.statChange}>발행률 {Math.round((publishedGuestbooks / totalGuestbooks) * 100)}%</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.green}`}>
              <div className={styles.statIcon}>
                <ThumbUp />
              </div>
              <div className={styles.statContent}>
                <h3>총 좋아요</h3>
                <div className={styles.statValue}>{guestbookData.reduce((sum, gb) => sum + gb.likes, 0)}</div>
                <div className={styles.statChange}>평균 {Math.round(guestbookData.reduce((sum, gb) => sum + gb.likes, 0) / totalGuestbooks)}개</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.orange}`}>
              <div className={styles.statIcon}>
                <Edit />
              </div>
              <div className={styles.statContent}>
                <h3>미발행/임시저장</h3>
                <div className={styles.statValue}>{unpublishedGuestbooks + draftGuestbooks}</div>
                <div className={styles.statChange}>검토 필요</div>
              </div>
            </div>
          </motion.div>

          {/* 방명록 목록 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={styles.ordersList}
          >
            <div className={styles.listHeader}>
              <h3>방명록 목록 ({filteredGuestbooks.length})</h3>
            </div>
            
            <div className={styles.ordersGrid}>
              {filteredGuestbooks.map((guestbook, index) => (
                <motion.div
                  key={guestbook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={styles.orderCard}
                >
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <div className={styles.orderId}>{guestbook.id}</div>
                      <div className={styles.orderDate}>{guestbook.date}</div>
                    </div>
                    
                    <div className={styles.orderActions}>
                      <Tooltip title="상세 보기">
                        <IconButton className={styles.actionButton}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="방명록 편집">
                        <IconButton className={styles.actionButton}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="더보기">
                        <IconButton className={styles.actionButton}>
                          <FilterList />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <div className={styles.customerInfo}>
                    <div className={styles.customerName}>{guestbook.author}</div>
                    <div className={styles.customerEmail}>{guestbook.email}</div>
                  </div>
                  
                  <div className={styles.productsList}>
                    <div className={styles.productsLabel}>제목:</div>
                    <div className={styles.products}>
                      <span className={styles.product}>
                        {guestbook.title}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.orderDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>조회수:</span>
                      <span className={styles.detailValue}>{guestbook.views}</span>
                    </div>
                    
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>좋아요:</span>
                      <span className={styles.detailValue}>{guestbook.likes}</span>
                    </div>
                    
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>태그:</span>
                      <span className={styles.detailValue}>{guestbook.tags.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className={styles.orderStatus}>
                    <Chip
                      icon={getStatusIcon(guestbook.status)}
                      label={getStatusText(guestbook.status)}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(guestbook.status),
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
} 