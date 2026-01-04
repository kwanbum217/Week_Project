package com.example.datingapp.model;

/**
 * 모임 카테고리 Enum
 */
public enum MeetupCategory {
  ALL("전체"),
  EXERCISE_HEALTH("운동/건강"),
  CULTURE_ART("문화/예술"),
  TRAVEL("여행"),
  VOLUNTEER("봉사활동");

  private final String displayName;

  MeetupCategory(String displayName) {
    this.displayName = displayName;
  }

  public String getDisplayName() {
    return displayName;
  }
}
