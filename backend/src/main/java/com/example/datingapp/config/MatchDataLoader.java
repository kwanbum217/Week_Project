package com.example.datingapp.config;

import com.example.datingapp.model.User;
import com.example.datingapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
@Order(3)
public class MatchDataLoader implements CommandLineRunner {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final Random random = new Random();

  private static final String[] LOCATIONS = { "서울 강남구", "서울 서초구", "서울 송파구", "서울 강동구", "서울 마포구", "서울 종로구", "서울 용산구",
      "서울 성동구" };
  private static final String[] CATEGORIES = { "운동/건강", "문화/예술", "여행", "봉사활동" };

  // Realistic Korean Names for 60-70s
  private static final String[] MALE_NAMES = { "김영수", "이영호", "박영식", "최정수", "정종수", "강상철", "조성수", "윤용수", "장병철", "임재석",
      "한명수", "오경수", "서광수", "신정호", "권성호" };
  private static final String[] FEMALE_NAMES = { "김영숙", "이정숙", "박영희", "최순자", "정명자", "강경자", "조옥자", "윤정자", "장숙자", "임미경",
      "한은경", "오혜경", "서영자", "신순이", "권춘자" };

  // Interests mapping
  private static final String[] HEALTH_INTERESTS = { "등산", "요가", "건강", "자전거", "헬스", "산책" };
  private static final String[] CULTURE_INTERESTS = { "댄스", "음악", "사교", "바둑", "독서", "토론", "사진", "영화" };
  private static final String[] TRAVEL_INTERESTS = { "여행", "맛집", "캠핑", "드라이브" };
  private static final String[] VOLUNTEER_INTERESTS = { "봉사", "원예", "요리", "돌봄" };

  public MatchDataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void run(String... args) throws Exception {
    // Cleanup old dummy data (user_health_1 etc.)
    List<User> oldUsers = userRepository.findAll();
    for (User u : oldUsers) {
      if (u.getUsername().startsWith("user_")) {
        userRepository.delete(u);
      }
    }

    // Check count after cleanup
    if (userRepository.count() > 50) {
      return;
    }

    for (String category : CATEGORIES) {
      for (int i = 1; i <= 9; i++) {
        boolean isMale = random.nextBoolean();
        String koreanName = getRandomName(isMale);

        // Ensure uniqueness by appending a random digit
        String uniqueUsername = koreanName + (random.nextInt(90) + 10); // e.g. 김영수45

        if (userRepository.findByUsername(uniqueUsername).isPresent()) {
          continue;
        }

        User user = new User();
        user.setUsername(uniqueUsername);
        user.setPassword(passwordEncoder.encode("password"));
        user.setEmail("user" + random.nextInt(100000) + "@example.com");
        user.setGender(isMale ? "남성" : "여성");
        user.setLocation(LOCATIONS[random.nextInt(LOCATIONS.length)]);

        // Random age 60-75
        int age = 60 + random.nextInt(16);
        int year = LocalDate.now().getYear() - age;
        user.setBirthDate(year + "-01-01");

        user.setInterests(String.join(",", getRandomInterests(category)));
        user.setRole("USER");

        userRepository.save(user);
      }
    }
    System.out.println("Match dummy data created with realistic Korean names!");
  }

  private String getRandomName(boolean isMale) {
    String[] pool = isMale ? MALE_NAMES : FEMALE_NAMES;
    return pool[random.nextInt(pool.length)];
  }

  private List<String> getRandomInterests(String category) {
    String[] pool;
    switch (category) {
      case "운동/건강":
        pool = HEALTH_INTERESTS;
        break;
      case "문화/예술":
        pool = CULTURE_INTERESTS;
        break;
      case "여행":
        pool = TRAVEL_INTERESTS;
        break;
      case "봉사활동":
        pool = VOLUNTEER_INTERESTS;
        break;
      default:
        pool = new String[] {};
    }

    // Pick 2-3 random interests
    int count = 2 + random.nextInt(2);
    List<String> list = Arrays.asList(pool);
    // Shuffle (simple way)
    java.util.Collections.shuffle(list);
    return list.subList(0, Math.min(count, list.size()));
  }
}
