# Love Letter - Dating App

소셜 매칭 플랫폼 "Love Letter" 프로젝트입니다.

## 주요 기능

- **회원가입/로그인**: 일반 로그인 + OAuth2 (Google, Kakao, Naver)
- **매칭 시스템**: 사용자 매칭 기능
- **실시간 채팅**: WebSocket 기반 1:1 채팅
- **음성/영상 통화**: WebRTC 기반 음성 채팅
- **AI 고객 지원**: Gemini AI 기반 챗봇

## 기술 스택

### Frontend
| 기술 | 버전 | 비고 |
|------|------|------|
| React | ^19.2.0 | UI 라이브러리 |
| Vite | ^7.2.4 | 빌드 도구 |
| Tailwind CSS | ^4.1.17 | 스타일링 |
| Chakra UI | ^3.30.0 | UI 컴포넌트 |
| Framer Motion | ^12.23.24 | 애니메이션 |
| React Router DOM | ^7.9.6 | 라우팅 |
| SockJS + STOMP | 1.6.1 / 2.3.3 | WebSocket |

### Backend
| 기술 | 버전 | 비고 |
|------|------|------|
| Spring Boot | 3.1.5 | 백엔드 프레임워크 |
| Spring Security | - | 인증/인가 |
| Spring WebSocket | - | 실시간 통신 |
| OAuth2 Client | - | 소셜 로그인 |
| JWT (jjwt) | 0.11.5 | 토큰 인증 |
| JPA / Hibernate | - | ORM |
| Oracle / H2 | - | 데이터베이스 |

## 설치 및 실행

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
# 테스트 환경 (H2 인메모리 DB)
mvn spring-boot:run "-Dspring-boot.run.profiles=test"
# http://localhost:9999
```

## 프로젝트 구조

```
Week_ProjectCl/
├── frontend/           # React 프론트엔드
│   ├── src/
│   │   ├── components/ # 재사용 컴포넌트
│   │   ├── pages/      # 페이지 컴포넌트
│   │   └── App.jsx     # 메인 앱
│   └── package.json
├── backend/            # Spring Boot 백엔드
│   ├── src/main/java/com/example/datingapp/
│   │   ├── config/     # 설정
│   │   ├── controller/ # API 컨트롤러
│   │   ├── model/      # 엔티티
│   │   ├── repository/ # 리포지토리
│   │   ├── security/   # 보안 (JWT, OAuth2)
│   │   └── service/    # 서비스
│   └── pom.xml
├── AGENTS.md           # AI 코딩 가이드라인
└── README.md           # 프로젝트 문서
```

## API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/auth/register` | 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| GET | `/oauth2/authorization/{provider}` | OAuth2 로그인 |
| GET | `/api/match/**` | 매칭 API |
| WS | `/ws/**` | WebSocket 연결 |

## 날짜별 작업 기록

| 날짜 | 담당 | 작업 내용 | 비고 |
|------|------|----------|------|
| 2025-12-21 | - | 로그인/회원가입 기능 테스트 완료 | H2 환경 |

---

### 작업 기록 템플릿

`| YYYY-MM-DD | 이름 | 작업 내용 | 비고 |`