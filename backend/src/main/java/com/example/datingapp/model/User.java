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
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "USERNAME", unique = true, nullable = false)
  private String username;

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

  public User(String username, String password, String gender, String location) {
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.location = location;
  }
}
