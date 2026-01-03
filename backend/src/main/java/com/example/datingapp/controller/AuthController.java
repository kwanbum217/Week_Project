package com.example.datingapp.controller;

import com.example.datingapp.model.User;
import com.example.datingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody User user) {
    try {
      if (userService.findByUsername(user.getUsername()).isPresent()) {
        return ResponseEntity.badRequest().body("Username is already taken!");
      }
      User savedUser = userService.registerUser(user);
      return ResponseEntity.ok(savedUser);
    } catch (Exception e) {
      e.printStackTrace(); // 서버 콘솔에 에러 출력
      return ResponseEntity.internalServerError().body("Registration failed: " + e.getMessage());
    }
  }

  @GetMapping("/check-id")
  public ResponseEntity<?> checkIdDuplicate(@RequestParam String username) {
    if (userService.findByUsername(username).isPresent()) {
      return ResponseEntity.badRequest().body("이미 사용 중인 아이디입니다.");
    }
    return ResponseEntity.ok("사용 가능한 아이디입니다.");
  }

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody User user) {
    return userService.findByUsername(user.getUsername())
        .map(u -> {
          if (passwordEncoder.matches(user.getPassword(), u.getPassword())) {
            return ResponseEntity.ok(u);
          } else {
            return ResponseEntity.badRequest().body("Invalid password");
          }
        })
        .orElse(ResponseEntity.badRequest().body("User not found"));
  }
}
