package com.example.datingapp.config;

import com.example.datingapp.model.Meetup;
import com.example.datingapp.model.MeetupCategory;
import com.example.datingapp.repository.MeetupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * 모임 더미 데이터 로더
 * 앱 시작 시 카테고리별 9개씩 총 36개의 더미 데이터 생성
 */
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

    // 운동/건강 카테고리 (9개)
    meetupRepository.save(
        new Meetup(null, "주말 등산 모임", "함께 관악산 등산하실 분 구합니다. 초보자 환영!", "서울 관악구", "매주 토요일", 15, 20, "참가비 무료", "대중교통 권장",
            "09:00", "13:00", "/img/hiking_meetup.png", "등산,건강,친목", "등산화, 물, 간식", MeetupCategory.EXERCISE_HEALTH));
    meetupRepository
        .save(new Meetup(null, "동네 산책 모임", "저녁 드시고 가볍게 산책해요.", "서울 마포구", "매일 저녁 8시", 12, 15, "참가비 무료", "망원한강공원",
            "20:00", "21:30", "/img/neighborhood_walk.png", "산책,운동,동네", "운동화, 물", MeetupCategory.EXERCISE_HEALTH));
    meetupRepository
        .save(new Meetup(null, "아침 수영 클럽", "매일 아침 수영으로 하루를 시작해요!", "서울 송파구", "매일 오전 6시", 8, 12, "수영장 입장료 별도", "잠실수영장",
            "06:00", "07:30", "/img/friend_cycling.png", "수영,건강,아침", "수영복, 수경, 수모", MeetupCategory.EXERCISE_HEALTH));
    meetupRepository.save(new Meetup(null, "테니스 동호회", "주말 테니스 함께 쳐요!", "서울 강남구", "매주 일요일", 10, 16, "코트비 1/N", "강남테니스장",
        "10:00", "12:00", "/img/friend_chess.png", "테니스,운동,주말", "테니스 라켓, 운동화", MeetupCategory.EXERCISE_HEALTH));
    meetupRepository
        .save(new Meetup(null, "요가 명상 모임", "몸과 마음의 평화를 찾아요.", "서울 서초구", "매주 수요일", 6, 10, "회비 10,000원", "서초요가원", "19:00",
            "20:30", "/img/friend_dancing.png", "요가,명상,힐링", "요가매트, 편한 복장", MeetupCategory.EXERCISE_HEALTH));
    meetupRepository.save(new Meetup(null, "배드민턴 클럽", "초보부터 고수까지 함께해요!", "서울 노원구", "매주 토요일", 14, 20, "코트비 1/N", "노원체육관",
        "14:00", "17:00", "/img/friend_hiking.png", "배드민턴,운동,친목", "라켓, 운동화, 물", MeetupCategory.EXERCISE_HEALTH));
    meetupRepository.save(new Meetup(null, "자전거 라이딩", "한강을 따라 달려요!", "서울 영등포구", "격주 일요일", 18, 25, "참가비 무료", "여의도한강공원",
        "08:00", "12:00", "/img/friend_cycling.png", "자전거,라이딩,한강", "자전거, 헬멧, 물", MeetupCategory.EXERCISE_HEALTH));
    meetupRepository.save(new Meetup(null, "스크린 골프 모임", "부담 없이 골프 연습해요.", "서울 강서구", "매주 금요일", 7, 8, "이용료 각자", "강서스크린골프",
        "19:30", "22:00", "/img/friend_chess.png", "골프,스크린,불금", "편한 복장", MeetupCategory.EXERCISE_HEALTH));
    meetupRepository
        .save(new Meetup(null, "탁구 동호회", "가볍게 탁구 치러 오세요!", "서울 성북구", "매주 화/목", 9, 12, "참가비 5,000원", "성북구민체육관", "18:30",
            "20:30", "/img/friend_dancing.png", "탁구,운동,저녁", "라켓(대여 가능)", MeetupCategory.EXERCISE_HEALTH));

    // 문화/예술 카테고리 (9개)
    meetupRepository.save(new Meetup(null, "강남 독서 토론", "한 달에 한 권, 깊이 있는 대화를 나눕니다.", "서울 강남구", "매월 첫째 주 일요일", 8, 10,
        "카페비 각자", "주차 가능 (2시간 무료)", "15:00", "17:00", "/img/book_club_meetup.png", "독서,토론,교양", "이달의 선정 도서, 필기도구",
        MeetupCategory.CULTURE_ART));
    meetupRepository
        .save(new Meetup(null, "클래식 음악 감상", "다같이 모여서 클래식 명곡을 감상해요.", "서울 서초구", "격주 일요일", 6, 8, "티켓비 실비", "남부터미널역 5분",
            "14:00", "16:30", "/img/classic_music_meetup.png", "음악,클래식,힐링", "편안한 복장", MeetupCategory.CULTURE_ART));
    meetupRepository.save(new Meetup(null, "영화 감상 모임", "명작 영화 함께 보고 토론해요.", "서울 종로구", "매주 금요일", 11, 15, "영화 티켓비 각자",
        "종로CGV", "19:00", "22:00", "/img/photo_meetup.png", "영화,감상,불금", "열린 마음", MeetupCategory.CULTURE_ART));
    meetupRepository.save(new Meetup(null, "미술관 탐방", "서울의 다양한 미술관을 함께 탐방해요.", "서울 종로구", "격주 토요일", 7, 12, "입장료 각자",
        "해당 미술관", "13:00", "16:00", "/img/book_club_meetup.png", "미술,문화,전시", "편한 신발", MeetupCategory.CULTURE_ART));
    meetupRepository.save(new Meetup(null, "사진 촬영 출사", "풍경 사진 찍으러 같이 가요.", "서울 전체", "비정기적", 24, 30, "회비 10,000원",
        "카풀 가능", "13:00", "18:00", "/img/photo_meetup.png", "사진,예술,여행", "개인 카메라, 삼각대(선택)", MeetupCategory.CULTURE_ART));
    meetupRepository.save(new Meetup(null, "서예 동아리", "붓글씨의 멋을 함께 느껴요.", "서울 중구", "매주 수요일", 5, 8, "재료비 10,000원", "중구문화원",
        "10:00", "12:00", "/img/classic_music_meetup.png", "서예,전통,예술", "서예 도구(제공 가능)", MeetupCategory.CULTURE_ART));
    meetupRepository.save(new Meetup(null, "연극 관람 모임", "좋은 연극을 함께 관람해요.", "서울 대학로", "월 1회", 9, 12, "티켓비 실비", "대학로역",
        "16:00", "19:00", "/img/book_club_meetup.png", "연극,문화,관람", "편안한 마음", MeetupCategory.CULTURE_ART));
    meetupRepository
        .save(new Meetup(null, "뮤지컬 덕후 모임", "뮤지컬을 사랑하는 분들 모여요!", "서울 용산구", "비정기적", 13, 20, "티켓비 각자", "블루스퀘어", "14:00",
            "17:00", "/img/classic_music_meetup.png", "뮤지컬,음악,관람", "티켓 사전 예매", MeetupCategory.CULTURE_ART));
    meetupRepository.save(new Meetup(null, "콘서트 함께 가요", "좋아하는 가수 콘서트 같이 가요!", "서울 송파구", "비정기적", 16, 20, "티켓비 각자",
        "잠실종합운동장", "18:00", "22:00", "/img/photo_meetup.png", "콘서트,음악,팬", "응원봉, 팬심", MeetupCategory.CULTURE_ART));

    // 여행 카테고리 (9개)
    meetupRepository.save(new Meetup(null, "국내 여행 동호회", "매달 한 곳, 국내 여행을 떠나요.", "서울 출발", "월 1회", 20, 25, "실비 정산", "서울역",
        "08:00", "20:00", "/img/hiking_meetup.png", "여행,국내,탐방", "여행 가방, 카메라", MeetupCategory.TRAVEL));
    meetupRepository.save(new Meetup(null, "해외 여행 클럽", "함께 해외여행 계획하고 떠나요!", "서울 출발", "분기 1회", 12, 15, "항공/숙박 별도",
        "인천공항", "미정", "미정", "/img/photo_meetup.png", "여행,해외,탐험", "여권, 여행자 보험", MeetupCategory.TRAVEL));
    meetupRepository.save(new Meetup(null, "당일치기 여행", "가볍게 근교로 당일치기!", "서울 출발", "격주 토요일", 15, 20, "교통비 1/N", "서울역",
        "09:00", "19:00", "/img/neighborhood_walk.png", "당일치기,근교,힐링", "편한 복장, 간식", MeetupCategory.TRAVEL));
    meetupRepository.save(new Meetup(null, "캠핑 동호회", "자연 속에서 힐링 캠핑!", "경기도 일대", "월 1-2회", 10, 12, "캠핑장 비용 1/N", "현지 집결",
        "14:00", "다음날 12:00", "/img/hiking_meetup.png", "캠핑,자연,힐링", "캠핑 장비(렌탈 가능)", MeetupCategory.TRAVEL));
    meetupRepository.save(new Meetup(null, "맛집 탐방대", "숨겨진 맛집을 찾아 떠나는 미식 여행!", "서울 홍대/합정", "매주 금요일", 12, 20, "식비 1/N",
        "홍대입구역 3번 출구", "19:00", "21:30", "/img/gourmet_meetup.png", "맛집,먹방,불금", "즐거운 마음, 회비", MeetupCategory.TRAVEL));
    meetupRepository.save(new Meetup(null, "드라이브 모임", "좋은 음악과 함께 드라이브!", "서울 출발", "비정기적", 6, 8, "기름값 1/N", "장소 협의",
        "10:00", "18:00", "/img/friend_cycling.png", "드라이브,힐링,음악", "운전면허(차량 소유자)", MeetupCategory.TRAVEL));
    meetupRepository.save(new Meetup(null, "템플스테이 체험", "사찰에서 마음의 평화를 찾아요.", "서울 근교", "월 1회", 8, 10, "템플스테이 비용", "현지 집결",
        "토요일 14:00", "일요일 12:00", "/img/classic_music_meetup.png", "템플스테이,명상,힐링", "편한 복장", MeetupCategory.TRAVEL));
    meetupRepository.save(new Meetup(null, "기차 여행 모임", "느린 기차 타고 떠나는 여행!", "서울역 출발", "월 1회", 14, 18, "기차표 각자", "서울역",
        "08:00", "20:00", "/img/neighborhood_walk.png", "기차,여행,낭만", "도시락, 카메라", MeetupCategory.TRAVEL));
    meetupRepository.save(new Meetup(null, "섬 여행 동호회", "아름다운 섬으로 떠나요!", "인천/목포 출발", "분기 1회", 11, 15, "배표/숙박 별도",
        "항구 집결", "07:00", "다음날", "/img/photo_meetup.png", "섬여행,바다,자연", "멀미약, 카메라", MeetupCategory.TRAVEL));

    // 봉사활동 카테고리 (9개)
    meetupRepository.save(new Meetup(null, "환경 정화 봉사", "우리 동네 환경을 깨끗이!", "서울 전역", "매주 토요일", 18, 25, "참가비 무료", "해당 지역",
        "09:00", "12:00", "/img/neighborhood_walk.png", "환경,봉사,지역사회", "장갑(제공), 편한 복장", MeetupCategory.VOLUNTEER));
    meetupRepository.save(new Meetup(null, "노인 돌봄 봉사", "어르신들의 말벗이 되어드려요.", "서울 종로구", "매주 수요일", 7, 10, "참가비 무료",
        "종로노인복지관", "13:00", "16:00", "/img/book_club_meetup.png", "봉사,노인,돌봄", "따뜻한 마음", MeetupCategory.VOLUNTEER));
    meetupRepository.save(new Meetup(null, "아동 교육 봉사", "아이들에게 공부를 가르쳐요.", "서울 관악구", "매주 토요일", 10, 15, "참가비 무료",
        "관악지역아동센터", "14:00", "17:00", "/img/friend_chess.png", "교육,봉사,아동", "교재(제공)", MeetupCategory.VOLUNTEER));
    meetupRepository.save(new Meetup(null, "유기견 봉사", "유기견들의 친구가 되어주세요.", "경기 남양주", "격주 일요일", 12, 15, "참가비 무료", "남양주보호소",
        "10:00", "14:00", "/img/friend_hiking.png", "동물,봉사,유기견", "편한 복장, 장갑", MeetupCategory.VOLUNTEER));
    meetupRepository.save(new Meetup(null, "무료 급식 봉사", "따뜻한 밥 한 끼를 나눠요.", "서울 영등포구", "매주 일요일", 15, 20, "참가비 무료",
        "영등포역 무료급식소", "10:00", "13:00", "/img/gourmet_meetup.png", "급식,봉사,나눔", "앞치마(제공)", MeetupCategory.VOLUNTEER));
    meetupRepository.save(new Meetup(null, "재능 기부 모임", "나의 재능을 나눠요!", "서울 전역", "비정기적", 8, 12, "참가비 무료", "해당 기관",
        "시간 협의", "시간 협의", "/img/classic_music_meetup.png", "재능기부,봉사,나눔", "각자의 재능", MeetupCategory.VOLUNTEER));
    meetupRepository.save(new Meetup(null, "헌혈 캠페인", "생명 나눔 헌혈에 동참해요!", "서울 광화문", "월 1회", 20, 30, "참가비 무료", "광화문헌혈원",
        "10:00", "17:00", "/img/neighborhood_walk.png", "헌혈,봉사,생명나눔", "신분증, 건강한 몸", MeetupCategory.VOLUNTEER));
    meetupRepository.save(new Meetup(null, "장애인 돕기 봉사", "장애인 분들의 외출을 도와드려요.", "서울 성동구", "매주 토요일", 6, 8, "참가비 무료",
        "성동장애인복지관", "09:00", "13:00", "/img/friend_dancing.png", "봉사,장애인,돌봄", "봉사자 교육 필수", MeetupCategory.VOLUNTEER));
    meetupRepository.save(new Meetup(null, "지역사회 봉사단", "우리 마을을 더 좋게 만들어요!", "서울 동작구", "매주 토요일", 14, 20, "참가비 무료",
        "동작구청", "09:00", "12:00", "/img/hiking_meetup.png", "지역사회,봉사,마을", "편한 복장, 봉사 정신", MeetupCategory.VOLUNTEER));

    System.out.println("Meetup 더미 데이터 36개 생성 완료!");
  }
}
