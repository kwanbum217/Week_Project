package com.example.datingapp.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Scope("singleton")
public class GeminiService {

  private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);

  @Autowired
  @Qualifier("gemini_text")
  WebClient gemini;

  @Value("${spring.ai.enabled:false}")
  boolean aiEnabled;

  @Value("${spring.ai.api:}")
  String apiKey;

  private boolean isAiAvailable() {
    return aiEnabled && apiKey != null && !apiKey.isEmpty();
  }

  @SuppressWarnings("unchecked")
  private String gemini_run_to_string(Map<String, Object> request) {
    // AI가 비활성화된 경우 기본 응답 반환
    if (!isAiAvailable()) {
      logger.warn("AI is disabled. Returning default response.");
      return "{\"answer\": \"AI 기능이 현재 비활성화되어 있습니다. 관리자에게 문의해주세요.\", \"category\": \"system\"}";
    }

    try {
      logger.info("=== Gemini API Request ===");
      logger.info("Request: {}", request);

      Map<String, Object> response = gemini
          .post()
          .bodyValue(request)
          .retrieve()
          .bodyToMono(Map.class)
          .block();

      logger.info("=== Gemini API Response ===");
      logger.info("Response: {}", response);

      if (response == null) {
        logger.error("Gemini API returned null response");
        return "No Response Error!";
      }

      List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
      if (candidates == null || candidates.isEmpty()) {
        logger.error("No candidates in response");
        return "No Result Error!";
      }

      Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
      List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
      String result = parts.get(0).get("text").toString();

      logger.info("Extracted text: {}", result);
      return result;
    } catch (Exception e) {
      logger.error("=== Gemini API Error ===");
      logger.error("Error Type: {}", e.getClass().getSimpleName());
      logger.error("Error Message: {}", e.getMessage(), e);
      throw new RuntimeException("Gemini API call failed: " + e.getMessage(), e);
    }
  }

  public String run(List<String> systems, String user, Map<String, Object> schema) {
    if (!isAiAvailable()) {
      return "{\"answer\": \"AI 기능이 현재 비활성화되어 있습니다. 관리자에게 문의해주세요.\", \"category\": \"system\"}";
    }

    Map<String, Object> request = Map.of(
        "system_instruction", Map.of(
            "parts", systems.stream().map(system -> Map.of("text", system)).toList()),
        "contents", List.of(
            Map.of("parts", List.of(
                Map.of("text", user)))),
        "generationConfig", Map.of(
            "responseMimeType", "application/json",
            "responseSchema", schema));

    return gemini_run_to_string(request);
  }

  public String run(List<String> systems, String user) {
    if (!isAiAvailable()) {
      return "AI 기능이 현재 비활성화되어 있습니다.";
    }

    Map<String, Object> request = Map.of(
        "system_instruction", Map.of(
            "parts", systems.stream().map(system -> Map.of("text", system)).toList()),
        "contents", List.of(
            Map.of("parts", List.of(
                Map.of("text", user)))));

    return gemini_run_to_string(request);
  }

  public String run(String user) {
    if (!isAiAvailable()) {
      return "AI 기능이 현재 비활성화되어 있습니다.";
    }

    Map<String, Object> request = Map.of(
        "contents", List.of(
            Map.of("parts", List.of(
                Map.of("text", user)))));

    return gemini_run_to_string(request);
  }
}
