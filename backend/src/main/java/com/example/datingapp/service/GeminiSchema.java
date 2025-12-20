package com.example.datingapp.service;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("singleton")
public class GeminiSchema {

  /**
   * 고객센터 응답 스키마
   * 
   * @return Customer Support Response Schema
   */
  public Map<String, Object> customerSupport() {
    return Map.of(
        "type", "OBJECT",
        "properties", Map.of(
            "answer", Map.of(
                "type", "STRING",
                "description", "고객 질문에 대한 친절하고 상세한 답변"),
            "category", Map.of(
                "type", "STRING",
                "description", "질문 카테고리 (계정, 매칭, 채팅, 기술지원, 기타)")),
        "required", List.of("answer", "category"));
  }

  /**
   * 책 형태의 응답
   * 
   * @return Book Schema
   */
  public Map<String, Object> book() {
    return Map.of(
        "type", "OBJECT",
        "properties", Map.of(
            "books", Map.of(
                "type", "ARRAY",
                "items", Map.of(
                    "type", "OBJECT",
                    "properties", Map.of(
                        "title", Map.of("type", "STRING"),
                        "author", Map.of("type", "STRING")),
                    "propertyOrdering", List.of("title")))));
  }
}
