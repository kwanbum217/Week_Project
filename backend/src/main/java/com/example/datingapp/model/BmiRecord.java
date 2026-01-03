package com.example.datingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "BMI_RECORDS")
public class BmiRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID")
  private User user;

  @Column(name = "HEIGHT")
  private Double height;

  @Column(name = "WEIGHT")
  private Double weight;

  @Column(name = "BMI_INDEX")
  private Double bmiIndex;

  @Column(name = "RESULT")
  private String result;

  @Column(name = "RECORDED_AT")
  private LocalDateTime recordedAt = LocalDateTime.now();
}
