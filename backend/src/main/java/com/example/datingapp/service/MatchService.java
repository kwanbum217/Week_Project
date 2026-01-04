package com.example.datingapp.service;

import com.example.datingapp.dto.MatchDTO;
import com.example.datingapp.model.User;
import com.example.datingapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class MatchService {

  @Autowired
  private UserRepository userRepository;

  private final Random random = new Random();

  // Haversine formula to calculate distance in km
  private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    final int R = 6371; // Radius of the earth
    double latDistance = Math.toRadians(lat2 - lat1);
    double lonDistance = Math.toRadians(lon2 - lon1);
    double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
        + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
            * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  public List<User> findMatches(User currentUser, double radiusKm) {
    List<User> allUsers = userRepository.findAll();
    return allUsers.stream()
        .filter(user -> !user.getId().equals(currentUser.getId())) // Exclude self
        .filter(user -> {
          if (currentUser.getLatitude() == null || currentUser.getLongitude() == null ||
              user.getLatitude() == null || user.getLongitude() == null) {
            return false;
          }
          double distance = calculateDistance(
              currentUser.getLatitude(), currentUser.getLongitude(),
              user.getLatitude(), user.getLongitude());
          return distance <= radiusKm;
        })
        .collect(Collectors.toList());
  }

  // New method for Match Page
  public List<MatchDTO> getAllMatches() {
    List<User> users = userRepository.findAll();
    return users.stream()
        .filter(user -> user.getInterests() != null && !user.getInterests().isEmpty())
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  private MatchDTO convertToDTO(User user) {
    int age = calculateAge(user.getBirthDate());
    List<String> interestList = Arrays.asList(user.getInterests().split(","));

    // Image logic based on gender and interests
    String image = getRandomImage(user.getGender(), interestList);

    return new MatchDTO(
        user.getId(),
        user.getUsername(), // Using username as name
        user.getGender(),
        age,
        user.getLocation(),
        image,
        80 + random.nextInt(20), // Random match rate 80-99
        Math.round((0.5 + random.nextDouble() * 5.0) * 10.0) / 10.0, // Random distance 0.5 - 5.5
        interestList);
  }

  private int calculateAge(String birthDate) {
    if (birthDate == null)
      return 60;
    try {
      LocalDate birth = LocalDate.parse(birthDate);
      return Period.between(birth, LocalDate.now()).getYears();
    } catch (Exception e) {
      return 60 + random.nextInt(15);
    }
  }

  private String getRandomImage(String gender, List<String> interests) {
    boolean isFemale = "여성".equals(gender) || "Female".equalsIgnoreCase(gender);

    if (interests.contains("등산") || interests.contains("운동") || interests.contains("건강")) {
      return "/img/friend_hiking.png";
    } else if (interests.contains("자전거") || interests.contains("여행")) {
      return "/img/friend_cycling.png";
    } else if (interests.contains("댄스") || interests.contains("음악")) {
      return "/img/friend_dancing.png";
    } else if (interests.contains("바둑") || interests.contains("독서")) {
      return "/img/friend_chess.png";
    }

    return isFemale ? "/img/friend_hiking.png" : "/img/friend_cycling.png";
  }
}
