# MOOA Frontend

MOOA 시니어 소셜 네트워킹 플랫폼의 프론트엔드입니다.

## 🛠️ 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| React | ^19.2.0 | UI 라이브러리 |
| Vite | ^7.2.4 | 빌드 도구 |
| Tailwind CSS | ^4.1.17 | 유틸리티 CSS |
| Chakra UI | ^3.30.0 | React 컴포넌트 |
| Framer Motion | ^12.23.24 | 애니메이션 |
| React Router DOM | ^7.9.6 | SPA 라우팅 |
| SockJS | ^1.6.1 | WebSocket 폴백 |
| STOMP.js | ^2.3.3 | 메시지 프로토콜 |

---

## 📁 폴더 구조

```
src/
├── App.jsx                    # 메인 라우팅
├── main.jsx                   # 엔트리 포인트
├── index.css                  # MOOA 디자인 시스템
├── App.css                    # 앱 스타일
│
├── components/                # 재사용 컴포넌트
│   ├── Background.jsx         # 배경 애니메이션
│   ├── Navbar.jsx             # 네비게이션 바
│   ├── ProtectedRoute.jsx     # 인증 라우트 가드
│   ├── VoiceCall.jsx          # 음성통화 (WebRTC)
│   └── CustomerSupportChat.jsx # AI 고객지원 챗봇
│
├── pages/                     # 페이지 컴포넌트
│   ├── Login.jsx              # 로그인
│   ├── SignUp.jsx             # 회원가입
│   ├── Dashboard.jsx          # 대시보드
│   ├── Chat.jsx               # 채팅
│   ├── Match.jsx              # 친구 매칭
│   ├── VoiceChat.jsx          # 음성채팅 페이지
│   └── OAuth2RedirectHandler.jsx # OAuth2 리다이렉트
│
└── assets/                    # 정적 리소스
    └── mooa-logo.png          # MOOA 로고
```

---

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
# http://localhost:5173

# 프로덕션 빌드
npm run build
```

---

## 🎨 MOOA 디자인 시스템

### 색상 변수 (`index.css`)
```css
--mooa-orange: #F5A623;      /* 브랜드 메인 */
--mooa-orange-light: #FFE4B5;
--mooa-blue: #5DADE2;        /* 보조 색상 */
--mooa-navy: #2C3E50;        /* 텍스트 */
--mooa-cream: #FFF8F0;       /* 배경 */
```

### 공통 클래스
- `.mooa-card`, `.mooa-glass-card` - 카드 컴포넌트
- `.mooa-btn-primary`, `.mooa-btn-secondary` - 버튼
- `.mooa-input` - 입력 필드
- `.mooa-feature-card` - 기능 카드

---

## 📡 백엔드 연동

| 기능 | 엔드포인트 |
|------|-----------|
| 로그인 | `POST /api/auth/login` |
| 회원가입 | `POST /api/auth/register` |
| WebSocket | `ws://localhost:9999/ws` |
| 음성통화 시그널링 | `/app/call/offer`, `/app/call/answer`, `/app/call/candidate` |
