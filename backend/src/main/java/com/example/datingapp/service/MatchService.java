package com.example.datingapp.service;

import com.example.datingapp.model.User;
import com.example.datingapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {

  @Autowired
  private UserRepository userRepository;

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
}
