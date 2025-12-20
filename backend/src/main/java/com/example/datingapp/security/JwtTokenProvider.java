package com.example.datingapp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

  @Value("${spring.security.jwt.secret}")
  private String jwtSecret;

  @Value("${spring.security.jwt.expires}")
  private int jwtExpirationInMs;

  private Key getSigningKey() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes());
  }

  public String generateToken(Authentication authentication) {
    String username = authentication.getName();
    // If OAuth2, name might be different, but we use email as username in
    // CustomOAuth2UserService
    // Or we can extract it from Principal

    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationInMs * 1000L);

    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(expiryDate)
        .signWith(getSigningKey(), SignatureAlgorithm.HS512)
        .compact();
  }

  public String generateToken(String email) {
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationInMs * 1000L);

    return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(new Date())
        .setExpiration(expiryDate)
        .signWith(getSigningKey(), SignatureAlgorithm.HS512)
        .compact();
  }

  public String getUsernameFromJWT(String token) {
    Claims claims = Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody();

    return claims.getSubject();
  }

  public boolean validateToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
      return true;
    } catch (SecurityException | MalformedJwtException ex) {
      // Invalid JWT signature
    } catch (ExpiredJwtException ex) {
      // Expired JWT token
    } catch (UnsupportedJwtException ex) {
      // Unsupported JWT token
    } catch (IllegalArgumentException ex) {
      // JWT claims string is empty
    }
    return false;
  }
}
