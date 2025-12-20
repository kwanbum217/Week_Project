package com.example.datingapp.controller;

import com.example.datingapp.model.SignalingMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class SignalingController {

  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  @MessageMapping("/signal")
  public void processSignal(@Payload SignalingMessage message) {
    // Send to specific user if recipient is defined, otherwise broadcast (for
    // simple demo)
    // In a real app, you'd send to specific user via /user/{username}/queue/signal

    if (message.getRecipient() != null) {
      messagingTemplate.convertAndSendToUser(
          message.getRecipient(),
          "/queue/signal",
          message);
    } else {
      // Broadcast to public for demo purposes if no recipient
      messagingTemplate.convertAndSend("/topic/signal", message);
    }
  }
}
