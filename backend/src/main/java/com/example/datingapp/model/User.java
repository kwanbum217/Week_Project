package com.example.datingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(unique = true)
  private String email;

  private String provider;
  private String providerId;

  private String gender;
  private String location; // Simple string for now, e.g., "Seoul"
  private Double latitude;
  private Double longitude;

  public User(String username, String password, String gender, String location) {
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.location = location;
  }
}
