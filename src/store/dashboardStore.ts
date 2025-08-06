import { create } from 'zustand';

interface DashboardState {
  // 테마 관련
  isDarkMode: boolean;
  toggleTheme: () => void;
  
  // UI 커스터마이징
  uiSettings: {
    theme: 'cyberpunk' | 'nature' | 'sunset' | 'ocean';
    animationSpeed: number;
    fontSize: 'small' | 'medium' | 'large' | 'xlarge';
    compactMode: boolean;
    blurEffect: boolean;
    glowEffect: boolean;
    particleEffect: boolean;
    sidebarWidth: number;
    borderRadius: 'small' | 'medium' | 'large';
    spacing: 'compact' | 'normal' | 'spacious';
  };
  updateUISettings: (settings: Partial<DashboardState['uiSettings']>) => void;
  
  // 애니메이션 상태
  isAnimating: boolean;
  setAnimating: (state: boolean) => void;
  
  // 대시보드 데이터
  stats: {
    visitors: number;
    revenue: number;
    orders: number;
    conversion: number;
  };
  updateStats: (newStats: Partial<DashboardState['stats']>) => void;
  
  // 사이드바 상태
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // 알림 상태
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: Date;
  }>;
  addNotification: (notification: Omit<DashboardState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // 테마 관련
  isDarkMode: true,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // UI 커스터마이징
  uiSettings: {
    theme: 'cyberpunk',
    animationSpeed: 50,
    fontSize: 'medium',
    compactMode: false,
    blurEffect: true,
    glowEffect: true,
    particleEffect: true,
    sidebarWidth: 280,
    borderRadius: 'medium',
    spacing: 'normal'
  },
  updateUISettings: (settings) => set((state) => ({
    uiSettings: { ...state.uiSettings, ...settings }
  })),
  
  // 애니메이션 상태
  isAnimating: false,
  setAnimating: (state) => set({ isAnimating: state }),
  
  // 대시보드 데이터
  stats: {
    visitors: 12450,
    revenue: 45678,
    orders: 892,
    conversion: 3.2,
  },
  updateStats: (newStats) => set((state) => ({
    stats: { ...state.stats, ...newStats }
  })),
  
  // 사이드바 상태
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  // 알림 상태
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      }
    ]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
})); 