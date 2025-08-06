'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
import { 
  Dashboard, 
  Analytics, 
  People, 
  ShoppingCart, 
  Settings as SettingsIcon, 
  Notifications,
  Menu,
  Close,
  AccountCircle,
  Email,
  Logout
} from '@mui/icons-material';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '../../store/dashboardStore';
import { SplitText } from '../animations/SplitText';
import styles from './Sidebar.module.css';

const menuItems = [
  { icon: <Dashboard />, label: 'Dashboard', path: '/' },
  { icon: <Analytics />, label: 'Analytics', path: '/analytics' },
  { icon: <People />, label: 'Users', path: '/users' },
  { icon: <ShoppingCart />, label: 'Orders', path: '/orders' },
  { icon: <SettingsIcon />, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar, uiSettings } = useDashboardStore();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const drawerWidth = uiSettings.sidebarWidth;

  const handleHoverStart = useCallback((index: number) => {
    setHoveredItem(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  // 메뉴 아이템을 useMemo로 최적화
  const menuItemsWithActive = useMemo(() => 
    menuItems.map((item, index) => ({
      ...item,
      isActive: pathname === item.path,
      index
    })), [pathname]
  );

  return (
    <>
      {/* 모바일 오버레이 */}
      {sidebarOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.overlay}
          onClick={handleSidebarToggle}
        />
      )}

      {/* 사이드바 */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? sidebarOpen : true}
        onClose={isMobile ? handleSidebarToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: uiSettings.blurEffect ? 'blur(20px)' : 'none',
            border: 'none',
            borderRight: '1px solid rgba(147, 51, 234, 0.2)',
            boxShadow: uiSettings.glowEffect ? '0 0 30px rgba(147, 51, 234, 0.1)' : 'none',
            display: { xs: 'block', lg: 'block' },
            position: { xs: 'fixed', lg: 'relative' },
            zIndex: { xs: 1200, lg: 1 },
            transition: 'all 0.3s ease',
            transform: { xs: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)', lg: 'translateX(0)' },
          },
        }}
      >
        {/* 헤더 */}
        <Box className={styles.header}>
          <Box className={styles.logoContainer}>
            <SplitText
              text="CYBER DASH"
              className={styles.logo}
              variant="slideRight"
            />
            {isMobile && (
              <IconButton
                onClick={handleSidebarToggle}
                className={styles.closeButton}
              >
                <Close />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* 네비게이션 */}
        <List className={styles.navigation}>
          {menuItemsWithActive.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.index * 0.1 }}
              onHoverStart={() => handleHoverStart(item.index)}
              onHoverEnd={handleHoverEnd}
            >
              <ListItem disablePadding className={styles.listItem}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  className={`${styles.listItemButton} ${item.isActive ? styles.active : ''}`}
                  onClick={isMobile ? handleSidebarToggle : undefined}
                  sx={{
                    margin: '4px 12px',
                    borderRadius: uiSettings.borderRadius === 'small' ? '8px' : 
                               uiSettings.borderRadius === 'large' ? '16px' : '12px',
                    '&:hover': {
                      background: 'rgba(147, 51, 234, 0.15)',
                      transform: 'translateX(8px)',
                      boxShadow: uiSettings.glowEffect ? '0 0 20px rgba(147, 51, 234, 0.2)' : 'none',
                    },
                    '&.active': {
                      background: 'rgba(147, 51, 234, 0.2)',
                      border: '1px solid rgba(147, 51, 234, 0.3)',
                      boxShadow: uiSettings.glowEffect ? '0 0 20px rgba(147, 51, 234, 0.2)' : 'none',
                    },
                    transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div
                    className={styles.listItemIcon}
                    style={{
                      color: item.isActive ? '#a855f7' : '#94a3b8',
                    }}
                  >
                    <motion.div
                      animate={{ rotate: hoveredItem === item.index ? 360 : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                  <ListItemText
                    primary={item.label}
                    className={styles.listItemText}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: item.isActive ? '#a855f7' : '#e2e8f0',
                        fontWeight: item.isActive ? 600 : 500,
                        fontSize: uiSettings.fontSize === 'small' ? '0.875rem' :
                                 uiSettings.fontSize === 'large' ? '1.125rem' :
                                 uiSettings.fontSize === 'xlarge' ? '1.25rem' : '0.95rem',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        {/* 하단 사용자 섹션 */}
        <Box className={styles.userSection}>
          <Divider sx={{ borderColor: 'rgba(147, 51, 234, 0.2)', margin: '16px 0' }} />
          
          <Box className={styles.userInfo}>
            <Avatar
              className={styles.userAvatar}
              sx={{
                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                width: 48,
                height: 48,
                marginRight: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                A
              </Typography>
            </Avatar>
            
            <Box className={styles.userDetails}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#f8fafc',
                  fontWeight: 600,
                  fontSize: uiSettings.fontSize === 'small' ? '0.875rem' :
                           uiSettings.fontSize === 'large' ? '1.125rem' :
                           uiSettings.fontSize === 'xlarge' ? '1.25rem' : '0.95rem',
                }}
              >
                Admin User
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#94a3b8',
                  fontSize: uiSettings.fontSize === 'small' ? '0.75rem' :
                           uiSettings.fontSize === 'large' ? '0.875rem' :
                           uiSettings.fontSize === 'xlarge' ? '1rem' : '0.8rem',
                }}
              >
                admin@cyberdash.com
              </Typography>
            </Box>
          </Box>

          <Box className={styles.userActions}>
            <Tooltip title="Profile" placement="top">
              <IconButton
                className={styles.userActionButton}
                sx={{
                  color: '#94a3b8',
                  '&:hover': {
                    color: '#a855f7',
                    background: 'rgba(147, 51, 234, 0.1)',
                    transform: uiSettings.glowEffect ? 'scale(1.1)' : 'scale(1.05)',
                    boxShadow: uiSettings.glowEffect ? '0 0 15px rgba(147, 51, 234, 0.3)' : 'none',
                  },
                  transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                }}
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Messages" placement="top">
              <IconButton
                className={styles.userActionButton}
                sx={{
                  color: '#94a3b8',
                  '&:hover': {
                    color: '#22d3ee',
                    background: 'rgba(34, 211, 238, 0.1)',
                    transform: uiSettings.glowEffect ? 'scale(1.1)' : 'scale(1.05)',
                    boxShadow: uiSettings.glowEffect ? '0 0 15px rgba(34, 211, 238, 0.3)' : 'none',
                  },
                  transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                }}
              >
                <Email />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Logout" placement="top">
              <IconButton
                className={styles.userActionButton}
                sx={{
                  color: '#94a3b8',
                  '&:hover': {
                    color: '#ef4444',
                    background: 'rgba(239, 68, 68, 0.1)',
                    transform: uiSettings.glowEffect ? 'scale(1.1)' : 'scale(1.05)',
                    boxShadow: uiSettings.glowEffect ? '0 0 15px rgba(239, 68, 68, 0.3)' : 'none',
                  },
                  transition: `all ${uiSettings.animationSpeed / 100}s ease`,
                }}
              >
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* 사이버펑크 라인 효과 */}
        <Box className={styles.cyberLine} />
      </Drawer>

      {/* 모바일 토글 버튼 */}
      {isMobile && (
        <IconButton
          onClick={handleSidebarToggle}
          className={styles.mobileToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            background: 'rgba(147, 51, 234, 0.2)',
            backdropFilter: uiSettings.blurEffect ? 'blur(8px)' : 'none',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            color: '#a855f7',
            '&:hover': {
              background: 'rgba(147, 51, 234, 0.3)',
              transform: 'scale(1.1)',
              boxShadow: uiSettings.glowEffect ? '0 0 20px rgba(147, 51, 234, 0.3)' : 'none',
            },
            transition: `all ${uiSettings.animationSpeed / 100}s ease`,
          }}
        >
          <Menu />
        </IconButton>
      )}
    </>
  );
}; 