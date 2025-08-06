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
    firstName: 'MGsFlow',
    lastName: '관리자',
    email: 'admin@mgsflow.com',
    phone: '+82 10-1234-5678',
    company: 'MGsFlow',
    position: '시스템 관리자',
    location: '서울, 대한민국',
    bio: '혁신적인 디지털 경험을 만들고 복잡한 시스템을 정밀하고 창의적으로 관리하는 것에 열정을 가지고 있습니다.'
  });

  // 탭 설정을 useMemo로 최적화
  const tabs = useMemo(() => [
    { id: 'profile', label: '프로필', icon: <Person /> },
    { id: 'general', label: '일반', icon: <SettingsIcon /> },
    { id: 'security', label: '보안', icon: <Security /> },
    { id: 'notifications', label: '알림', icon: <Notifications /> },
    { id: 'appearance', label: '외관', icon: <Palette /> },
    { id: 'customization', label: 'UI 커스터마이징', icon: <Tune /> },
    { id: 'privacy', label: '개인정보', icon: <AccountCircle /> },
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
                text="설정"
                className={styles.title}
                variant="slideRight"
              />
              <p className={styles.subtitle}>계정과 환경설정을 관리하세요</p>
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
                  <h3 className={styles.sectionTitle}>프로필 정보</h3>
                  
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
                        <h4>이름</h4>
                        <p>다른 사람에게 표시되는 이름</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        className={styles.input}
                        placeholder="이름을 입력하세요"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>성</h4>
                        <p>다른 사람에게 표시되는 성</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        className={styles.input}
                        placeholder="성을 입력하세요"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>이메일 주소</h4>
                        <p>알림을 받을 기본 이메일 주소</p>
                      </div>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className={styles.input}
                        placeholder="이메일 주소를 입력하세요"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>전화번호</h4>
                        <p>중요한 업데이트를 위한 연락처</p>
                      </div>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className={styles.input}
                        placeholder="전화번호를 입력하세요"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>회사</h4>
                        <p>현재 직장이나 조직</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.company}
                        onChange={(e) => handleProfileChange('company', e.target.value)}
                        className={styles.input}
                        placeholder="회사명을 입력하세요"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>직책</h4>
                        <p>직무 제목이나 역할</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.position}
                        onChange={(e) => handleProfileChange('position', e.target.value)}
                        className={styles.input}
                        placeholder="직책을 입력하세요"
                      />
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>위치</h4>
                        <p>현재 위치나 시간대</p>
                      </div>
                      <input
                        type="text"
                        value={userProfile.location}
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                        className={styles.input}
                        placeholder="위치를 입력하세요"
                      />
                    </div>

                    {/* <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>자기소개</h4>
                        <p>자신에 대한 간단한 설명</p>
                      </div>
                      <textarea
                        value={userProfile.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        className={styles.textarea}
                        placeholder="자신에 대해 알려주세요..."
                        rows={4}
                      />
                    </div> */}
                  </div>
                </div>
              )}

              {activeTab === 'general' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>일반 설정</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>다크 모드</h4>
                        <p>밝은 테마와 어두운 테마를 전환합니다</p>
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
                        <h4>언어</h4>
                        <p>선호하는 언어를 선택하세요</p>
                      </div>
                      <select className={styles.select}>
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">日本語</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>시간대</h4>
                        <p>로컬 시간대를 설정하세요</p>
                      </div>
                      <select className={styles.select}>
                        <option value="kst">한국 표준시 (KST)</option>
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time (ET)</option>
                        <option value="pst">Pacific Time (PT)</option>
                        <option value="gmt">Greenwich Mean Time (GMT)</option>
                        <option value="jst">Japan Standard Time (JST)</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>날짜 형식</h4>
                        <p>선호하는 날짜 형식을 선택하세요</p>
                      </div>
                      <select className={styles.select}>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>통화</h4>
                        <p>선호하는 통화를 설정하세요</p>
                      </div>
                      <select className={styles.select}>
                        <option value="krw">KRW (₩)</option>
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="jpy">JPY (¥)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>보안 설정</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>2단계 인증</h4>
                        <p>계정에 추가 보안 계층을 추가합니다</p>
                      </div>
                      <div className={styles.securityStatus}>
                        <Chip 
                          label="활성화됨" 
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
                        <h4>비밀번호 변경</h4>
                        <p>계정 비밀번호를 업데이트합니다</p>
                      </div>
                      <div className={styles.passwordInput}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="새 비밀번호를 입력하세요"
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
                        <h4>비밀번호 확인</h4>
                        <p>새 비밀번호를 확인합니다</p>
                      </div>
                      <div className={styles.passwordInput}>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="새 비밀번호를 다시 입력하세요"
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
                        <h4>세션 타임아웃</h4>
                        <p>비활성 후 자동 로그아웃</p>
                      </div>
                      <select className={styles.select}>
                        <option value="15">15분</option>
                        <option value="30">30분</option>
                        <option value="60">1시간</option>
                        <option value="120">2시간</option>
                        <option value="never">사용 안함</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>로그인 기록</h4>
                        <p>최근 로그인 시도를 확인합니다</p>
                      </div>
                      <button className={styles.actionButton}>
                        기록 보기
                      </button>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>활성 세션</h4>
                        <p>활성 세션을 관리합니다</p>
                      </div>
                      <button className={styles.actionButton}>
                        세션 관리
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>알림 설정</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>이메일 알림</h4>
                        <p>이메일로 업데이트를 받습니다</p>
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
                        <h4>푸시 알림</h4>
                        <p>기기에서 푸시 알림을 받습니다</p>
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
                        <h4>SMS 알림</h4>
                        <p>SMS로 업데이트를 받습니다</p>
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
                        <h4>마케팅 이메일</h4>
                        <p>홍보 콘텐츠와 혜택을 받습니다</p>
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
                        <h4>시스템 업데이트</h4>
                        <p>시스템 업데이트에 대한 알림을 받습니다</p>
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
                        <h4>보안 알림</h4>
                        <p>보안 이벤트에 대한 알림을 받습니다</p>
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
                  <h3 className={styles.sectionTitle}>외관 설정</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>테마</h4>
                        <p>선호하는 색상 구성표를 선택하세요</p>
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
                          <span>사이버펑크</span>
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
                          <span>자연</span>
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
                          <span>일몰</span>
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
                          <span>바다</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>애니메이션 속도</h4>
                        <p>UI 애니메이션의 속도를 조정합니다</p>
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
                          <span>느림</span>
                          <span>빠름</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>글꼴 크기</h4>
                        <p>앱 전체의 텍스트 크기를 조정합니다</p>
                      </div>
                      <select 
                        className={styles.select}
                        value={uiSettings.fontSize}
                        onChange={(e) => handleFontSizeChange(e.target.value)}
                      >
                        <option value="small">작음 (12px)</option>
                        <option value="medium">보통 (14px)</option>
                        <option value="large">큼 (16px)</option>
                        <option value="xlarge">매우 큼 (18px)</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>컴팩트 모드</h4>
                        <p>더 많은 콘텐츠를 위해 간격을 줄입니다</p>
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
                  <h3 className={styles.sectionTitle}>UI 커스터마이징</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>블러 효과</h4>
                        <p>현대적인 글래스 모피즘을 위한 배경 블러 효과를 활성화합니다</p>
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
                        <h4>글로우 효과</h4>
                        <p>인터랙티브 요소에 글로우 효과를 활성화합니다</p>
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
                        <h4>파티클 효과</h4>
                        <p>배경에 애니메이션 파티클 효과를 활성화합니다</p>
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
                        <h4>테두리 반경</h4>
                        <p>UI 요소의 둥글기를 선택하세요</p>
                      </div>
                      <select 
                        className={styles.select}
                        value={uiSettings.borderRadius}
                        onChange={(e) => handleBorderRadiusChange(e.target.value)}
                      >
                        <option value="small">작음 (4px)</option>
                        <option value="medium">보통 (8px)</option>
                        <option value="large">큼 (12px)</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>간격</h4>
                        <p>UI 요소 간의 간격을 조정합니다</p>
                      </div>
                      <select 
                        className={styles.select}
                        value={uiSettings.spacing}
                        onChange={(e) => handleSpacingChange(e.target.value)}
                      >
                        <option value="compact">컴팩트</option>
                        <option value="normal">보통</option>
                        <option value="spacious">넓음</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>사이드바 너비</h4>
                        <p>사이드바의 너비를 조정합니다</p>
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
                          <span>좁음</span>
                          <span>넓음</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>개인정보 설정</h3>
                  
                  <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>프로필 공개</h4>
                        <p>프로필 정보를 볼 수 있는 사람을 제어합니다</p>
                      </div>
                      <div className={styles.visibilityOptions}>
                        <div className={`${styles.visibilityOption} ${styles.active}`} role="button" tabIndex={0}>
                          <Public />
                          <span>공개</span>
                        </div>
                        <div className={styles.visibilityOption} role="button" tabIndex={0}>
                          <Business />
                          <span>친구만</span>
                        </div>
                        <div className={styles.visibilityOption} role="button" tabIndex={0}>
                          <Lock />
                          <span>비공개</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>분석 추적</h4>
                        <p>사용 분석 데이터 수집을 허용합니다</p>
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
                        <h4>위치 서비스</h4>
                        <p>더 나은 서비스를 위해 위치 접근을 허용합니다</p>
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
                        <h4>데이터 공유</h4>
                        <p>연구를 위한 익명화된 데이터 공유를 허용합니다</p>
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
                        <h4>쿠키 설정</h4>
                        <p>쿠키 설정을 관리합니다</p>
                      </div>
                      <button className={styles.actionButton}>
                        쿠키 관리
                      </button>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>데이터 내보내기</h4>
                        <p>데이터 복사본을 다운로드합니다</p>
                      </div>
                      <button className={styles.actionButton}>
                        데이터 내보내기
                      </button>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>계정 삭제</h4>
                        <p>계정과 데이터를 영구적으로 삭제합니다</p>
                      </div>
                      <button className={styles.dangerButton}>
                        계정 삭제
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
                <span>변경사항 저장</span>
              </button>
              <button className={styles.cancelButton}>
                <Cancel />
                <span>취소</span>
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
} 