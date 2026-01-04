# MOOA 프로젝트 기술 스택 및 구조

## 프로젝트 개요
MOOA는 시니어를 위한 소셜 네트워킹 웹 애플리케이션입니다.

> **마지막 업데이트**: 2026-01-03

---

## 프로젝트 폴더 구조

```
Week_ProjectCl/
├── backend/                          # Spring Boot 백엔드
│   ├── src/main/java/com/example/datingapp/
│   │   ├── DatingAppApplication.java # 메인 애플리케이션
│   │   ├── config/                   # 설정 파일
│   │   │   ├── AIConfig.java         # Gemini AI 설정
│   │   │   ├── AppConfig.java        # 앱 설정
│   │   │   ├── CorsConfig.java       # CORS 설정
│   │   │   ├── SecurityConfig.java   # Spring Security 설정
│   │   │   ├── WebSocketConfig.java  # WebSocket/STOMP 설정
│   │   │   └── JwtChannelInterceptor.java
│   │   ├── controller/               # REST 컨트롤러
│   │   │   ├── AuthController.java   # 인증 (로그인/회원가입)
│   │   │   ├── ChatController.java   # 채팅
│   │   │   ├── MatchController.java  # 매칭
│   │   │   ├── SignalingController.java # WebRTC 시그널링
│   │   │   └── CustomerSupportController.java # AI 고객지원
│   │   ├── model/                    # 엔티티
│   │   │   ├── User.java
│   │   │   ├── ChatMessage.java
│   │   │   └── SignalingMessage.java
│   │   ├── repository/               # JPA 리포지토리
│   │   ├── security/                 # 보안 관련
│   │   └── service/                  # 비즈니스 로직
│   └── src/main/resources/
│       └── application.properties    # 앱 설정 (DB, AI 등)
│
├── frontend/                         # React/Vite 프론트엔드
│   ├── src/
│   │   ├── App.jsx                   # 메인 라우팅
│   │   ├── main.jsx                  # 엔트리 포인트
│   │   ├── index.css                 # MOOA 디자인 시스템
│   │   ├── components/               # 재사용 컴포넌트
│   │   │   ├── Background.jsx        # 배경 애니메이션
│   │   │   ├── Navbar.jsx            # 네비게이션 바
│   │   │   ├── Footer.jsx            # 푸터
│   │   │   ├── ProtectedRoute.jsx    # 인증 라우트 가드
│   │   │   ├── VoiceCall.jsx         # 음성통화 (WebRTC)
│   │   │   └── CustomerSupportChat.jsx # AI 고객지원 채팅
│   │   ├── pages/                    # 페이지 컴포넌트
│   │   │   ├── Login.jsx             # 로그인
│   │   │   ├── SignUp.jsx            # 회원가입
│   │   │   ├── Dashboard.jsx         # 마이페이지 (대시보드)
│   │   │   ├── Chat.jsx              # 채팅
│   │   │   ├── Match.jsx             # 친구 매칭
│   │   │   ├── Meetup.jsx            # 모임하기
│   │   │   ├── Market.jsx            # 무아나눔 (중고거래)
│   │   │   ├── Info.jsx              # 정보 페이지
│   │   │   ├── Intro.jsx             # 소개 페이지
│   │   │   ├── VoiceChat.jsx         # 음성채팅 페이지
│   │   │   ├── AdminPage.jsx         # 관리자 페이지
│   │   │   └── OAuth2RedirectHandler.jsx
│   │   └── assets/                   # 정적 리소스
│   └── package.json
│
├── img/                              # 이미지 리소스
├── .antigravityrules                 # 프로젝트 규칙 (한국어 응답)
├── AGENTS.md                         # 에이전트 가이드
├── README.md                         # 프로젝트 설명
└── Instruction.md                    # 기술 스택 (이 파일)
```

---

## Core Framework & Build Tool

### Frontend
| 기술 | 버전 | 설명 |
|------|------|------|
| React | ^19.2.0 | UI 라이브러리 |
| React DOM | ^19.2.0 | React DOM 렌더러 |
| Vite | ^7.2.4 | 빌드 도구 |
| React Router DOM | ^7.9.6 | SPA 라우팅 |

### Backend
| 기술 | 버전 | 설명 |
|------|------|------|
| Java | 17 (LTS) | 프로그래밍 언어 |
| Spring Boot | 3.1.5 | 백엔드 프레임워크 |
| Spring Security | - | 인증/인가 |
| Spring WebSocket | - | 실시간 통신 |
| Spring WebFlux | - | 리액티브 웹 |
| Spring Validation | - | 입력 유효성 검사 |
| Spring OAuth2 Client | - | 소셜 로그인 |
| JPA/Hibernate | - | ORM |
| Lombok | - | 보일러플레이트 코드 감소 |

---

## Database
| 기술 | 버전 | 설명 |
|------|------|------|
| H2 Database | runtime | 개발용 인메모리 DB |
| MySQL Connector | runtime | MySQL 연결 드라이버 |
| Oracle JDBC (ojdbc8) | runtime | Oracle 연결 드라이버 |

---

## Styling & UI (Frontend)
| 기술 | 버전 | 설명 |
|------|------|------|
| Chakra UI | ^3.30.0 | React UI 컴포넌트 라이브러리 |
| Emotion React | ^11.14.0 | CSS-in-JS |
| Emotion Styled | ^11.14.1 | Styled Components |
| Tailwind CSS | ^4.1.17 | 유틸리티 CSS 프레임워크 |
| Framer Motion | ^12.23.24 | 애니메이션 라이브러리 |
| React Icons | ^5.5.0 | 아이콘 라이브러리 |

---

## Real-time Communication
| 기술 | 버전 | 설명 |
|------|------|------|
| SockJS Client | ^1.6.1 (FE) / 1.5.1 (BE) | WebSocket 폴백 |
| STOMP.js | ^2.3.3 (FE) / 2.3.4 (BE) | 메시지 프로토콜 |
| WebRTC | - | P2P 음성/영상 통화 |

---

## Security & Authentication
| 기술 | 버전 | 설명 |
|------|------|------|
| JWT (jjwt) | 0.11.5 | JSON Web Token 인증 |
| Spring Security | - | 보안 프레임워크 |
| OAuth2 | - | 소셜 로그인 (Google, Kakao 등) |

---

## Development Tools (Frontend)
| 기술 | 버전 | 설명 |
|------|------|------|
| ESLint | ^9.39.1 | 코드 린팅 |
| Autoprefixer | ^10.4.22 | CSS 자동 접두사 |
| PostCSS | ^8.5.6 | CSS 변환 도구 |
| @vitejs/plugin-react | ^5.1.1 | Vite React 플러그인 |

---

## Serialization & Data Processing
| 기술 | 버전 | 설명 |
|------|------|------|
| Jackson Databind | - | JSON 직렬화/역직렬화 |

---

## MOOA Design System

### Colors (CSS Variables)
```css
--mooa-orange: #F5A623;      /* 브랜드 메인 */
--mooa-orange-light: #FFE4B5;
--mooa-blue: #5DADE2;        /* 보조 색상 */
--mooa-navy: #2C3E50;        /* 텍스트 */
--mooa-cream: #FFF8F0;       /* 배경 */
```

### Typography
- **Font Family**: 'Pretendard', 'Noto Sans KR', sans-serif
- **시니어 친화적 폰트 크기**: 기본 18px

### Common Classes
- `.mooa-card`, `.mooa-glass-card` - 카드 컴포넌트
- `.mooa-btn-primary`, `.mooa-btn-secondary` - 버튼
- `.mooa-input` - 입력 필드
- `.mooa-feature-card` - 기능 카드

---

## 실행 방법

### Frontend
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173 에서 실행
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
# 또는 VS Code Spring Boot Dashboard 사용
# http://localhost:8080 에서 실행
```

---

## 주요 API 엔드포인트

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/api/auth/signup` | POST | 회원가입 |
| `/api/auth/login` | POST | 로그인 |
| `/api/admin/users` | GET | 관리자 - 사용자 목록 |
| `/ws` | WebSocket | 실시간 채팅/시그널링 |