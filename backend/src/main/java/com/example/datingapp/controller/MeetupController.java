package com.example.datingapp.controller;

import com.example.datingapp.model.Meetup;
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
}
