package com.example.datingapp.model;

/**
 * 마켓 상품 카테고리 Enum
 */
public enum MarketCategory {
  ALL("카테고리"),
  POPULAR("인기매물"),
  DIGITAL("디지털기기"),
  APPLIANCE("생활가전"),
  FURNITURE("가구/인테리어"),
  KITCHEN("생활/주방"),
  WOMEN_CLOTHING("여성의류"),
  MEN_CLOTHING("남성의류"),
  SHOES("신발/잡화"),
  BEAUTY("뷰티/미용"),
  SPORTS("스포츠/레저"),
  HOBBY("취미/게임/음반"),
  BOOK("도서"),
  PLANT("식물"),
  PET("반려동물용품"),
  TICKET("티켓/교환권"),
  ETC("기타 중고물품");

  private final String displayName;

  MarketCategory(String displayName) {
    this.displayName = displayName;
  }

  public String getDisplayName() {
    return displayName;
  }
}
