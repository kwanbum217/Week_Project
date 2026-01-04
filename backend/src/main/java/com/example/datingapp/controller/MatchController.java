package com.example.datingapp.controller;

import com.example.datingapp.model.User;
import com.example.datingapp.service.MatchService;
import com.example.datingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {

  @Autowired
  private MatchService matchService;

  @Autowired
  private UserService userService;

  @GetMapping
  public ResponseEntity<List<com.example.datingapp.dto.MatchDTO>> getAllMatches() {
    return ResponseEntity.ok(matchService.getAllMatches());
  }

  @GetMapping("/{username}")
  public ResponseEntity<List<User>> getMatches(@PathVariable String username,
      @RequestParam(defaultValue = "10") double radius) {
    return userService.findByUsername(username)
        .map(user -> ResponseEntity.ok(matchService.findMatches(user, radius)))
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/{username}/location")
  public ResponseEntity<?> updateLocation(@PathVariable String username, @RequestBody LocationRequest location) {
    return userService.findByUsername(username)
        .map(user -> {
          user.setLatitude(location.getLatitude());
          user.setLongitude(location.getLongitude());
          userService.registerUser(user); // Save updated user
          return ResponseEntity.ok().build();
        })
        .orElse(ResponseEntity.notFound().build());
  }

  // Inner class for request body
  public static class LocationRequest {
    private Double latitude;
    private Double longitude;

    public Double getLatitude() {
      return latitude;
    }

    public void setLatitude(Double latitude) {
      this.latitude = latitude;
    }

    public Double getLongitude() {
      return longitude;
    }

    public void setLongitude(Double longitude) {
      this.longitude = longitude;
    }
  }
}
