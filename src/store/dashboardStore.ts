import { create } from 'zustand';

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

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
    splashCursor: boolean;
    // Fluid simulation 설정
    fluidSettings: {
      SIM_RESOLUTION: number;
      DYE_RESOLUTION: number;
      CAPTURE_RESOLUTION: number;
      DENSITY_DISSIPATION: number;
      VELOCITY_DISSIPATION: number;
      PRESSURE: number;
      PRESSURE_ITERATIONS: number;
      CURL: number;
      SPLAT_RADIUS: number;
      SPLAT_FORCE: number;
      SHADING: boolean;
      COLOR_UPDATE_SPEED: number;
      BACK_COLOR: ColorRGB;
      TRANSPARENT: boolean;
    };
    sidebarWidth: number;
    borderRadius: 'small' | 'medium' | 'large';
    spacing: 'compact' | 'normal' | 'spacious';
  };
  updateUISettings: (settings: Partial<DashboardState['uiSettings']>) => void;
  updateFluidSettings: (settings: Partial<DashboardState['uiSettings']['fluidSettings']>) => void;
  
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
    splashCursor: true,
    fluidSettings: {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1440,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 3.5,
      VELOCITY_DISSIPATION: 2,
      PRESSURE: 0.1,
      PRESSURE_ITERATIONS: 20,
      CURL: 3,
      SPLAT_RADIUS: 0.2,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR_UPDATE_SPEED: 10,
      BACK_COLOR: { r: 0.5, g: 0, b: 0 },
      TRANSPARENT: true
    },
    sidebarWidth: 280,
    borderRadius: 'medium',
    spacing: 'normal'
  },
  updateUISettings: (settings) => set((state) => ({
    uiSettings: { ...state.uiSettings, ...settings }
  })),
  updateFluidSettings: (settings) => set((state) => ({
    uiSettings: { 
      ...state.uiSettings, 
      fluidSettings: { ...state.uiSettings.fluidSettings, ...settings }
    }
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