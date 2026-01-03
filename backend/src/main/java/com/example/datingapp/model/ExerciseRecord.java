package com.example.datingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "EXERCISE_RECORDS")
public class ExerciseRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID")
  private User user;

  @Column(name = "EXERCISE_TYPE")
  private String exerciseType;

  @Column(name = "DURATION_MINUTES")
  private Integer durationMinutes;

  @Column(name = "RECORDED_AT")
  private LocalDateTime recordedAt = LocalDateTime.now();
}
