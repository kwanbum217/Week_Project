package com.example.datingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "VITAL_RECORDS")
public class VitalRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID")
  private User user;

  @Column(name = "SYSTOLIC")
  private Integer systolic;

  @Column(name = "DIASTOLIC")
  private Integer diastolic;

  @Column(name = "BLOOD_SUGAR")
  private Integer bloodSugar;

  @Column(name = "RECORDED_AT")
  private LocalDateTime recordedAt = LocalDateTime.now();
}
