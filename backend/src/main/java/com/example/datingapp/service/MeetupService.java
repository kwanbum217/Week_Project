package com.example.datingapp.service;

import com.example.datingapp.model.Meetup;
import com.example.datingapp.model.MeetupCategory;
import com.example.datingapp.repository.MeetupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 모임 서비스
 */
@Service
public class MeetupService {

  private final MeetupRepository meetupRepository;

  public MeetupService(MeetupRepository meetupRepository) {
    this.meetupRepository = meetupRepository;
  }

  /**
   * 전체 모임 조회 (인원수 내림차순)
   */
  public List<Meetup> getAllMeetups() {
    return meetupRepository.findAllByOrderByMembersDesc();
  }

  /**
   * 카테고리별 모임 조회
   */
  public List<Meetup> getMeetupsByCategory(String categoryStr) {
    if (categoryStr == null || categoryStr.isEmpty() || categoryStr.equalsIgnoreCase("ALL")) {
      return getAllMeetups();
    }

    try {
      MeetupCategory category = MeetupCategory.valueOf(categoryStr.toUpperCase());
      return meetupRepository.findByCategoryOrderByMembersDesc(category);
    } catch (IllegalArgumentException e) {
      return getAllMeetups();
    }
  }

  /**
   * 모임 저장
   */
  public Meetup saveMeetup(Meetup meetup) {
    return meetupRepository.save(meetup);
  }
}
