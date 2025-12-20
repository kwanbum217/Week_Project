package com.example.datingapp.controller;

import com.example.datingapp.model.User;
import com.example.datingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody User user) {
    if (userService.findByUsername(user.getUsername()).isPresent()) {
      return ResponseEntity.badRequest().body("Username is already taken!");
    }
    User savedUser = userService.registerUser(user);
    return ResponseEntity.ok(savedUser);
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
