package com.example.datingapp.controller;

import com.example.datingapp.model.User;
import com.example.datingapp.service.UserService;
import com.example.datingapp.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtTokenProvider tokenProvider;

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody User user) {
    try {
      if (userService.findByUsername(user.getUsername()).isPresent()) {
        return ResponseEntity.badRequest().body("Username is already taken!");
      }
      User savedUser = userService.registerUser(user);
      return ResponseEntity.ok(savedUser);
    } catch (Exception e) {
      e.printStackTrace();
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
            // JWT 토큰 생성
            String token = tokenProvider.generateToken(u.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", u.getId());
            response.put("username", u.getUsername());
            response.put("email", u.getEmail());

            return ResponseEntity.ok(response);
          } else {
            return ResponseEntity.badRequest().body("Invalid password");
          }
        })
        .orElse(ResponseEntity.badRequest().body("User not found"));
  }
}
