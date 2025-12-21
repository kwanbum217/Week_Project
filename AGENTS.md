# AI Coding Guidelines

This document outlines the coding standards, technology stack, and design system for the **Love Letter** dating app project.

## 1. Project Overview

**Love Letter**는 소셜 매칭 서비스로, 사용자가 프로필을 만들고 채팅 및 음성/영상 통화를 통해 소통할 수 있는 플랫폼입니다.

## 2. Tech Stack

### Frontend
| 구분 | 기술 | 버전 |
|------|------|------|
| Framework | React | ^19.2.0 |
| Build Tool | Vite | ^7.2.4 |
| Styling | Tailwind CSS | ^4.1.17 |
| UI Components | Chakra UI | ^3.30.0 |
| Animation | Framer Motion | ^12.23.24 |
| Routing | React Router DOM | ^7.9.6 |
| WebSocket | SockJS + STOMP | 1.6.1 / 2.3.3 |

### Backend
| 구분 | 기술 | 버전 |
|------|------|------|
| Framework | Spring Boot | 3.1.5 |
| Build Tool | Maven | - |
| Database | Oracle / H2 (test) | - |
| Security | Spring Security + OAuth2 | - |
| Auth | JWT | jjwt 0.11.5 |
| WebSocket | Spring WebSocket | - |

## 3. Design System

*   **Colors:**
    *   **Primary:** #4ade80 (Green accent)
    *   **Background:** Black / Glass morphism
    *   **Text:** Gray scale
*   **UI Style:**
    *   Glass Card 디자인 (backdrop-blur)
    *   Dark theme 기반
    *   애니메이션 배경 (파티클)

## 4. Code Structure

### Frontend (`frontend/src/`)
```
src/
├── components/     # 재사용 컴포넌트
│   ├── Background.jsx
│   ├── CustomerSupportChat.jsx
│   └── ProtectedRoute.jsx
├── pages/          # 페이지 컴포넌트
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── Dashboard.jsx
│   ├── Chat.jsx
│   ├── Match.jsx
│   ├── VoiceChat.jsx
│   └── OAuth2RedirectHandler.jsx
├── App.jsx
└── main.jsx
```

### Backend (`backend/src/main/java/com/example/datingapp/`)
```
datingapp/
├── config/         # 설정 (Security, CORS, WebSocket)
├── controller/     # REST API 컨트롤러
├── model/          # JPA 엔티티
├── repository/     # JPA 리포지토리
├── security/       # JWT, OAuth2 보안
└── service/        # 비즈니스 로직
```

## 5. AI Coding Rules

*   **언어:** 한국어 응답 우선
*   **No Emojis:** 코드 주석, 커밋 메시지에 이모지 사용 금지
*   **Conciseness:** 간결하고 핵심에 집중
*   **Pathing:** 프로젝트 루트 기준 상대 경로 사용
*   **Styling:** Chakra UI 우선, Tailwind로 커스텀 스타일링