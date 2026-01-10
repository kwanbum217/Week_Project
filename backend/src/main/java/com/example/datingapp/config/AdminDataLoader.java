package com.example.datingapp.config;

import com.example.datingapp.model.User;
import com.example.datingapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * 관리자 계정 자동 생성 DataLoader
 * 앱 시작 시 관리자 계정이 없으면 자동으로 생성
 */
@Component
@Order(1) // 다른 DataLoader보다 먼저 실행
public class AdminDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminDataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // admin 계정이 이미 존재하는지 확인
        if (userRepository.findByUsername("admin").isPresent()) {
            User existingAdmin = userRepository.findByUsername("admin").get();
            existingAdmin.setPassword(passwordEncoder.encode("admin123"));
            existingAdmin.setRole("ADMIN");
            userRepository.save(existingAdmin);
            System.out.println("========================================");
            System.out.println("✅ 관리자 계정(admin) 비밀번호가 admin123으로 초기화되었습니다.");
            System.out.println("========================================");
            return;
        }

        // 관리자 계정 생성
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setEmail("admin@mooa.com");
        admin.setRole("ADMIN");
        admin.setGender("기타");
        admin.setLocation("서울시 관리자");

        userRepository.save(admin);
        System.out.println("========================================");
        System.out.println("✅ 관리자 계정이 새로 생성되었습니다!");
        System.out.println("   아이디: admin");
        System.out.println("   비밀번호: admin123");
        System.out.println("   역할: ADMIN");
        System.out.println("========================================");

        // 일반 사용자 테스트 계정 생성
        if (!userRepository.findByUsername("testuser").isPresent()) {
            User testUser = new User();
            testUser.setUsername("testuser");
            testUser.setPassword(passwordEncoder.encode("test123"));
            testUser.setNickname("무아지경");
            testUser.setEmail("testuser@mooa.com");
            testUser.setRole("USER");
            testUser.setGender("남성");
            testUser.setLocation("서울시 강남구");
            testUser.setBirthDate("1960-01-01");
            testUser.setName("김철수");
            testUser.setPhone("010-1234-5678");
            testUser.setInterests("등산, 독서, 요리");
            testUser.setWantToHost("카페투어, 산책");
            testUser.setWantToFindFriends(true);
            testUser.setWantToMeet(true);
            testUser.setWantToChat(true);
            testUser.setWantToShare(false);
            testUser.setMemo("우수 활동 회원, 커뮤니티 참여 의사 높음");

            userRepository.save(testUser);
            System.out.println("========================================");
            System.out.println("✅ 테스트 사용자 계정이 새로 생성되었습니다!");
            System.out.println("   아이디: testuser");
            System.out.println("   비밀번호: test123");
            System.out.println("   역할: USER");
            System.out.println("========================================");
        }
    }
}
