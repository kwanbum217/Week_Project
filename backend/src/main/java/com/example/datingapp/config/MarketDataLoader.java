package com.example.datingapp.config;

import com.example.datingapp.model.MarketItem;
import com.example.datingapp.model.MarketCategory;
import com.example.datingapp.repository.MarketItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * 마켓 상품 더미 데이터 로더
 * 카테고리별 이미지 매핑으로 관련 이미지 표시
 */
@Component
@Order(2)
public class MarketDataLoader implements CommandLineRunner {

        private final MarketItemRepository marketItemRepository;

        // 카테고리별 이미지 배열
        private static final String[] DIGITAL_IMAGES = { "/img/market_ipad_air.png", "/img/market_galaxy_buds.png",
                        "/img/market_canon_dslr.png" };
        private static final String[] APPLIANCE_IMAGES = { "/img/market_air_purifier.png",
                        "/img/market_robot_vacuum.png", "/img/market_heated_mat.png" };
        private static final String[] FURNITURE_IMAGES = { "/img/market_comfy_sofa.png",
                        "/img/market_antique_cabinet.png", "/img/market_stand_light.png" };
        private static final String[] KITCHEN_IMAGES = { "/img/market_iron_pot.png", "/img/market_tea_set.png",
                        "/img/market_cutting_board.png" };
        private static final String[] CLOTHING_IMAGES = { "/img/market_comfy_sofa.png", "/img/market_stand_light.png",
                        "/img/market_antique_cabinet.png" };
        private static final String[] SHOES_IMAGES = { "/img/market_comfy_sofa.png", "/img/market_cutting_board.png",
                        "/img/market_antique_cabinet.png" };
        private static final String[] BEAUTY_IMAGES = { "/img/market_tea_set.png", "/img/market_air_purifier.png",
                        "/img/market_stand_light.png" };
        private static final String[] SPORTS_IMAGES = { "/img/market_robot_vacuum.png", "/img/market_canon_dslr.png",
                        "/img/market_air_purifier.png" };
        private static final String[] HOBBY_IMAGES = { "/img/market_ipad_air.png", "/img/market_canon_dslr.png",
                        "/img/market_galaxy_buds.png" };
        private static final String[] BOOK_IMAGES = { "/img/market_antique_cabinet.png", "/img/market_tea_set.png",
                        "/img/market_stand_light.png" };
        private static final String[] PLANT_IMAGES = { "/img/market_air_purifier.png", "/img/market_tea_set.png",
                        "/img/market_stand_light.png" };
        private static final String[] PET_IMAGES = { "/img/market_comfy_sofa.png", "/img/market_robot_vacuum.png",
                        "/img/market_tea_set.png" };
        private static final String[] TICKET_IMAGES = { "/img/market_ipad_air.png", "/img/market_tea_set.png",
                        "/img/market_antique_cabinet.png" };
        private static final String[] ETC_IMAGES = { "/img/market_comfy_sofa.png", "/img/market_iron_pot.png",
                        "/img/market_robot_vacuum.png" };

        public MarketDataLoader(MarketItemRepository marketItemRepository) {
                this.marketItemRepository = marketItemRepository;
        }

        // 카테고리와 인덱스에 따른 이미지 반환
        private String getImage(MarketCategory category, int index) {
                String[] images;
                switch (category) {
                        case DIGITAL:
                                images = DIGITAL_IMAGES;
                                break;
                        case APPLIANCE:
                                images = APPLIANCE_IMAGES;
                                break;
                        case FURNITURE:
                                images = FURNITURE_IMAGES;
                                break;
                        case KITCHEN:
                                images = KITCHEN_IMAGES;
                                break;
                        case WOMEN_CLOTHING:
                        case MEN_CLOTHING:
                                images = CLOTHING_IMAGES;
                                break;
                        case SHOES:
                                images = SHOES_IMAGES;
                                break;
                        case BEAUTY:
                                images = BEAUTY_IMAGES;
                                break;
                        case SPORTS:
                                images = SPORTS_IMAGES;
                                break;
                        case HOBBY:
                                images = HOBBY_IMAGES;
                                break;
                        case BOOK:
                                images = BOOK_IMAGES;
                                break;
                        case PLANT:
                                images = PLANT_IMAGES;
                                break;
                        case PET:
                                images = PET_IMAGES;
                                break;
                        case TICKET:
                                images = TICKET_IMAGES;
                                break;
                        default:
                                images = ETC_IMAGES;
                                break;
                }
                return images[index % images.length];
        }

        @Override
        public void run(String... args) throws Exception {
                // 데이터가 128개 미만이면 삭제 후 재생성
                if (marketItemRepository.count() >= 128) {
                        return;
                }
                marketItemRepository.deleteAll();

                int idx;

                // 디지털기기 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "갤럭시 탭 S7", "400,000원", "반포동",
                                getImage(MarketCategory.DIGITAL, idx++), 25, 5, MarketCategory.DIGITAL,
                                "깨끗하게 사용한 탭입니다.", "1년 2개월"));
                marketItemRepository.save(new MarketItem(null, "아이패드 에어 4세대", "550,000원", "역삼동",
                                getImage(MarketCategory.DIGITAL, idx++), 18, 3, MarketCategory.DIGITAL, "기스 없는 S급입니다.",
                                "6개월"));
                marketItemRepository.save(new MarketItem(null, "무선 이어폰 버즈 프로", "90,000원", "잠실동",
                                getImage(MarketCategory.DIGITAL, idx++), 12, 2, MarketCategory.DIGITAL, "음질 좋은 버즈 프로.",
                                "1년"));
                marketItemRepository.save(new MarketItem(null, "캐논 DSLR 카메라", "650,000원", "서초동",
                                getImage(MarketCategory.DIGITAL, idx++), 30, 8, MarketCategory.DIGITAL, "입문용 DSLR입니다.",
                                "2년"));
                marketItemRepository.save(new MarketItem(null, "애플워치 SE 2세대", "200,000원", "강남동",
                                getImage(MarketCategory.DIGITAL, idx++), 22, 4, MarketCategory.DIGITAL, "배터리 95%.",
                                "8개월"));
                marketItemRepository.save(new MarketItem(null, "닌텐도 스위치 OLED", "320,000원", "송파동",
                                getImage(MarketCategory.DIGITAL, idx++), 35, 10, MarketCategory.DIGITAL, "게임 3개 포함.",
                                "1년"));
                marketItemRepository.save(new MarketItem(null, "LG 그램 노트북", "850,000원", "마포동",
                                getImage(MarketCategory.DIGITAL, idx++), 28, 6, MarketCategory.DIGITAL, "가벼운 노트북.",
                                "2년"));
                marketItemRepository.save(new MarketItem(null, "삼성 갤럭시 버즈2", "70,000원", "종로동",
                                getImage(MarketCategory.DIGITAL, idx++), 15, 2, MarketCategory.DIGITAL, "케이스 포함.",
                                "1년 6개월"));

                // 생활가전 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "안마의자 상태 최상", "350,000원", "역삼동",
                                getImage(MarketCategory.APPLIANCE, idx++), 45, 12, MarketCategory.APPLIANCE,
                                "이사 때문에 판매.", "2년"));
                marketItemRepository.save(new MarketItem(null, "공기청정기", "120,000원", "방배동",
                                getImage(MarketCategory.APPLIANCE, idx++), 22, 4, MarketCategory.APPLIANCE, "필터 교체 완료.",
                                "1년 6개월"));
                marketItemRepository.save(new MarketItem(null, "로봇청소기", "200,000원", "논현동",
                                getImage(MarketCategory.APPLIANCE, idx++), 28, 6, MarketCategory.APPLIANCE, "맞벌이 필수템.",
                                "1년"));
                marketItemRepository.save(new MarketItem(null, "미사용 온수매트", "50,000원", "천호동",
                                getImage(MarketCategory.APPLIANCE, idx++), 15, 2, MarketCategory.APPLIANCE, "겨울철 필수.",
                                "미사용"));
                marketItemRepository.save(new MarketItem(null, "다이슨 무선청소기", "280,000원", "신림동",
                                getImage(MarketCategory.APPLIANCE, idx++), 33, 7, MarketCategory.APPLIANCE,
                                "배터리 교체 완료.", "2년"));
                marketItemRepository.save(new MarketItem(null, "LG 제습기", "150,000원", "용산동",
                                getImage(MarketCategory.APPLIANCE, idx++), 20, 3, MarketCategory.APPLIANCE, "여름철 필수템!",
                                "1년"));
                marketItemRepository.save(new MarketItem(null, "전기압력밥솥 10인용", "80,000원", "광진동",
                                getImage(MarketCategory.APPLIANCE, idx++), 18, 4, MarketCategory.APPLIANCE, "대가족용.",
                                "3년"));
                marketItemRepository.save(new MarketItem(null, "에어프라이어 대용량", "60,000원", "성북동",
                                getImage(MarketCategory.APPLIANCE, idx++), 25, 5, MarketCategory.APPLIANCE, "기름 없이 바삭!",
                                "1년"));

                // 가구/인테리어 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "원목 4인 식탁", "150,000원", "압구정동",
                                getImage(MarketCategory.FURNITURE, idx++), 35, 9, MarketCategory.FURNITURE, "튼튼한 원목.",
                                "3년"));
                marketItemRepository.save(new MarketItem(null, "1인용 소파", "80,000원", "청담동",
                                getImage(MarketCategory.FURNITURE, idx++), 20, 5, MarketCategory.FURNITURE, "편안한 소파.",
                                "1년"));
                marketItemRepository.save(new MarketItem(null, "엔틱 거실장", "250,000원", "삼성동",
                                getImage(MarketCategory.FURNITURE, idx++), 18, 3, MarketCategory.FURNITURE, "엔틱 분위기.",
                                "5년"));
                marketItemRepository.save(new MarketItem(null, "스탠드 조명", "30,000원", "도곡동",
                                getImage(MarketCategory.FURNITURE, idx++), 12, 1, MarketCategory.FURNITURE, "침실용 조명.",
                                "6개월"));
                marketItemRepository.save(new MarketItem(null, "책상+의자 세트", "100,000원", "목동",
                                getImage(MarketCategory.FURNITURE, idx++), 27, 6, MarketCategory.FURNITURE, "재택근무용.",
                                "2년"));
                marketItemRepository.save(new MarketItem(null, "퀸사이즈 침대", "180,000원", "영등포동",
                                getImage(MarketCategory.FURNITURE, idx++), 22, 4, MarketCategory.FURNITURE, "프레임만.",
                                "4년"));
                marketItemRepository.save(new MarketItem(null, "행거형 옷장", "70,000원", "서대문동",
                                getImage(MarketCategory.FURNITURE, idx++), 16, 2, MarketCategory.FURNITURE, "옷 많은 분께.",
                                "1년"));
                marketItemRepository.save(new MarketItem(null, "LED 천장 조명", "40,000원", "동작동",
                                getImage(MarketCategory.FURNITURE, idx++), 14, 2, MarketCategory.FURNITURE, "거실용.",
                                "8개월"));

                // 생활/주방 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "김장 김치 10kg", "80,000원", "구미동",
                                getImage(MarketCategory.KITCHEN, idx++), 50, 15, MarketCategory.KITCHEN, "직접 담근 김치.",
                                "오늘 담금"));
                marketItemRepository.save(new MarketItem(null, "고급 찻잔 세트", "40,000원", "판교동",
                                getImage(MarketCategory.KITCHEN, idx++), 25, 4, MarketCategory.KITCHEN, "선물용.", "미사용"));
                marketItemRepository.save(new MarketItem(null, "무쇠 솥", "100,000원", "이태원동",
                                getImage(MarketCategory.KITCHEN, idx++), 33, 7, MarketCategory.KITCHEN, "밥맛 좋은 솥.",
                                "미사용"));
                marketItemRepository.save(
                                new MarketItem(null, "수제 도마", "35,000원", "한남동", getImage(MarketCategory.KITCHEN, idx++),
                                                19, 2, MarketCategory.KITCHEN, "수제 나무 도마.", "새상품"));
                marketItemRepository.save(new MarketItem(null, "스테인리스 냄비 세트", "60,000원", "강서동",
                                getImage(MarketCategory.KITCHEN, idx++), 21, 3, MarketCategory.KITCHEN, "인덕션 가능.",
                                "2년"));
                marketItemRepository.save(new MarketItem(null, "유리 밀폐용기 10개", "25,000원", "금천동",
                                getImage(MarketCategory.KITCHEN, idx++), 17, 2, MarketCategory.KITCHEN, "반찬통.", "새상품"));
                marketItemRepository.save(new MarketItem(null, "커피 드리퍼 세트", "45,000원", "중랑동",
                                getImage(MarketCategory.KITCHEN, idx++), 24, 5, MarketCategory.KITCHEN, "핸드드립용.",
                                "6개월"));
                marketItemRepository.save(new MarketItem(null, "에어프라이어 용기", "15,000원", "노원동",
                                getImage(MarketCategory.KITCHEN, idx++), 13, 1, MarketCategory.KITCHEN, "전용 용기.",
                                "미사용"));

                // 여성의류 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "캐시미어 코트", "150,000원", "청담동",
                                getImage(MarketCategory.WOMEN_CLOTHING, idx++), 38, 9, MarketCategory.WOMEN_CLOTHING,
                                "고급 캐시미어.", "1년"));
                marketItemRepository.save(new MarketItem(null, "원피스 드레스", "45,000원", "압구정동",
                                getImage(MarketCategory.WOMEN_CLOTHING, idx++), 22, 4, MarketCategory.WOMEN_CLOTHING,
                                "파티용 드레스.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "실크 블라우스", "35,000원", "강남동",
                                getImage(MarketCategory.WOMEN_CLOTHING, idx++), 18, 3, MarketCategory.WOMEN_CLOTHING,
                                "부드러운 실크.", "1년"));
                marketItemRepository.save(new MarketItem(null, "청바지 세트", "50,000원", "홍대동",
                                getImage(MarketCategory.WOMEN_CLOTHING, idx++), 25, 5, MarketCategory.WOMEN_CLOTHING,
                                "3벌 묶음.", "새상품"));
                marketItemRepository.save(new MarketItem(null, "니트 가디건", "28,000원", "신촌동",
                                getImage(MarketCategory.WOMEN_CLOTHING, idx++), 15, 2, MarketCategory.WOMEN_CLOTHING,
                                "따뜻한 니트.", "8개월"));
                marketItemRepository.save(new MarketItem(null, "패딩 점퍼", "80,000원", "잠실동",
                                getImage(MarketCategory.WOMEN_CLOTHING, idx++), 30, 6, MarketCategory.WOMEN_CLOTHING,
                                "경량 패딩.", "2년"));
                marketItemRepository.save(new MarketItem(null, "정장 세트", "120,000원", "여의도동",
                                getImage(MarketCategory.WOMEN_CLOTHING, idx++), 20, 3, MarketCategory.WOMEN_CLOTHING,
                                "면접용.", "1년"));
                marketItemRepository.save(new MarketItem(null, "운동복 세트", "40,000원", "송파동",
                                getImage(MarketCategory.WOMEN_CLOTHING, idx++), 16, 2, MarketCategory.WOMEN_CLOTHING,
                                "요가복.", "미사용"));

                // 남성의류 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "정장 수트", "200,000원", "강남동",
                                getImage(MarketCategory.MEN_CLOTHING, idx++), 32, 8, MarketCategory.MEN_CLOTHING,
                                "고급 정장.", "1년"));
                marketItemRepository.save(new MarketItem(null, "캐주얼 셔츠 5벌", "60,000원", "홍대동",
                                getImage(MarketCategory.MEN_CLOTHING, idx++), 25, 5, MarketCategory.MEN_CLOTHING,
                                "데일리 셔츠.", "새상품"));
                marketItemRepository.save(new MarketItem(null, "겨울 패딩", "150,000원", "신림동",
                                getImage(MarketCategory.MEN_CLOTHING, idx++), 28, 6, MarketCategory.MEN_CLOTHING,
                                "따뜻한 롱패딩.", "2년"));
                marketItemRepository.save(new MarketItem(null, "청바지", "35,000원", "건대동",
                                getImage(MarketCategory.MEN_CLOTHING, idx++), 18, 3, MarketCategory.MEN_CLOTHING,
                                "슬림핏.", "1년"));
                marketItemRepository.save(new MarketItem(null, "가죽 자켓", "180,000원", "이태원동",
                                getImage(MarketCategory.MEN_CLOTHING, idx++), 35, 7, MarketCategory.MEN_CLOTHING,
                                "리얼 가죽.", "3년"));
                marketItemRepository.save(new MarketItem(null, "캐시미어 니트", "70,000원", "서초동",
                                getImage(MarketCategory.MEN_CLOTHING, idx++), 22, 4, MarketCategory.MEN_CLOTHING,
                                "고급 니트.", "1년"));
                marketItemRepository.save(new MarketItem(null, "운동복 세트", "45,000원", "목동",
                                getImage(MarketCategory.MEN_CLOTHING, idx++), 15, 2, MarketCategory.MEN_CLOTHING,
                                "헬스용.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "넥타이 10개", "30,000원", "여의도동",
                                getImage(MarketCategory.MEN_CLOTHING, idx++), 12, 1, MarketCategory.MEN_CLOTHING,
                                "다양한 패턴.", "미사용"));

                // 신발/잡화 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "나이키 운동화", "80,000원", "강남동",
                                getImage(MarketCategory.SHOES, idx++), 35, 8, MarketCategory.SHOES, "에어맥스.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "구두 (정장용)", "60,000원", "서초동",
                                getImage(MarketCategory.SHOES, idx++), 22, 4, MarketCategory.SHOES, "가죽 구두.", "1년"));
                marketItemRepository.save(new MarketItem(null, "명품 가방", "350,000원", "청담동",
                                getImage(MarketCategory.SHOES, idx++), 45, 12, MarketCategory.SHOES, "프라다 백.", "2년"));
                marketItemRepository.save(new MarketItem(null, "가죽 지갑", "50,000원", "압구정동",
                                getImage(MarketCategory.SHOES, idx++), 18, 3, MarketCategory.SHOES, "남성용 장지갑.", "1년"));
                marketItemRepository.save(
                                new MarketItem(null, "등산화", "70,000원", "송파동", getImage(MarketCategory.SHOES, idx++), 25,
                                                5, MarketCategory.SHOES, "노스페이스.", "1년 6개월"));
                marketItemRepository.save(new MarketItem(null, "슬리퍼 세트", "20,000원", "마포동",
                                getImage(MarketCategory.SHOES, idx++), 12, 1, MarketCategory.SHOES, "실내용 3켤레.", "새상품"));
                marketItemRepository.save(new MarketItem(null, "벨트 2개", "25,000원", "홍대동",
                                getImage(MarketCategory.SHOES, idx++), 14, 2, MarketCategory.SHOES, "정장/캐주얼.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "모자 컬렉션", "40,000원", "건대동",
                                getImage(MarketCategory.SHOES, idx++), 16, 2, MarketCategory.SHOES, "캡모자 5개.", "미사용"));

                // 뷰티/미용 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "스킨케어 세트", "80,000원", "청담동",
                                getImage(MarketCategory.BEAUTY, idx++), 40, 10, MarketCategory.BEAUTY, "고급 기초 세트.",
                                "미사용"));
                marketItemRepository.save(new MarketItem(null, "헤어 드라이기", "45,000원", "강남동",
                                getImage(MarketCategory.BEAUTY, idx++), 25, 5, MarketCategory.BEAUTY, "다이슨 스타일.",
                                "1년"));
                marketItemRepository.save(
                                new MarketItem(null, "고데기", "30,000원", "홍대동", getImage(MarketCategory.BEAUTY, idx++),
                                                18, 3, MarketCategory.BEAUTY, "온도조절 가능.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "화장품 파우치", "15,000원", "신촌동",
                                getImage(MarketCategory.BEAUTY, idx++), 12, 1, MarketCategory.BEAUTY, "여행용.", "새상품"));
                marketItemRepository.save(new MarketItem(null, "향수 세트", "100,000원", "압구정동",
                                getImage(MarketCategory.BEAUTY, idx++), 35, 8, MarketCategory.BEAUTY, "명품 향수.", "미사용"));
                marketItemRepository.save(new MarketItem(null, "네일 용품 세트", "25,000원", "이태원동",
                                getImage(MarketCategory.BEAUTY, idx++), 15, 2, MarketCategory.BEAUTY, "젤네일 풀세트.",
                                "1년"));
                marketItemRepository.save(new MarketItem(null, "마사지기", "50,000원", "서초동",
                                getImage(MarketCategory.BEAUTY, idx++), 22, 4, MarketCategory.BEAUTY, "어깨/목용.", "8개월"));
                marketItemRepository.save(new MarketItem(null, "면도기 (전동)", "40,000원", "송파동",
                                getImage(MarketCategory.BEAUTY, idx++), 20, 3, MarketCategory.BEAUTY, "필립스.", "1년"));

                // 스포츠/레저 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "골프채 풀세트", "500,000원", "강남동",
                                getImage(MarketCategory.SPORTS, idx++), 48, 15, MarketCategory.SPORTS, "타이틀리스트.",
                                "3년"));
                marketItemRepository.save(
                                new MarketItem(null, "자전거", "200,000원", "송파동", getImage(MarketCategory.SPORTS, idx++),
                                                35, 8, MarketCategory.SPORTS, "삼천리 하이브리드.", "2년"));
                marketItemRepository.save(new MarketItem(null, "텐트 (4인용)", "150,000원", "마포동",
                                getImage(MarketCategory.SPORTS, idx++), 28, 6, MarketCategory.SPORTS, "캠핑용.", "1년"));
                marketItemRepository.save(
                                new MarketItem(null, "요가 매트", "20,000원", "홍대동", getImage(MarketCategory.SPORTS, idx++),
                                                15, 2, MarketCategory.SPORTS, "두꺼운 타입.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "러닝화", "60,000원", "잠실동",
                                getImage(MarketCategory.SPORTS, idx++), 22, 4, MarketCategory.SPORTS, "아식스.", "1년"));
                marketItemRepository.save(
                                new MarketItem(null, "덤벨 세트", "80,000원", "서초동", getImage(MarketCategory.SPORTS, idx++),
                                                25, 5, MarketCategory.SPORTS, "5kg~15kg.", "새상품"));
                marketItemRepository.save(
                                new MarketItem(null, "수영 용품", "30,000원", "목동", getImage(MarketCategory.SPORTS, idx++),
                                                18, 3, MarketCategory.SPORTS, "고글+수영모.", "3개월"));
                marketItemRepository.save(new MarketItem(null, "스키 장비", "300,000원", "강서동",
                                getImage(MarketCategory.SPORTS, idx++), 32, 7, MarketCategory.SPORTS, "보드+부츠.", "2년"));

                // 취미/게임/음반 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "플레이스테이션 5", "450,000원", "송파동",
                                getImage(MarketCategory.HOBBY, idx++), 50, 18, MarketCategory.HOBBY, "디스크 에디션.", "1년"));
                marketItemRepository.save(new MarketItem(null, "LP 판 컬렉션", "100,000원", "홍대동",
                                getImage(MarketCategory.HOBBY, idx++), 30, 6, MarketCategory.HOBBY, "50장 묶음.", "10년"));
                marketItemRepository.save(new MarketItem(null, "레고 세트", "80,000원", "강남동",
                                getImage(MarketCategory.HOBBY, idx++), 25, 5, MarketCategory.HOBBY, "테크닉 시리즈.", "미개봉"));
                marketItemRepository.save(new MarketItem(null, "기타 (어쿠스틱)", "150,000원", "마포동",
                                getImage(MarketCategory.HOBBY, idx++), 28, 6, MarketCategory.HOBBY, "입문용.", "2년"));
                marketItemRepository.save(new MarketItem(null, "보드게임 세트", "40,000원", "신촌동",
                                getImage(MarketCategory.HOBBY, idx++), 18, 3, MarketCategory.HOBBY, "5종 묶음.", "1년"));
                marketItemRepository.save(new MarketItem(null, "퍼즐 1000피스", "15,000원", "건대동",
                                getImage(MarketCategory.HOBBY, idx++), 12, 1, MarketCategory.HOBBY, "미개봉.", "새상품"));
                marketItemRepository.save(new MarketItem(null, "드론", "200,000원", "서초동",
                                getImage(MarketCategory.HOBBY, idx++), 35, 8, MarketCategory.HOBBY, "DJI 미니.", "1년"));
                marketItemRepository.save(new MarketItem(null, "닌텐도 게임팩", "25,000원", "잠실동",
                                getImage(MarketCategory.HOBBY, idx++), 16, 2, MarketCategory.HOBBY, "젤다 전설.", "6개월"));

                // 도서 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "베스트셀러 세트", "50,000원", "종로동",
                                getImage(MarketCategory.BOOK, idx++), 28, 6, MarketCategory.BOOK, "10권 묶음.", "새책"));
                marketItemRepository.save(new MarketItem(null, "영어 원서", "30,000원", "신촌동",
                                getImage(MarketCategory.BOOK, idx++), 18, 3, MarketCategory.BOOK, "해리포터 시리즈.", "중고"));
                marketItemRepository.save(new MarketItem(null, "요리책 모음", "25,000원", "마포동",
                                getImage(MarketCategory.BOOK, idx++), 15, 2, MarketCategory.BOOK, "5권.", "1년"));
                marketItemRepository.save(new MarketItem(null, "자기계발서", "20,000원", "강남동",
                                getImage(MarketCategory.BOOK, idx++), 22, 4, MarketCategory.BOOK, "부의 법칙 외.", "미사용"));
                marketItemRepository.save(new MarketItem(null, "만화책 전집", "80,000원", "건대동",
                                getImage(MarketCategory.BOOK, idx++), 35, 8, MarketCategory.BOOK, "원피스 100권.", "중고"));
                marketItemRepository.save(new MarketItem(null, "어린이 동화책", "40,000원", "송파동",
                                getImage(MarketCategory.BOOK, idx++), 20, 3, MarketCategory.BOOK, "20권 세트.", "새책"));
                marketItemRepository.save(new MarketItem(null, "전문 서적", "60,000원", "서초동",
                                getImage(MarketCategory.BOOK, idx++), 12, 1, MarketCategory.BOOK, "프로그래밍.", "1년"));
                marketItemRepository.save(new MarketItem(null, "잡지 컬렉션", "15,000원", "홍대동",
                                getImage(MarketCategory.BOOK, idx++), 10, 1, MarketCategory.BOOK, "패션잡지 30권.", "6개월"));

                // 식물 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "몬스테라", "50,000원", "청담동",
                                getImage(MarketCategory.PLANT, idx++), 38, 9, MarketCategory.PLANT, "대형 몬스테라.", "2년"));
                marketItemRepository.save(new MarketItem(null, "다육이 세트", "20,000원", "홍대동",
                                getImage(MarketCategory.PLANT, idx++), 22, 4, MarketCategory.PLANT, "10개 묶음.", "1년"));
                marketItemRepository.save(
                                new MarketItem(null, "고무나무", "35,000원", "강남동", getImage(MarketCategory.PLANT, idx++),
                                                18, 3, MarketCategory.PLANT, "공기정화 식물.", "1년 6개월"));
                marketItemRepository.save(new MarketItem(null, "화분 세트", "30,000원", "마포동",
                                getImage(MarketCategory.PLANT, idx++), 15, 2, MarketCategory.PLANT, "테라코타 5개.", "새상품"));
                marketItemRepository.save(
                                new MarketItem(null, "스투키", "25,000원", "서초동", getImage(MarketCategory.PLANT, idx++), 20,
                                                3, MarketCategory.PLANT, "물 적게 줘도 OK.", "8개월"));
                marketItemRepository.save(new MarketItem(null, "로즈마리", "15,000원", "송파동",
                                getImage(MarketCategory.PLANT, idx++), 12, 1, MarketCategory.PLANT, "허브 식물.", "3개월"));
                marketItemRepository.save(new MarketItem(null, "행운목", "40,000원", "잠실동",
                                getImage(MarketCategory.PLANT, idx++), 25, 5, MarketCategory.PLANT, "개업 선물용.", "1년"));
                marketItemRepository.save(new MarketItem(null, "미니 선인장", "10,000원", "신촌동",
                                getImage(MarketCategory.PLANT, idx++), 8, 1, MarketCategory.PLANT, "데스크용 3개.", "새상품"));

                // 반려동물용품 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "강아지 캐리어", "50,000원", "강남동",
                                getImage(MarketCategory.PET, idx++), 32, 7, MarketCategory.PET, "소형견용.", "1년"));
                marketItemRepository.save(new MarketItem(null, "고양이 캣타워", "80,000원", "송파동",
                                getImage(MarketCategory.PET, idx++), 28, 6, MarketCategory.PET, "대형 타워.", "2년"));
                marketItemRepository.save(new MarketItem(null, "강아지 옷 세트", "30,000원", "홍대동",
                                getImage(MarketCategory.PET, idx++), 18, 3, MarketCategory.PET, "10벌 묶음.", "미사용"));
                marketItemRepository.save(new MarketItem(null, "자동 급식기", "60,000원", "서초동",
                                getImage(MarketCategory.PET, idx++), 25, 5, MarketCategory.PET, "타이머 설정.", "1년"));
                marketItemRepository.save(new MarketItem(null, "강아지 하네스", "20,000원", "마포동",
                                getImage(MarketCategory.PET, idx++), 15, 2, MarketCategory.PET, "중형견용.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "고양이 장난감", "15,000원", "신촌동",
                                getImage(MarketCategory.PET, idx++), 12, 1, MarketCategory.PET, "5종 세트.", "새상품"));
                marketItemRepository.save(new MarketItem(null, "펫 샴푸 세트", "25,000원", "잠실동",
                                getImage(MarketCategory.PET, idx++), 18, 3, MarketCategory.PET, "천연 성분.", "미사용"));
                marketItemRepository.save(new MarketItem(null, "강아지 침대", "40,000원", "건대동",
                                getImage(MarketCategory.PET, idx++), 22, 4, MarketCategory.PET, "대형 쿠션.", "1년"));

                // 티켓/교환권 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "CGV 영화 관람권", "8,000원", "강남동",
                                getImage(MarketCategory.TICKET, idx++), 45, 12, MarketCategory.TICKET, "2매.",
                                "유효기간 1년"));
                marketItemRepository.save(new MarketItem(null, "스타벅스 기프트카드", "30,000원", "홍대동",
                                getImage(MarketCategory.TICKET, idx++), 35, 8, MarketCategory.TICKET, "3만원권.", "무기한"));
                marketItemRepository.save(new MarketItem(null, "놀이공원 자유이용권", "40,000원", "송파동",
                                getImage(MarketCategory.TICKET, idx++), 28, 6, MarketCategory.TICKET, "롯데월드.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "호텔 숙박권", "150,000원", "서초동",
                                getImage(MarketCategory.TICKET, idx++), 22, 5, MarketCategory.TICKET, "5성급 1박.", "1년"));
                marketItemRepository.save(
                                new MarketItem(null, "뮤지컬 티켓", "60,000원", "종로동", getImage(MarketCategory.TICKET, idx++),
                                                18, 3, MarketCategory.TICKET, "오페라의 유령 R석.", "공연일"));
                marketItemRepository.save(new MarketItem(null, "항공 마일리지", "100,000원", "여의도동",
                                getImage(MarketCategory.TICKET, idx++), 30, 7, MarketCategory.TICKET, "5만 마일.", "2년"));
                marketItemRepository.save(new MarketItem(null, "식사권 (고급레스토랑)", "80,000원", "청담동",
                                getImage(MarketCategory.TICKET, idx++), 25, 5, MarketCategory.TICKET, "2인 코스.", "6개월"));
                marketItemRepository.save(new MarketItem(null, "헬스장 3개월권", "100,000원", "마포동",
                                getImage(MarketCategory.TICKET, idx++), 20, 4, MarketCategory.TICKET, "에니타임.", "즉시사용"));

                // 기타 중고물품 (8개)
                idx = 0;
                marketItemRepository.save(new MarketItem(null, "캠핑 의자", "30,000원", "송파동",
                                getImage(MarketCategory.ETC, idx++), 22, 4, MarketCategory.ETC, "접이식 2개.", "1년"));
                marketItemRepository.save(new MarketItem(null, "공구 세트", "50,000원", "강서동",
                                getImage(MarketCategory.ETC, idx++), 28, 6, MarketCategory.ETC, "가정용 풀세트.", "2년"));
                marketItemRepository.save(new MarketItem(null, "아기용품 일괄", "100,000원", "목동",
                                getImage(MarketCategory.ETC, idx++), 35, 8, MarketCategory.ETC, "유모차+카시트 등.", "3년"));
                marketItemRepository.save(new MarketItem(null, "우산 5개", "15,000원", "홍대동",
                                getImage(MarketCategory.ETC, idx++), 10, 1, MarketCategory.ETC, "장우산.", "미사용"));
                marketItemRepository.save(new MarketItem(null, "전동 킥보드", "200,000원", "강남동",
                                getImage(MarketCategory.ETC, idx++), 40, 10, MarketCategory.ETC, "샤오미.", "1년"));
                marketItemRepository.save(new MarketItem(null, "크리스마스 트리", "40,000원", "서초동",
                                getImage(MarketCategory.ETC, idx++), 18, 3, MarketCategory.ETC, "150cm.", "2년"));
                marketItemRepository.save(new MarketItem(null, "여행용 캐리어", "60,000원", "잠실동",
                                getImage(MarketCategory.ETC, idx++), 25, 5, MarketCategory.ETC, "28인치.", "1년"));
                marketItemRepository.save(new MarketItem(null, "전자레인지", "50,000원", "마포동",
                                getImage(MarketCategory.ETC, idx++), 20, 4, MarketCategory.ETC, "LG.", "3년"));

                System.out.println("Market 더미 데이터 128개 생성 완료! (카테고리별 이미지 매핑 적용)");
        }
}
