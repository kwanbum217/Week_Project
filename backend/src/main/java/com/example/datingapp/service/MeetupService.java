package com.example.datingapp.service;

import com.example.datingapp.model.Meetup;
import com.example.datingapp.model.MeetupCategory;
import com.example.datingapp.repository.MeetupRepository;
import com.example.datingapp.repository.MeetupMemberRepository;
import com.example.datingapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 모임 서비스
 */
@Service
public class MeetupService {

  private final MeetupRepository meetupRepository;
  private final MeetupMemberRepository meetupMemberRepository;
  private final UserRepository userRepository;

  public MeetupService(MeetupRepository meetupRepository, MeetupMemberRepository meetupMemberRepository,
      UserRepository userRepository) {
    this.meetupRepository = meetupRepository;
    this.meetupMemberRepository = meetupMemberRepository;
    this.userRepository = userRepository;
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

  /**
   * 모임 가입
   */
  public void joinMeetup(Long meetupId, String username) {
    Meetup meetup = meetupRepository.findById(meetupId)
        .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다."));

    com.example.datingapp.model.User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

    if (meetupMemberRepository.existsByMeetupIdAndUserId(meetupId, user.getId())) {
      throw new IllegalStateException("이미 가입한 모임입니다.");
    }

    com.example.datingapp.model.MeetupMember member = new com.example.datingapp.model.MeetupMember();
    member.setMeetup(meetup);
    member.setUser(user);
    meetupMemberRepository.save(member);

    // 멤버 수 증가
    meetup.setMembers(meetup.getMembers() + 1);

    // 가입 회원 ID 목록 업데이트
    String currentUsernames = meetup.getMemberUsernames();
    if (currentUsernames == null || currentUsernames.isEmpty()) {
      meetup.setMemberUsernames(username);
    } else {
      meetup.setMemberUsernames(currentUsernames + ", " + username);
    }

    // 가입 회원 프로필명 목록 업데이트
    String nickname = user.getNickname() != null ? user.getNickname() : username;
    String currentNicknames = meetup.getMemberNicknames();
    if (currentNicknames == null || currentNicknames.isEmpty()) {
      meetup.setMemberNicknames(nickname);
    } else {
      meetup.setMemberNicknames(currentNicknames + ", " + nickname);
    }

    meetupRepository.save(meetup);
  }

  /**
   * 모임 멤버 조회
   */
  public List<com.example.datingapp.model.MeetupMember> getMeetupMembers(Long meetupId) {
    return meetupMemberRepository.findByMeetupIdWithUser(meetupId);
  }

  /**
   * 모임 삭제 (모임장만 삭제 가능)
   */
  @Transactional
  public void deleteMeetup(Long meetupId, String username) {
    Meetup meetup = meetupRepository.findById(meetupId)
        .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다."));

    // 모임 생성자만 삭제 가능
    if (!meetup.getCreatorUsername().equals(username)) {
      throw new IllegalStateException("모임장만 삭제할 수 있습니다.");
    }

    // 모임 멤버 먼저 삭제
    meetupMemberRepository.deleteByMeetupId(meetupId);

    // 모임 삭제
    meetupRepository.delete(meetup);
  }
}
