package com.example.datingapp.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.datingapp.service.GeminiSchema;
import com.example.datingapp.service.GeminiService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerSupportController {

  private static final Logger logger = LoggerFactory.getLogger(CustomerSupportController.class);

  @Autowired
  private GeminiService geminiService;

  @Autowired
  private GeminiSchema geminiSchema;

  @PostMapping("/ask")
  public ResponseEntity<?> askQuestion(@RequestBody Map<String, String> request) {
    try {
      String question = request.get("question");
      logger.info("=== Customer Support Request ===");
      logger.info("Question: {}", question);

      if (question == null || question.trim().isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("error", "질문을 입력해주세요."));
      }

      // AI에게 전달할 시스템 지시사항
      List<String> systemInstructions = List.of(
          "당신은 데이팅 앱의 친절한 고객센터 상담원입니다.",
          "사용자의 질문에 정확하고 친절하게 답변해주세요.",
          "답변은 한국어로 작성하며, 존댓말을 사용합니다.",
          "앱의 주요 기능: 매칭, 채팅, 음성 채팅, 위치 기반 매칭",
          "기술적인 문제는 구체적인 해결 방법을 제시해주세요.");

      logger.info("Calling Gemini API...");
      // Gemini API 호출
      String response = geminiService.run(systemInstructions, question, geminiSchema.customerSupport());
      logger.info("Gemini Response: {}", response);

      // JSON 파싱
      ObjectMapper mapper = new ObjectMapper();
      Map<String, String> aiResponse = mapper.readValue(response, new TypeReference<Map<String, String>>() {
      });

      logger.info("Parsed AI Response: {}", aiResponse);
      return ResponseEntity.ok(aiResponse);

    } catch (JsonMappingException e) {
      logger.error("JSON Mapping Error: {}", e.getMessage(), e);
      return ResponseEntity.internalServerError().body(Map.of(
          "error", "응답 파싱 오류가 발생했습니다.",
          "details", e.getMessage()));
    } catch (JsonProcessingException e) {
      logger.error("JSON Processing Error: {}", e.getMessage(), e);
      return ResponseEntity.internalServerError().body(Map.of(
          "error", "JSON 처리 오류가 발생했습니다.",
          "details", e.getMessage()));
    } catch (Exception e) {
      logger.error("General Error: {}", e.getMessage(), e);
      return ResponseEntity.internalServerError().body(Map.of(
          "error", "서버 오류가 발생했습니다.",
          "details", e.getMessage(),
          "type", e.getClass().getSimpleName()));
    }
  }
}
