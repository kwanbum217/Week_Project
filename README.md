# MOOA - 시니어 소셜 네트워킹 플랫폼

시니어를 위한 소셜 네트워킹 플랫폼 **MOOA** 프로젝트입니다.

## 🌟 주요 기능

| 기능 | 설명 |
|------|------|
| 🔐 **회원가입/로그인** | 일반 로그인 + OAuth2 (Google, Kakao, Naver) |
| 👥 **친구 찾기** | 취미 기반 사용자 매칭 |
| 💬 **실시간 채팅** | WebSocket 기반 1:1 채팅 |
| 📞 **음성통화** | WebRTC 기반 P2P 음성 통화 |
| 🤖 **AI 고객 지원** | Gemini AI 기반 챗봇 |

---

## 🛠️ 기술 스택

### Frontend
| 기술 | 버전 | 설명 |
|------|------|------|
| React | ^19.2.0 | UI 라이브러리 |
| Vite | ^7.2.4 | 빌드 도구 |
| Tailwind CSS | ^4.1.17 | 스타일링 |
| Chakra UI | ^3.30.0 | UI 컴포넌트 |
| Framer Motion | ^12.23.24 | 애니메이션 |
| React Router DOM | ^7.9.6 | 라우팅 |
| SockJS + STOMP | 1.6.1 / 2.3.3 | WebSocket |

### Backend
| 기술 | 버전 | 설명 |
|------|------|------|
| Spring Boot | 3.1.5 | 백엔드 프레임워크 |
| Spring Security | - | 인증/인가 |
| Spring WebSocket | - | 실시간 통신 |
| OAuth2 Client | - | 소셜 로그인 |
| JWT (jjwt) | 0.11.5 | 토큰 인증 |
| JPA / Hibernate | - | ORM |
| Oracle Database | - | 데이터베이스 |

---

## 📁 프로젝트 구조

```
Week_ProjectCl/
├── frontend/                   # React 프론트엔드
│   ├── src/
│   │   ├── components/         # 재사용 컴포넌트
│   │   │   ├── Background.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── VoiceCall.jsx
│   │   │   ├── CustomerSupportChat.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/              # 페이지 컴포넌트
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Match.jsx
│   │   │   └── VoiceChat.jsx
│   │   ├── index.css           # MOOA 디자인 시스템
│   │   └── App.jsx
│   └── package.json
│
├── backend/                    # Spring Boot 백엔드
│   ├── src/main/java/com/example/datingapp/
│   │   ├── config/             # 설정 (Security, WebSocket, CORS)
│   │   ├── controller/         # REST 컨트롤러
│   │   ├── model/              # 엔티티 (User, ChatMessage)
│   │   ├── repository/         # JPA 리포지토리
│   │   ├── security/           # JWT, OAuth2
│   │   └── service/            # 비즈니스 로직
│   └── src/main/resources/
│       └── application.properties
│
├── img/                        # 이미지 리소스
├── AGENTS.md                   # AI 코딩 가이드라인
├── Instruction.md              # 기술 스택 상세
└── README.md                   # 프로젝트 문서 (이 파일)
```

---

## 🚀 설치 및 실행

### Frontend
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

### Backend
```bash
cd backend
# 기본 실행 (Oracle DB)
mvn spring-boot:run
# 테스트 환경 (H2 인메모리 DB)
mvn spring-boot:run -Dspring-boot.run.profiles=test
# http://localhost:9999
```

---

## 📡 API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/auth/register` | 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| GET | `/oauth2/authorization/{provider}` | OAuth2 로그인 |
| GET | `/api/match/**` | 매칭 API |
| WS | `/ws/**` | WebSocket 연결 |
| WS | `/app/call/**` | 음성통화 시그널링 |

---

## 📅 작업 기록

| 날짜 | 담당 | 작업 내용 | 비고 |
|------|------|----------|------|
| 2025-12-21 | - | 로그인/회원가입 기능 테스트 완료 | H2 환경 |
| 2025-12-28 | - | MOOA 브랜딩 적용 | 디자인 시스템 |
| 2025-12-28 | - | 음성통화 기능 구현 | WebRTC |

---

### 작업 기록 템플릿
`| YYYY-MM-DD | 이름 | 작업 내용 | 비고 |`