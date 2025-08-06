import { create } from 'zustand';

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface GuestbookStats {
  totalPosts: number;
  publishedPosts: number;
  unpublishedPosts: number;
  totalViews: number;
  totalComments: number;
  monthlyGrowth: number;
}

interface GuestbookPost {
  id: string;
  title: string;
  author: string;
  status: 'published' | 'unpublished' | 'draft';
  views: number;
  likes: number;
  created_at: string;
  tags: string[];
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
  
  // 방명록 대시보드 데이터
  guestbookStats: GuestbookStats;
  updateGuestbookStats: (newStats: Partial<GuestbookStats>) => void;
  
  // 방명록 목록
  guestbookPosts: GuestbookPost[];
  updateGuestbookPosts: (posts: GuestbookPost[]) => void;
  
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
  
  // 방명록 대시보드 데이터
  guestbookStats: {
    totalPosts: 156,
    publishedPosts: 142,
    unpublishedPosts: 14,
    totalViews: 28450,
    totalComments: 892,
    monthlyGrowth: 23.5,
  },
  updateGuestbookStats: (newStats) => set((state) => ({
    guestbookStats: { ...state.guestbookStats, ...newStats }
  })),
  
  // 방명록 목록 (샘플 데이터)
  guestbookPosts: [
    {
      id: '1',
      title: '안녕하세요! 멋진 포트폴리오네요',
      author: '김개발',
      status: 'published',
      views: 245,
      likes: 12,
      created_at: '2024-01-15T10:30:00Z',
      tags: ['인사', '포트폴리오']
    },
    {
      id: '2',
      title: 'React 프로젝트에 대해 궁금해요',
      author: '이프론트',
      status: 'published',
      views: 189,
      likes: 8,
      created_at: '2024-01-14T15:20:00Z',
      tags: ['React', '질문']
    },
    {
      id: '3',
      title: 'TypeScript 사용 경험 공유',
      author: '박타입',
      status: 'published',
      views: 156,
      likes: 15,
      created_at: '2024-01-13T09:45:00Z',
      tags: ['TypeScript', '경험']
    },
    {
      id: '4',
      title: 'Next.js 성능 최적화 팁',
      author: '최성능',
      status: 'unpublished',
      views: 0,
      likes: 0,
      created_at: '2024-01-12T14:10:00Z',
      tags: ['Next.js', '최적화']
    },
    {
      id: '5',
      title: '프론트엔드 개발자 커리어 조언',
      author: '정커리어',
      status: 'published',
      views: 312,
      likes: 25,
      created_at: '2024-01-11T11:15:00Z',
      tags: ['커리어', '조언']
    },
    {
      id: '6',
      title: 'CSS 애니메이션 기법 소개',
      author: '한애니',
      status: 'draft',
      views: 0,
      likes: 0,
      created_at: '2024-01-10T16:30:00Z',
      tags: ['CSS', '애니메이션']
    }
  ],
  updateGuestbookPosts: (posts) => set({ guestbookPosts: posts }),
  
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