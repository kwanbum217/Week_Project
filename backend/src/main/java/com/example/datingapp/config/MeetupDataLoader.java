package com.example.datingapp.config;

import com.example.datingapp.model.Meetup;
import com.example.datingapp.model.MeetupCategory;
import com.example.datingapp.repository.MeetupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MeetupDataLoader implements CommandLineRunner {

    private final MeetupRepository meetupRepository;

    public MeetupDataLoader(MeetupRepository meetupRepository) {
        this.meetupRepository = meetupRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (meetupRepository.count() > 0) {
            return;
        }

        meetupRepository.save(Meetup.builder()
                .title("제1회 주말 등산 모임").creatorUsername("admin").creatorNickname("Admin").creatorPhone("010-1234-5678")
                .description("함께 주말 등산을 즐겨요!").location("서울 북한산 입구")
                .date("2024년 5월 4일").members(15).maxMembers(20)
                .cost("10,000원").transport("대중교통").startTime("09:00").endTime("13:00")
                .image("/img/hiking_meetup.png").tags("등산,건강").supplies("등산화")
                .category(MeetupCategory.EXERCISE_HEALTH).build());

        meetupRepository.save(Meetup.builder()
                .title("2030 독서 토론").creatorUsername("admin").creatorNickname("Admin").creatorPhone("010-1234-5678")
                .description("월간 독서 토론 모임").location("강남역 3번 출구 카페")
                .date("2024년 5월 5일").members(8).maxMembers(10)
                .cost("15,000원").transport("주차 가능").startTime("15:00").endTime("17:00")
                .image("/img/book_club_meetup.png").tags("독서,토론").supplies("책")
                .category(MeetupCategory.CULTURE_ART).build());

        meetupRepository.save(Meetup.builder()
                .title("홍대 맛집 탐방 3기").creatorUsername("admin").creatorNickname("Admin").creatorPhone("010-1234-5678")
                .description("숨은 맛집을 탐방해요").location("홍대입구역 9번 출구")
                .date("2024년 5월 10일").members(12).maxMembers(20)
                .cost("30,000원").transport("지하철").startTime("19:00").endTime("21:30")
                .image("/img/gourmet_meetup.png").tags("맛집,투어").supplies("식욕")
                .category(MeetupCategory.TRAVEL).build());

        meetupRepository.save(Meetup.builder()
                .title("제5차 봉사 활동").creatorUsername("admin").creatorNickname("Admin").creatorPhone("010-1234-5678")
                .description("지역 환경 정화 봉사").location("서울 숲 공원").date("2024년 5월 11일")
                .members(18).maxMembers(25).cost("0원").transport("현지 집합")
                .startTime("09:00").endTime("12:00").image("/img/neighborhood_walk.png")
                .tags("봉사,지역사회").supplies("장갑")
                .category(MeetupCategory.VOLUNTEER).build());

        System.out.println("모임 샘플 데이터가 생성되었습니다!");
    }
}
