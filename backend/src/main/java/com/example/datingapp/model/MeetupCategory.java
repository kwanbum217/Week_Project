package com.example.datingapp.model;

/**
 * 모임 카테고리 Enum
 */
public enum MeetupCategory {
  ALL("전체"),
  GUITAR("기타"),
  SINGING("노래"),
  DANCE("댄스"),
  READING("독서"),
  HIKING("등산"),
  KNITTING("뜨개질"),
  FOODIE("먹방"),
  BADUK("바둑"),
  PHOTO("사진"),
  STUDY("스터디"),
  TRAVEL("여행"),
  COOKING("요리"),
  JANGGI("장기"),
  SOCIAL("친목");

  private final String displayName;

  MeetupCategory(String displayName) {
    this.displayName = displayName;
  }

  public String getDisplayName() {
    return displayName;
  }
}
