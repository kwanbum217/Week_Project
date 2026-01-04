package com.example.datingapp.config;

import com.example.datingapp.security.CustomOAuth2UserService;
import com.example.datingapp.security.JwtAuthenticationFilter;
import com.example.datingapp.security.OAuth2SuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Autowired
  private CustomOAuth2UserService customOAuth2UserService;

  @Autowired
  private OAuth2SuccessHandler oAuth2SuccessHandler;

  @Autowired
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(request -> {
          var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
          corsConfiguration.setAllowedOrigins(java.util.List.of("http://localhost:5173", "http://localhost:9999"));
          corsConfiguration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
          corsConfiguration.setAllowedHeaders(java.util.List.of("*"));
          corsConfiguration.setExposedHeaders(java.util.List.of("*"));
          corsConfiguration.setAllowCredentials(true);
          return corsConfiguration;
        })) // Enable CORS
        .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in this MVP
        .sessionManagement(session -> session
            .sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.STATELESS)) // Stateless
                                                                                                              // session
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(new AntPathRequestMatcher("/api/auth/**")).permitAll() // Allow auth endpoints
            .requestMatchers(new AntPathRequestMatcher("/api/support/**")).permitAll() // Allow customer support
            .requestMatchers(new AntPathRequestMatcher("/api/matches/**")).permitAll() // Allow match endpoints
            .requestMatchers(new AntPathRequestMatcher("/ws/**")).permitAll() // Allow WebSocket
            .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll() // Allow H2 console
            .requestMatchers(new AntPathRequestMatcher("/oauth2/**")).permitAll() // Allow OAuth2
            .requestMatchers(new AntPathRequestMatcher("/login/**")).permitAll() // Allow login paths
            .requestMatchers(new AntPathRequestMatcher("/login/oauth2/code/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/api/admin/**")).hasRole("ADMIN")
            .requestMatchers(new AntPathRequestMatcher("/api/location/**")).authenticated() // Location based services
                                                                                            // require login
            .requestMatchers(new AntPathRequestMatcher("/ws-chat/**")).authenticated() // Chat WebSocket
            .requestMatchers(new AntPathRequestMatcher("/chat/**")).authenticated() // Chat API
            .requestMatchers(new AntPathRequestMatcher("/auth/**")).permitAll() // Auth alias
            .requestMatchers(new AntPathRequestMatcher("/error")).permitAll() // Allow error page
            .anyRequest().authenticated())
        .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin())) // Allow H2 console frames
        .httpBasic(basic -> basic.disable()) // Disable basic auth
        .formLogin(form -> form.disable()) // Disable default login form
        .oauth2Login(oauth2 -> oauth2
            .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
            .successHandler(oAuth2SuccessHandler))
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

}
