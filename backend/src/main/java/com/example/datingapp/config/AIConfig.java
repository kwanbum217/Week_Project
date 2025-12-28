package com.example.datingapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AIConfig {
  @Value("${spring.ai.model:gemini-1.5-flash}")
  String model;

  @Value("${spring.ai.api:}")
  String apiKey;

  @Value("${spring.ai.enabled:false}")
  boolean aiEnabled;

  @Bean(name = "gemini_text")
  @Scope("singleton")
  public WebClient geminiText() {
    System.out.println("Configured Gemini Model: " + model);
    System.out.println("AI Enabled: " + aiEnabled);

    // AI가 비활성화되었거나 API 키가 없으면 더미 WebClient 반환
    if (!aiEnabled || apiKey == null || apiKey.isEmpty()) {
      System.out.println("AI is disabled or API key is not configured. Using dummy WebClient.");
      return WebClient.builder()
          .baseUrl("https://example.com")
          .build();
    }

    System.out.println("API Key: " + apiKey.substring(0, Math.min(10, apiKey.length())) + "...");

    String baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key="
        + apiKey;

    org.springframework.web.util.DefaultUriBuilderFactory factory = new org.springframework.web.util.DefaultUriBuilderFactory(
        baseUrl);
    factory.setEncodingMode(org.springframework.web.util.DefaultUriBuilderFactory.EncodingMode.NONE);

    return WebClient.builder()
        .uriBuilderFactory(factory)
        .filter((request, next) -> {
          System.out.println("Gemini API Request URL: " + request.url());
          return next.exchange(request);
        })
        .defaultHeaders(headers -> {
          headers.add("Content-Type", "application/json");
        })
        .build();
  }

  public boolean isAiEnabled() {
    return aiEnabled && apiKey != null && !apiKey.isEmpty();
  }
}
