# MOOA Backend

MOOA 시니어 소셜 네트워킹 플랫폼의 백엔드입니다.

## 🛠️ 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| Spring Boot | 3.1.5 | 백엔드 프레임워크 |
| Spring Security | - | 인증/인가 |
| Spring WebSocket | - | 실시간 통신 (STOMP) |
| OAuth2 Client | - | 소셜 로그인 |
| JWT (jjwt) | 0.11.5 | 토큰 인증 |
| JPA / Hibernate | 6.2.13 | ORM |
| Oracle Database | - | 프로덕션 DB |
| H2 Database | - | 테스트 DB |
| WebFlux (WebClient) | - | Gemini AI 연동 |

---

## 📁 폴더 구조

```
src/main/java/com/example/datingapp/
├── DatingAppApplication.java     # 메인 애플리케이션
│
├── config/                       # 설정
│   ├── AIConfig.java             # Gemini AI WebClient 설정
│   ├── AppConfig.java            # 앱 설정 (PasswordEncoder)
│   ├── CorsConfig.java           # CORS 설정
│   ├── SecurityConfig.java       # Spring Security 설정
│   ├── WebSocketConfig.java      # WebSocket/STOMP 설정
│   └── JwtChannelInterceptor.java # JWT WebSocket 인터셉터
│
├── controller/                   # REST 컨트롤러
│   ├── AuthController.java       # 인증 (로그인/회원가입)
│   ├── ChatController.java       # 채팅 메시지
│   ├── MatchController.java      # 사용자 매칭
│   ├── SignalingController.java  # WebRTC 시그널링
│   └── CustomerSupportController.java # AI 고객지원
│
├── model/                        # 엔티티
│   ├── User.java                 # 사용자
│   ├── ChatMessage.java          # 채팅 메시지
│   └── SignalingMessage.java     # 시그널링 메시지
│
├── repository/                   # JPA 리포지토리
│   └── UserRepository.java
│
├── security/                     # 보안
│   ├── JwtAuthenticationFilter.java
│   ├── JwtUtil.java
│   ├── OAuth2LoginSuccessHandler.java
│   └── CustomOAuth2UserService.java
│
└── service/                      # 비즈니스 로직
    ├── UserService.java
    ├── GeminiService.java        # AI 서비스
    └── ...
```

---

## 🚀 실행 방법

```bash
# 기본 실행 (Oracle DB)
mvn spring-boot:run
# http://localhost:9999

# 테스트 환경 (H2 인메모리 DB)
mvn spring-boot:run -Dspring-boot.run.profiles=test
```

---

## ⚙️ 설정 파일 (`application.properties`)

```properties
# 서버 포트
server.port=9999

# Oracle DB (프로덕션)
spring.datasource.url=jdbc:oracle:thin:@//호스트:포트/서비스명
spring.datasource.username=사용자명
spring.datasource.password=비밀번호

# JPA 설정
spring.jpa.hibernate.ddl-auto=create  # 개발: create, 운영: none
spring.jpa.show-sql=true

# AI 설정 (선택)
spring.ai.enabled=false
spring.ai.api=YOUR_GEMINI_API_KEY
```

---

## 📡 API 엔드포인트

### 인증
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/auth/register` | 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| GET | `/oauth2/authorization/google` | Google 로그인 |
| GET | `/oauth2/authorization/kakao` | Kakao 로그인 |
| GET | `/oauth2/authorization/naver` | Naver 로그인 |

### 매칭
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/match/nearby` | 근처 사용자 조회 |
| GET | `/api/match/recommendations` | 추천 사용자 |

### WebSocket
| Destination | 설명 |
|-------------|------|
| `/ws` | WebSocket 연결 엔드포인트 |
| `/app/chat.send` | 채팅 메시지 전송 |
| `/app/call/offer` | 음성통화 Offer |
| `/app/call/answer` | 음성통화 Answer |
| `/app/call/candidate` | ICE Candidate |
| `/topic/call/*` | 시그널링 구독 |
