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
  Email,
  Phone,
  LocationOn,
  Verified,
  Block,
  MoreVert,
  Message,
  ThumbUp,
  Person
} from '@mui/icons-material';
import { 
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import { useDashboardStore } from '../../store/dashboardStore';
import { CyberpunkBackground } from '../../components/backgrounds/CyberpunkBackground';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { SplitText } from '../../components/animations/SplitText';
import styles from './users.module.css';

// 방명록 작성자 데이터
const usersData = [
  {
    id: 1,
    name: '김개발',
    email: 'kim.dev@example.com',
    role: '관리자',
    status: 'active',
    lastLogin: '2시간 전',
    avatar: '김',
    phone: '+82 10-1234-5678',
    location: '서울, 대한민국',
    verified: true,
    postsCount: 15,
    totalLikes: 245,
  },
  {
    id: 2,
    name: '이프론트',
    email: 'lee.front@example.com',
    role: '사용자',
    status: 'active',
    lastLogin: '1일 전',
    avatar: '이',
    phone: '+82 10-2345-6789',
    location: '부산, 대한민국',
    verified: true,
    postsCount: 8,
    totalLikes: 156,
  },
  {
    id: 3,
    name: '박타입',
    email: 'park.type@example.com',
    role: '중재자',
    status: 'inactive',
    lastLogin: '3일 전',
    avatar: '박',
    phone: '+82 10-3456-7890',
    location: '대구, 대한민국',
    verified: false,
    postsCount: 12,
    totalLikes: 189,
  },
  {
    id: 4,
    name: '최성능',
    email: 'choi.perf@example.com',
    role: '사용자',
    status: 'active',
    lastLogin: '5시간 전',
    avatar: '최',
    phone: '+82 10-4567-8901',
    location: '인천, 대한민국',
    verified: true,
    postsCount: 6,
    totalLikes: 98,
  },
  {
    id: 5,
    name: '정커리어',
    email: 'jung.career@example.com',
    role: '사용자',
    status: 'suspended',
    lastLogin: '1주일 전',
    avatar: '정',
    phone: '+82 10-5678-9012',
    location: '광주, 대한민국',
    verified: false,
    postsCount: 3,
    totalLikes: 45,
  },
];

export default function Users() {
  const { sidebarOpen } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'inactive':
        return '#f97316';
      case 'suspended':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case '관리자':
        return '#a855f7';
      case '중재자':
        return '#22d3ee';
      case '사용자':
        return '#22c55e';
      default:
        return '#94a3b8';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'inactive':
        return '비활성';
      case 'suspended':
        return '정지됨';
      default:
        return status;
    }
  };

  return (
    <div className={styles.users}>
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
                text="방명록 관리"
                className={styles.title}
                variant="slideRight"
              />
              <p className={styles.subtitle}>방명록 작성자와 권한을 관리하세요</p>
            </div>
            
            <div className={styles.headerActions}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.addButton}
              >
                <Add />
                <span>사용자 추가</span>
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
                placeholder="사용자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterContainer}>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">모든 역할</option>
                <option value="관리자">관리자</option>
                <option value="중재자">중재자</option>
                <option value="사용자">사용자</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">모든 상태</option>
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
                <option value="suspended">정지됨</option>
              </select>
            </div>
          </motion.div>

          {/* 사용자 통계 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.statsGrid}
          >
            <div className={`${styles.statCard} ${styles.purple}`}>
              <div className={styles.statIcon}>
                <Person />
              </div>
              <div className={styles.statContent}>
                <h3>총 사용자</h3>
                <div className={styles.statValue}>{usersData.length}</div>
                <div className={styles.statChange}>이번 달 +12명</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.cyan}`}>
              <div className={styles.statIcon}>
                <Visibility />
              </div>
              <div className={styles.statContent}>
                <h3>활성 사용자</h3>
                <div className={styles.statValue}>{usersData.filter(u => u.status === 'active').length}</div>
                <div className={styles.statChange}>전체의 85%</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.green}`}>
              <div className={styles.statIcon}>
                <Message />
              </div>
              <div className={styles.statContent}>
                <h3>총 방명록</h3>
                <div className={styles.statValue}>{usersData.reduce((sum, u) => sum + u.postsCount, 0)}</div>
                <div className={styles.statChange}>평균 8.8개</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.orange}`}>
              <div className={styles.statIcon}>
                <ThumbUp />
              </div>
              <div className={styles.statContent}>
                <h3>총 좋아요</h3>
                <div className={styles.statValue}>{usersData.reduce((sum, u) => sum + u.totalLikes, 0)}</div>
                <div className={styles.statChange}>평균 146개</div>
              </div>
            </div>
          </motion.div>

          {/* 사용자 목록 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={styles.usersList}
          >
            <div className={styles.listHeader}>
              <h3>사용자 목록 ({filteredUsers.length})</h3>
            </div>
            
            <div className={styles.usersGrid}>
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={styles.userCard}
                >
                  <div className={styles.userHeader}>
                    <div className={styles.userInfo}>
                      <Avatar
                        className={styles.userAvatar}
                        sx={{
                          background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                          width: 48,
                          height: 48,
                        }}
                      >
                        {user.avatar}
                      </Avatar>
                      
                      <div className={styles.userDetails}>
                        <div className={styles.userName}>
                          {user.name}
                          {user.verified && (
                            <Tooltip title="인증됨">
                              <Verified className={styles.verifiedIcon} />
                            </Tooltip>
                          )}
                        </div>
                        <div className={styles.userEmail}>{user.email}</div>
                        <div className={styles.userLocation}>
                          <LocationOn className={styles.locationIcon} />
                          {user.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.userActions}>
                      <Tooltip title="상세 보기">
                        <IconButton className={styles.actionButton}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="사용자 편집">
                        <IconButton className={styles.actionButton}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="더보기">
                        <IconButton className={styles.actionButton}>
                          <MoreVert />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <div className={styles.userStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>역할:</span>
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          backgroundColor: getRoleColor(user.role),
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </div>
                    
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>상태:</span>
                      <Chip
                        label={getStatusText(user.status)}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(user.status),
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </div>
                    
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>마지막 로그인:</span>
                      <span className={styles.statValue}>{user.lastLogin}</span>
                    </div>
                  </div>
                  
                  <div className={styles.userContact}>
                    <div className={styles.contactItem}>
                      <Phone className={styles.contactIcon} />
                      <span>{user.phone}</span>
                    </div>
                    <div className={styles.contactItem}>
                      <Message className={styles.contactIcon} />
                      <span>방명록 {user.postsCount}개</span>
                    </div>
                    <div className={styles.contactItem}>
                      <ThumbUp className={styles.contactIcon} />
                      <span>좋아요 {user.totalLikes}개</span>
                    </div>
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