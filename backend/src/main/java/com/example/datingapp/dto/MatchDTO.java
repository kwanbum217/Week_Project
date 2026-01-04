package com.example.datingapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchDTO {
  private Long id;
  private String name;
  private String gender;
  private int age;
  private String location;
  private String image;
  private int matchRate;
  private double distance;
  private List<String> interests;
}
