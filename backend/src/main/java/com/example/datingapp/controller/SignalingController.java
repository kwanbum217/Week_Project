package com.example.datingapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import java.util.Map;

@Controller
public class SignalingController {

  @MessageMapping("/call/offer")
  @SendTo("/topic/call/offer")
  public Map<String, Object> handleOffer(@Payload Map<String, Object> offer) {
    // Offer 메시지 중계
    return offer;
  }

  @MessageMapping("/call/answer")
  @SendTo("/topic/call/answer")
  public Map<String, Object> handleAnswer(@Payload Map<String, Object> answer) {
    // Answer 메시지 중계
    return answer;
  }

  @MessageMapping("/call/candidate")
  @SendTo("/topic/call/candidate")
  public Map<String, Object> handleCandidate(@Payload Map<String, Object> candidate) {
    // ICE Candidate 메시지 중계
    return candidate;
  }
}
