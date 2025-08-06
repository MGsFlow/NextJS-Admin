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
  MoreVert
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

// 샘플 사용자 데이터
const usersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2 hours ago',
    avatar: 'JD',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    verified: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '1 day ago',
    avatar: 'JS',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    verified: true,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Moderator',
    status: 'inactive',
    lastLogin: '3 days ago',
    avatar: 'MJ',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    verified: false,
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '5 hours ago',
    avatar: 'SW',
    phone: '+1 (555) 456-7890',
    location: 'Miami, FL',
    verified: true,
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'User',
    status: 'suspended',
    lastLogin: '1 week ago',
    avatar: 'DB',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    verified: false,
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
      case 'Admin':
        return '#a855f7';
      case 'Moderator':
        return '#22d3ee';
      case 'User':
        return '#22c55e';
      default:
        return '#94a3b8';
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
                text="User Management"
                className={styles.title}
                variant="slideRight"
              />
              <p className={styles.subtitle}>Manage your users and their permissions</p>
            </div>
            
            <div className={styles.headerActions}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.addButton}
              >
                <Add />
                <span>Add User</span>
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
                placeholder="Search users..."
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
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
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
                <Verified />
              </div>
              <div className={styles.statContent}>
                <h3>Total Users</h3>
                <div className={styles.statValue}>{usersData.length}</div>
                <div className={styles.statChange}>+12 this month</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.cyan}`}>
              <div className={styles.statIcon}>
                <Visibility />
              </div>
              <div className={styles.statContent}>
                <h3>Active Users</h3>
                <div className={styles.statValue}>{usersData.filter(u => u.status === 'active').length}</div>
                <div className={styles.statChange}>85% of total</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.green}`}>
              <div className={styles.statIcon}>
                <Email />
              </div>
              <div className={styles.statContent}>
                <h3>Verified Users</h3>
                <div className={styles.statValue}>{usersData.filter(u => u.verified).length}</div>
                <div className={styles.statChange}>72% verified</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.orange}`}>
              <div className={styles.statIcon}>
                <Block />
              </div>
              <div className={styles.statContent}>
                <h3>Suspended</h3>
                <div className={styles.statValue}>{usersData.filter(u => u.status === 'suspended').length}</div>
                <div className={styles.statChange}>2% of total</div>
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
              <h3>Users ({filteredUsers.length})</h3>
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
                            <Tooltip title="Verified">
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
                      <Tooltip title="View Details">
                        <IconButton className={styles.actionButton}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Edit User">
                        <IconButton className={styles.actionButton}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="More Options">
                        <IconButton className={styles.actionButton}>
                          <MoreVert />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <div className={styles.userStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Role:</span>
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
                      <span className={styles.statLabel}>Status:</span>
                      <Chip
                        label={user.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(user.status),
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </div>
                    
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Last Login:</span>
                      <span className={styles.statValue}>{user.lastLogin}</span>
                    </div>
                  </div>
                  
                  <div className={styles.userContact}>
                    <div className={styles.contactItem}>
                      <Phone className={styles.contactIcon} />
                      <span>{user.phone}</span>
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