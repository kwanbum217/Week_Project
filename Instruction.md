# MOOA 프로젝트 기술 스택 및 구조

## 프로젝트 개요
MOOA는 시니어를 위한 소셜 네트워킹 웹 애플리케이션입니다.

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
│   │   │   ├── ProtectedRoute.jsx    # 인증 라우트 가드
│   │   │   ├── VoiceCall.jsx         # 음성통화 (WebRTC)
│   │   │   └── CustomerSupportChat.jsx # AI 고객지원 채팅
│   │   ├── pages/                    # 페이지 컴포넌트
│   │   │   ├── Login.jsx             # 로그인
│   │   │   ├── SignUp.jsx            # 회원가입
│   │   │   ├── Dashboard.jsx         # 대시보드
│   │   │   ├── Chat.jsx              # 채팅
│   │   │   ├── Match.jsx             # 친구 매칭
│   │   │   ├── VoiceChat.jsx         # 음성채팅 페이지
│   │   │   └── OAuth2RedirectHandler.jsx
│   │   └── assets/                   # 정적 리소스
│   └── package.json
│
├── img/                              # 이미지 리소스
├── AGENTS.md                         # 에이전트 가이드
├── README.md                         # 프로젝트 설명
└── Instruction.md                    # 기술 스택 (이 파일)
```

---

## Core Framework & Build Tool

### Frontend
| 기술 | 버전 | 설명 |
|------|------|------|
| React | v19.2.0 | UI 라이브러리 |
| Vite | v7.2.4 | 빌드 도구 |
| React Router DOM | v7.9.6 | SPA 라우팅 |

### Backend
| 기술 | 버전 | 설명 |
|------|------|------|
| Spring Boot | v3.1.5 | 백엔드 프레임워크 |
| Spring Security | - | 인증/인가 |
| Spring WebSocket | - | 실시간 통신 |
| JPA/Hibernate | - | ORM |
| Oracle Database | - | 데이터베이스 |

---

## Styling & UI
| 기술 | 버전 | 설명 |
|------|------|------|
| Tailwind CSS | v4.1.17 | 유틸리티 CSS |
| Chakra UI | v3.30.0 | React 컴포넌트 |
| Framer Motion | v12.23.24 | 애니메이션 |

---

## Real-time Communication
| 기술 | 설명 |
|------|------|
| SockJS | WebSocket 폴백 |
| STOMP | 메시지 프로토콜 |
| WebRTC | P2P 음성통화 |

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