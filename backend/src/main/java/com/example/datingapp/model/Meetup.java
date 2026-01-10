package com.example.datingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

/**
 * 모임 엔티티
 */
@Entity
@Table(name = "meetups")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meetup {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "meetup_seq")
  @SequenceGenerator(name = "meetup_seq", sequenceName = "meetup_seq", allocationSize = 1)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(name = "creator_username")
  private String creatorUsername;

  @Column(name = "creator_nickname")
  private String creatorNickname;

  @Column(name = "creator_phone")
  private String creatorPhone;

  @Column(length = 500)
  private String description;

  private String location;

  @Column(name = "meet_date")
  private String date;

  private int members;

  @Column(name = "max_members")
  private int maxMembers;

  private String cost;

  private String transport;

  @Column(name = "start_time")
  private String startTime;

  @Column(name = "end_time")
  private String endTime;

  private String image;

  private String tags;

  private String supplies;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private MeetupCategory category;

  // 가입 회원 ID 목록 (쉼표로 구분)
  @Column(name = "member_usernames", length = 2000)
  private String memberUsernames;

  // 가입 회원 프로필명 목록 (쉼표로 구분)
  @Column(name = "member_nicknames", length = 2000)
  private String memberNicknames;
}
