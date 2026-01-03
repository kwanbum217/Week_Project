package com.example.datingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Data
@NoArgsConstructor
@Table(name = "USERS")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "USERNAME", unique = true, nullable = false)
  private String username;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(name = "PASSWORD", nullable = false)
  private String password;

  @Column(name = "EMAIL", unique = true)
  private String email;

  @Column(name = "PROVIDER")
  private String provider;

  @Column(name = "PROVIDER_ID")
  private String providerId;

  @Column(name = "GENDER")
  private String gender;

  @Column(name = "LOCATION")
  private String location;

  @Column(name = "LATITUDE")
  private Double latitude;

  @Column(name = "LONGITUDE")
  private Double longitude;

  @Column(name = "BIRTH_DATE")
  private String birthDate;

  @Column(name = "ROLE")
  private String role = "USER";

  // ===== 회원가입 폼 추가 필드 =====

  @Column(name = "PHONE")
  private String phone;

  @Column(name = "INTERESTS")
  private String interests;

  @Column(name = "WANT_TO_HOST")
  private String wantToHost;

  @Column(name = "WANT_TO_FIND_FRIENDS")
  private Boolean wantToFindFriends = false;

  @Column(name = "WANT_TO_MEET")
  private Boolean wantToMeet = false;

  @Column(name = "WANT_TO_CHAT")
  private Boolean wantToChat = false;

  @Column(name = "WANT_TO_SHARE")
  private Boolean wantToShare = false;

  @Column(name = "AGREE_TO_RECEIVE_TEXTS")
  private Boolean agreeToReceiveTexts = false;

  public User(String username, String password, String gender, String location) {
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.location = location;
  }
}
