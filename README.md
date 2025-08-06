# MGsFlow 방명록 관리 대시보드

방명록 시스템을 위한 관리자 대시보드입니다. 사이버펑크 테마의 현대적인 UI로 방명록 데이터를 분석하고 관리할 수 있습니다.

## 🚀 주요 기능

### 📊 **대시보드**
- 방명록 통계 개요 (총 방명록, 발행된 방명록, 미발행 방명록, 총 조회수)
- 월별 방명록 작성 추이 차트
- 월별 조회수 추이 차트
- 최근 방명록 활동 목록
- 빠른 액션 버튼들

### 📈 **분석 페이지**
- 방명록 성과 분석 (총 방명록, 총 조회수, 평균 좋아요, 총 댓글)
- 방명록 카테고리 분포 (인사/소개, 기술 질문, 경험 공유, 커리어 조언)
- 참여도 분포 분석
- 인기 방명록 목록
- 실시간 활동 피드

### 📝 **발행 관리**
- 방명록 발행 상태 관리 (발행됨, 미발행, 임시저장, 검토중, 취소됨)
- 방명록 검색 및 필터링
- 발행 통계 (총 방명록, 발행된 방명록, 총 좋아요, 미발행/임시저장)
- 방명록 상세 정보 (제목, 조회수, 좋아요, 태그)

### 👥 **방명록 관리**
- 방명록 작성자 관리
- 사용자 역할 관리 (관리자, 중재자, 사용자)
- 사용자 상태 관리 (활성, 비활성, 정지됨)
- 사용자별 방명록 수 및 좋아요 수 통계
- 사용자 검색 및 필터링

### ⚙️ **설정**
- 프로필 정보 관리
- 일반 설정 (다크 모드, 언어, 시간대, 날짜 형식, 통화)
- 보안 설정 (2단계 인증, 비밀번호 변경, 세션 관리)
- 알림 설정 (이메일, 푸시, SMS, 마케팅, 시스템 업데이트, 보안 알림)
- 외관 설정 (테마, 애니메이션 속도, 글꼴 크기, 컴팩트 모드)
- UI 커스터마이징 (블러 효과, 글로우 효과, 파티클 효과, 테두리 반경, 간격, 사이드바 너비)
- 개인정보 설정 (프로필 공개, 분석 추적, 위치 서비스, 데이터 공유)

## 🛠️ 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: CSS Modules
- **상태 관리**: Zustand
- **UI 컴포넌트**: Material-UI (MUI)
- **애니메이션**: Framer Motion
- **아이콘**: Material Icons
- **차트**: CSS 기반 커스텀 차트

## 📁 프로젝트 구조

```
dash/
├── src/
│   ├── app/
│   │   ├── analytics/          # 분석 페이지
│   │   ├── orders/            # 발행 관리 페이지
│   │   ├── users/             # 방명록 관리 페이지
│   │   ├── settings/          # 설정 페이지
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── page.tsx           # 메인 대시보드
│   ├── components/
│   │   ├── animations/        # 애니메이션 컴포넌트
│   │   ├── backgrounds/       # 배경 컴포넌트
│   │   ├── dashboard/         # 대시보드 컴포넌트
│   │   └── effects/           # 효과 컴포넌트
│   └── store/
│       └── dashboardStore.ts  # 상태 관리
├── public/                    # 정적 파일
└── README.md
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm, yarn, pnpm 또는 bun

### 설치 및 실행

1. **의존성 설치**
```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

2. **개발 서버 실행**
```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

3. **브라우저에서 확인**
브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 🎨 UI/UX 특징

### 사이버펑크 테마
- 네온 색상과 글로우 효과
- 그라데이션 배경과 블러 효과
- 현대적인 글래스모피즘 디자인

### 반응형 디자인
- 모바일, 태블릿, 데스크톱 최적화
- 터치 친화적 인터페이스
- 적응형 레이아웃

### 애니메이션
- 부드러운 페이지 전환
- 호버 효과와 마이크로 인터랙션
- 로딩 애니메이션

## 📊 데이터 구조

### 방명록 통계
```typescript
interface GuestbookStats {
  totalPosts: number;        // 총 방명록 수
  publishedPosts: number;    // 발행된 방명록 수
  unpublishedPosts: number;  // 미발행 방명록 수
  totalViews: number;        // 총 조회수
  totalComments: number;     // 총 댓글 수
  monthlyGrowth: number;     // 월별 성장률
}
```

### 방명록 데이터
```typescript
interface GuestbookPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'published' | 'unpublished' | 'draft';
  views: number;
  likes: number;
  tags: string[];
  createdAt: string;
}
```

## 🔧 환경 설정

### 환경 변수
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_NAME=MGsFlow 방명록 관리
```

### 개발 도구
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 안정성

## 📝 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

---

**MGsFlow 방명록 관리 시스템** 
