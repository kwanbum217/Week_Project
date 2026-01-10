package com.example.datingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "USERS")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "USERNAME", unique = true, nullable = false)
  private String username;

  @Column(name = "NICKNAME")
  private String nickname;

  @Column(name = "NAME")
  private String name;

  @com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
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
  private String location; // Simple string for now, e.g., "Seoul"

  @Column(name = "LATITUDE")
  private Double latitude;

  @Column(name = "LONGITUDE")
  private Double longitude;

  @Column(name = "BIRTH_DATE")
  private String birthDate;

  @Column(name = "PHONE")
  private String phone;

  @Column(name = "WANT_TO_HOST")
  private String wantToHost; // Comma separated string of categories

  @Column(name = "WANT_TO_FIND_FRIENDS")
  private Boolean wantToFindFriends = false;

  @Column(name = "WANT_TO_MEET")
  private Boolean wantToMeet = false;

  @Column(name = "WANT_TO_CHAT")
  private Boolean wantToChat = false;

  @Column(name = "WANT_TO_SHARE")
  private Boolean wantToShare = false;

  @Column(name = "CREATED_AT", updatable = false)
  private java.time.LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
    createdAt = java.time.LocalDateTime.now();
  }

  @Column(name = "ROLE")
  private String role = "USER";

  @Column(name = "INTERESTS")
  private String interests;

  @Column(name = "MEMO", length = 1000)
  private String memo;

  public User(String username, String password, String gender, String location) {
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.location = location;
  }
}
