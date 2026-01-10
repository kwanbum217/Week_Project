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

  @Autowired
  private com.example.datingapp.security.JwtTokenProvider jwtTokenProvider;

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
    System.out.println("========== LOGIN ATTEMPT ==========");
    System.out.println("Received username: [" + user.getUsername() + "]");
    System.out.println("Received password: [" + user.getPassword() + "]");
    System.out.println("===================================");

    if (user.getUsername() == null || user.getUsername().isEmpty()) {
      return ResponseEntity.badRequest().body("Username is required");
    }
    if (user.getPassword() == null || user.getPassword().isEmpty()) {
      return ResponseEntity.badRequest().body("Password is required");
    }

    return userService.findByUsername(user.getUsername())
        .map(u -> {
          if (passwordEncoder.matches(user.getPassword(), u.getPassword())) {
            // Generate Token
            // We can use the username or email. TokenProvider expects Authentication or
            // String.
            // Let's create a partial Authentication or use a simpler generate method if
            // avail.
            // JwtTokenProvider has generateToken(String email) which sets subject to email.
            // But existing system seems to use username.

            // Workaround: We will use generateToken(Authentication) by creating a dummy
            // token
            // or check if there is a generateToken(String username).
            // Checked JwtTokenProvider: has generateToken(Authentication) and
            // generateToken(String email).
            // If we use generateToken(String email), we need to ensure username is email or
            // handled correctly.
            // Let's create a UsernamePasswordAuthenticationToken for generation.

            org.springframework.security.authentication.UsernamePasswordAuthenticationToken authentication = new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                u.getUsername(), null, new com.example.datingapp.security.CustomUserDetails(u).getAuthorities());

            String token = jwtTokenProvider.generateToken(authentication);

            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("user", u);
            response.put("accessToken", token);

            return ResponseEntity.ok(response);
          } else {
            return ResponseEntity.badRequest().body("Invalid password");
          }
        })
        .orElse(ResponseEntity.badRequest().body("User not found"));
  }
}
