'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
import { 
  Settings as SettingsIcon,
  Security,
  Notifications,
  Palette,
  Language,
  Storage,
  Backup,
  AccountCircle,
  Email,
  Phone,
  LocationOn,
  Save,
  Cancel,
  Edit,
  Visibility,
  VisibilityOff,
  Person,
  Business,
  School,
  Work,
  Home,
  Public,
  Lock,
  Block,
  Tune,
  Brush,
  Animation,
  BlurOn,
  Lightbulb,
  FormatSize,
  ViewCompact,
  SpaceBar
} from '@mui/icons-material';
import { 
  Switch,
  Slider,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Badge
} from '@mui/material';
import { useDashboardStore } from '../../store/dashboardStore';
import { CyberpunkBackground } from '../../components/backgrounds/CyberpunkBackground';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { SplitText } from '../../components/animations/SplitText';
import styles from './settings.module.css';

export default function Settings() {
  const { 
    sidebarOpen, 
    isDarkMode, 
    toggleTheme, 
    uiSettings, 
    updateUISettings 
  } = useDashboardStore();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
    updates: true,
    security: true
  });
  const [privacy, setPrivacy] = useState({
    profile: 'public',
    analytics: true,
    tracking: false,
    location: false,
    dataSharing: false
  });
  const [userProfile, setUserProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@cyberdash.com',
    phone: '+1 (555) 123-4567',
    company: 'CyberDash Inc.',
    position: 'System Administrator',
    location: 'San Francisco, CA',
    bio: 'Passionate about creating innovative digital experiences and managing complex systems with precision and creativity.'
  });

  // 탭 설정을 useMemo로 최적화
  const tabs = useMemo(() => [
    { id: 'profile', label: 'Profile', icon: <Person /> },
    { id: 'general', label: 'General', icon: <SettingsIcon /> },
    { id: 'security', label: 'Security', icon: <Security /> },
    { id: 'notifications', label: 'Notifications', icon: <Notifications /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette /> },
    { id: 'customization', label: 'UI Customization', icon: <Tune /> },
    { id: 'privacy', label: 'Privacy', icon: <AccountCircle /> },
  ], []);

  // 이벤트 핸들러들을 useCallback으로 최적화
  const handleThemeChange = useCallback((theme: string) => {
    updateUISettings({ theme: theme as any });
  }, [updateUISettings]);

  const handleAnimationSpeedChange = useCallback((speed: number) => {
    updateUISettings({ animationSpeed: speed });
  }, [updateUISettings]);

  const handleFontSizeChange = useCallback((size: string) => {
    updateUISettings({ fontSize: size as any });
  }, [updateUISettings]);

  const handleCompactModeChange = useCallback((enabled: boolean) => {
    updateUISettings({ compactMode: enabled });
  }, [updateUISettings]);

  const handleBlurEffectChange = useCallback((enabled: boolean) => {
    updateUISettings({ blurEffect: enabled });
  }, [updateUISettings]);

  const handleGlowEffectChange = useCallback((enabled: boolean) => {
    updateUISettings({ glowEffect: enabled });
  }, [updateUISettings]);

  const handleParticleEffectChange = useCallback((enabled: boolean) => {
    updateUISettings({ particleEffect: enabled });
  }, [updateUISettings]);

  const handleBorderRadiusChange = useCallback((radius: string) => {
    updateUISettings({ borderRadius: radius as any });
  }, [updateUISettings]);

  const handleSpacingChange = useCallback((spacing: string) => {
    updateUISettings({ spacing: spacing as any });
  }, [updateUISettings]);

  const handleSidebarWidthChange = useCallback((width: number) => {
    updateUISettings({ sidebarWidth: width });
  }, [updateUISettings]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handlePasswordToggle = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleConfirmPasswordToggle = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const handleNotificationChange = useCallback((key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  }, []);

  const handlePrivacyChange = useCallback((key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleProfileChange = useCallback((key: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className={styles.settings}>
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
                text="Settings"
                className={styles.title}
                variant="slideRight"
              />
              <p className={styles.subtitle}>Manage your account and preferences</p>
            </div>
          </div>
        </motion.header>
        
        {/* 메인 콘텐츠 */}
        <main className={styles.main}>
          <div className={styles.settingsContainer}>
            {/* 탭 네비게이션 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.tabsContainer}
            >
              <div className={styles.tabs}>
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleTabChange(tab.id);
                      }
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.scrollIndicator} />
            </motion.div>

            {/* 설정 콘텐츠 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={styles.content}
            >
              {activeTab === 'profile' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Profile Information</h3>
                  
                  {/* 프로필 헤더 */}
                  <div className={styles.profileHeader}>
                    <div className={styles.profileAvatar}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <IconButton
                            size="small"
                            className={styles.editAvatarButton}
                          >
                            <Edit />
                          </IconButton>
                        }
                      >
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                            fontSize: '2rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                        </Avatar>
                      </Badge>
                    </div>
                    <div className={styles.profileInfo}>
                      <h2 className={styles.profileName}>
                        {userProfile.firstName} {userProfile.lastName}
                      </h2>
                      <p className={styles.profileEmail}>{userProfile.email}</p>
                      <p className={styles.profilePosition}>{userProfile.position} at {userProfile.company}</p>
                    </div>
                  </div>

                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>First Name</h4>
                        <p>Your first name as it appears to others</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        className={styles.input}
                        placeholder="Enter first name"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Last Name</h4>
                        <p>Your last name as it appears to others</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        className={styles.input}
                        placeholder="Enter last name"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Email Address</h4>
                        <p>Your primary email address for notifications</p>
                      </div>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className={styles.input}
                        placeholder="Enter email address"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Phone Number</h4>
                        <p>Your contact number for important updates</p>
                      </div>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className={styles.input}
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Company</h4>
                        <p>Your current employer or organization</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.company}
                        onChange={(e) => handleProfileChange('company', e.target.value)}
                        className={styles.input}
                        placeholder="Enter company name"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Position</h4>
                        <p>Your job title or role</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.position}
                        onChange={(e) => handleProfileChange('position', e.target.value)}
                        className={styles.input}
                        placeholder="Enter job title"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Location</h4>
                        <p>Your current location or timezone</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.location}
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                        className={styles.input}
                        placeholder="Enter location"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Bio</h4>
                        <p>A short description about yourself</p>
                      </div>
                      <textarea
                        value={userProfile.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        className={styles.textarea}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'general' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>General Settings</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Dark Mode</h4>
                        <p>Toggle between light and dark themes</p>
                      </div>
                      <Switch
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Language</h4>
                        <p>Choose your preferred language</p>
                      </div>
                      <select className={styles.select}>
                        <option value="en">English</option>
                        <option value="ko">한국어</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">日本語</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Time Zone</h4>
                        <p>Set your local time zone</p>
                      </div>
                      <select className={styles.select}>
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time (ET)</option>
                        <option value="pst">Pacific Time (PT)</option>
                        <option value="gmt">Greenwich Mean Time (GMT)</option>
                        <option value="jst">Japan Standard Time (JST)</option>
                        <option value="kst">Korea Standard Time (KST)</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Date Format</h4>
                        <p>Choose your preferred date format</p>
                      </div>
                      <select className={styles.select}>
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Currency</h4>
                        <p>Set your preferred currency</p>
                      </div>
                      <select className={styles.select}>
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="jpy">JPY (¥)</option>
                        <option value="krw">KRW (₩)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Security Settings</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                      <div className={styles.securityStatus}>
                        <Chip 
                          label="Enabled" 
                          color="success" 
                          size="small"
                          sx={{ backgroundColor: '#22c55e', color: 'white' }}
                        />
                        <Switch
                          defaultChecked
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#22c55e',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#22c55e',
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Change Password</h4>
                        <p>Update your account password</p>
                      </div>
                      <div className={styles.passwordInput}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter new password"
                          className={styles.input}
                        />
                        <IconButton
                          onClick={handlePasswordToggle}
                          className={styles.passwordToggle}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Confirm Password</h4>
                        <p>Confirm your new password</p>
                      </div>
                      <div className={styles.passwordInput}>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm new password"
                          className={styles.input}
                        />
                        <IconButton
                          onClick={handleConfirmPasswordToggle}
                          className={styles.passwordToggle}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Session Timeout</h4>
                        <p>Automatically log out after inactivity</p>
                      </div>
                      <select className={styles.select}>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="never">Never</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Login History</h4>
                        <p>View recent login attempts</p>
                      </div>
                      <button className={styles.actionButton}>
                        View History
                      </button>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Active Sessions</h4>
                        <p>Manage your active sessions</p>
                      </div>
                      <button className={styles.actionButton}>
                        Manage Sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Notification Preferences</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Email Notifications</h4>
                        <p>Receive updates via email</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Push Notifications</h4>
                        <p>Receive push notifications on your device</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onChange={(e) => handleNotificationChange('push', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>SMS Notifications</h4>
                        <p>Receive updates via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Marketing Emails</h4>
                        <p>Receive promotional content and offers</p>
                      </div>
                      <Switch
                        checked={notifications.marketing}
                        onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>System Updates</h4>
                        <p>Receive notifications about system updates</p>
                      </div>
                      <Switch
                        checked={notifications.updates}
                        onChange={(e) => handleNotificationChange('updates', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Security Alerts</h4>
                        <p>Receive notifications about security events</p>
                      </div>
                      <Switch
                        checked={notifications.security}
                        onChange={(e) => handleNotificationChange('security', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Appearance Settings</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Theme</h4>
                        <p>Choose your preferred color scheme</p>
                      </div>
                      <div className={styles.themeOptions}>
                        <div 
                          className={`${styles.themeOption} ${uiSettings.theme === 'cyberpunk' ? styles.active : ''}`}
                          onClick={() => handleThemeChange('cyberpunk')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleThemeChange('cyberpunk');
                            }
                          }}
                        >
                          <div className={styles.themePreview} style={{background: 'linear-gradient(135deg, #a855f7, #22d3ee)'}} />
                          <span>Cyberpunk</span>
                        </div>
                        <div 
                          className={`${styles.themeOption} ${uiSettings.theme === 'nature' ? styles.active : ''}`}
                          onClick={() => handleThemeChange('nature')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleThemeChange('nature');
                            }
                          }}
                        >
                          <div className={styles.themePreview} style={{background: 'linear-gradient(135deg, #22c55e, #16a34a)'}} />
                          <span>Nature</span>
                        </div>
                        <div 
                          className={`${styles.themeOption} ${uiSettings.theme === 'sunset' ? styles.active : ''}`}
                          onClick={() => handleThemeChange('sunset')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleThemeChange('sunset');
                            }
                          }}
                        >
                          <div className={styles.themePreview} style={{background: 'linear-gradient(135deg, #f97316, #ea580c)'}} />
                          <span>Sunset</span>
                        </div>
                        <div 
                          className={`${styles.themeOption} ${uiSettings.theme === 'ocean' ? styles.active : ''}`}
                          onClick={() => handleThemeChange('ocean')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleThemeChange('ocean');
                            }
                          }}
                        >
                          <div className={styles.themePreview} style={{background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'}} />
                          <span>Ocean</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Animation Speed</h4>
                        <p>Adjust the speed of UI animations</p>
                      </div>
                      <div className={styles.sliderContainer}>
                        <Slider
                          value={uiSettings.animationSpeed}
                          onChange={(_, value) => handleAnimationSpeedChange(value as number)}
                          sx={{
                            color: '#a855f7',
                            '& .MuiSlider-thumb': {
                              backgroundColor: '#a855f7',
                            },
                          }}
                        />
                        <div className={styles.sliderLabels}>
                          <span>Slow</span>
                          <span>Fast</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Font Size</h4>
                        <p>Adjust the text size throughout the app</p>
                      </div>
                      <select 
                        className={styles.select}
                        value={uiSettings.fontSize}
                        onChange={(e) => handleFontSizeChange(e.target.value)}
                      >
                        <option value="small">Small (12px)</option>
                        <option value="medium">Medium (14px)</option>
                        <option value="large">Large (16px)</option>
                        <option value="xlarge">Extra Large (18px)</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Compact Mode</h4>
                        <p>Reduce spacing for more content on screen</p>
                      </div>
                      <Switch
                        checked={uiSettings.compactMode}
                        onChange={(e) => handleCompactModeChange(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'customization' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>UI Customization</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Blur Effects</h4>
                        <p>Enable backdrop blur effects for modern glass morphism</p>
                      </div>
                      <Switch
                        checked={uiSettings.blurEffect}
                        onChange={(e) => handleBlurEffectChange(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Glow Effects</h4>
                        <p>Enable glowing effects on interactive elements</p>
                      </div>
                      <Switch
                        checked={uiSettings.glowEffect}
                        onChange={(e) => handleGlowEffectChange(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Particle Effects</h4>
                        <p>Enable animated particle effects in the background</p>
                      </div>
                      <Switch
                        checked={uiSettings.particleEffect}
                        onChange={(e) => handleParticleEffectChange(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#a855f7',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a855f7',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Border Radius</h4>
                        <p>Choose the roundness of UI elements</p>
                      </div>
                      <select 
                        className={styles.select}
                        value={uiSettings.borderRadius}
                        onChange={(e) => handleBorderRadiusChange(e.target.value)}
                      >
                        <option value="small">Small (4px)</option>
                        <option value="medium">Medium (8px)</option>
                        <option value="large">Large (12px)</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Spacing</h4>
                        <p>Adjust the spacing between UI elements</p>
                      </div>
                      <select 
                        className={styles.select}
                        value={uiSettings.spacing}
                        onChange={(e) => handleSpacingChange(e.target.value)}
                      >
                        <option value="compact">Compact</option>
                        <option value="normal">Normal</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Sidebar Width</h4>
                        <p>Adjust the width of the sidebar</p>
                      </div>
                      <div className={styles.sliderContainer}>
                        <Slider
                          value={uiSettings.sidebarWidth}
                          onChange={(_, value) => handleSidebarWidthChange(value as number)}
                          min={200}
                          max={400}
                          sx={{
                            color: '#a855f7',
                            '& .MuiSlider-thumb': {
                              backgroundColor: '#a855f7',
                            },
                          }}
                        />
                        <div className={styles.sliderLabels}>
                          <span>Narrow</span>
                          <span>Wide</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Privacy Settings</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Profile Visibility</h4>
                        <p>Control who can see your profile information</p>
                      </div>
                      <div className={styles.visibilityOptions}>
                        <div className={`${styles.visibilityOption} ${styles.active}`} role="button" tabIndex={0}>
                          <Public />
                          <span>Public</span>
                        </div>
                        <div className={styles.visibilityOption} role="button" tabIndex={0}>
                          <Business />
                          <span>Friends Only</span>
                        </div>
                        <div className={styles.visibilityOption} role="button" tabIndex={0}>
                          <Lock />
                          <span>Private</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Analytics Tracking</h4>
                        <p>Allow us to collect usage analytics</p>
                      </div>
                      <Switch
                        checked={privacy.analytics}
                        onChange={(e) => handlePrivacyChange('analytics', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#22c55e',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#22c55e',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Location Services</h4>
                        <p>Allow access to your location for better services</p>
                      </div>
                      <Switch
                        checked={privacy.location}
                        onChange={(e) => handlePrivacyChange('location', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#22c55e',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#22c55e',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Data Sharing</h4>
                        <p>Allow sharing of anonymized data for research</p>
                      </div>
                      <Switch
                        checked={privacy.dataSharing}
                        onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#22c55e',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#22c55e',
                          },
                        }}
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Cookie Preferences</h4>
                        <p>Manage your cookie settings</p>
                      </div>
                      <button className={styles.actionButton}>
                        Manage Cookies
                      </button>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Data Export</h4>
                        <p>Download a copy of your data</p>
                      </div>
                      <button className={styles.actionButton}>
                        Export Data
                      </button>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Account Deletion</h4>
                        <p>Permanently delete your account and data</p>
                      </div>
                      <button className={styles.dangerButton}>
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* 저장 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.actions}
            >
              <button className={styles.saveButton}>
                <Save />
                <span>Save Changes</span>
              </button>
              <button className={styles.cancelButton}>
                <Cancel />
                <span>Cancel</span>
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
} 