package com.example.datingapp.controller;

import com.example.datingapp.model.Meetup;
import com.example.datingapp.model.MeetupCategory;
import com.example.datingapp.service.MeetupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 모임 REST 컨트롤러
 */
@RestController
@RequestMapping("/api/meetups")
@CrossOrigin(origins = "*")
public class MeetupController {

  private final MeetupService meetupService;

  public MeetupController(MeetupService meetupService) {
    this.meetupService = meetupService;
  }

  /**
   * 모임 목록 조회
   * 
   * @param category 카테고리 (선택) - ALL, EXERCISE_HEALTH, CULTURE_ART, TRAVEL,
   *                 VOLUNTEER
   */
  @GetMapping
  public ResponseEntity<List<Meetup>> getMeetups(
      @RequestParam(required = false) String category) {
    List<Meetup> meetups = meetupService.getMeetupsByCategory(category);
    return ResponseEntity.ok(meetups);
  }

  /**
   * 모임 가입
   */
  @PostMapping("/{id}/join")
  public ResponseEntity<String> joinMeetup(@PathVariable Long id, @RequestBody java.util.Map<String, String> body) {
    String username = body.get("username");
    try {
      meetupService.joinMeetup(id, username);
      return ResponseEntity.ok("모임에 가입되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  /**
   * 모임 생성
   */
  @PostMapping
  public ResponseEntity<Meetup> createMeetup(@RequestBody java.util.Map<String, Object> body) {
    Meetup meetup = new Meetup();
    meetup.setTitle((String) body.getOrDefault("title", "새 모임"));
    meetup.setDescription((String) body.getOrDefault("description", ""));
    meetup.setCreatorUsername((String) body.getOrDefault("creatorUsername", ""));
    meetup.setCreatorPhone((String) body.getOrDefault("creatorPhone", ""));
    meetup.setLocation((String) body.getOrDefault("location", ""));
    meetup.setDate((String) body.getOrDefault("date", ""));
    meetup.setCost((String) body.getOrDefault("fee", ""));
    meetup.setSupplies((String) body.getOrDefault("supplies", ""));

    Object maxMembersObj = body.get("maxMembers");
    if (maxMembersObj instanceof Number) {
      meetup.setMaxMembers(((Number) maxMembersObj).intValue());
    } else if (maxMembersObj instanceof String) {
      try {
        meetup.setMaxMembers(Integer.parseInt((String) maxMembersObj));
      } catch (NumberFormatException e) {
        meetup.setMaxMembers(10);
      }
    } else {
      meetup.setMaxMembers(10);
    }

    meetup.setMembers(0);

    // 한글 카테고리를 영어 enum으로 매핑
    String categoryStr = (String) body.getOrDefault("category", "VOLUNTEER");
    MeetupCategory category;
    switch (categoryStr) {
      case "등산":
      case "여행":
      case "TRAVEL":
        category = MeetupCategory.TRAVEL;
        break;
      case "운동":
      case "건강":
      case "EXERCISE_HEALTH":
        category = MeetupCategory.EXERCISE_HEALTH;
        break;
      case "노래":
      case "댄스":
      case "문화":
      case "예술":
      case "CULTURE_ART":
        category = MeetupCategory.CULTURE_ART;
        break;
      case "봉사":
      case "VOLUNTEER":
        category = MeetupCategory.VOLUNTEER;
        break;
      default:
        category = MeetupCategory.VOLUNTEER;
    }
    meetup.setCategory(category);

    Meetup savedMeetup = meetupService.saveMeetup(meetup);
    return ResponseEntity.ok(savedMeetup);
  }

  /**
   * 모임 멤버 조회
   */
  @GetMapping("/{id}/members")
  public ResponseEntity<List<com.example.datingapp.model.MeetupMember>> getMeetupMembers(@PathVariable Long id) {
    return ResponseEntity.ok(meetupService.getMeetupMembers(id));
  }
}
