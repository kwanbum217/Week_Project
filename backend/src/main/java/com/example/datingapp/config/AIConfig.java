package com.example.datingapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AIConfig {
  @Value("${spring.ai.model}")
  String model;

  @Value("${spring.ai.api}")
  String apiKey;

  @Bean(name = "gemini_text")
  @Scope("singleton")
  public WebClient geminiText() {
    System.out.println("Configured Gemini Model: " + model);
    System.out.println("API Key: " + (apiKey != null ? apiKey.substring(0, 10) + "..." : "null"));

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
}
