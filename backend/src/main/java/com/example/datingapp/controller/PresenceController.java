package com.example.datingapp.controller;

import com.example.datingapp.service.OnlineUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;
import java.util.Set;

@Controller
public class PresenceController {

  @Autowired
  private OnlineUserService onlineUserService;

  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  @MessageMapping("/presence/join")
  public void userJoin(@Payload Map<String, String> payload) {
    String username = payload.get("username");
    if (username != null && !username.isEmpty()) {
      onlineUserService.addUser(username);
      broadcastOnlineUsers();
    }
  }

  @MessageMapping("/presence/leave")
  public void userLeave(@Payload Map<String, String> payload) {
    String username = payload.get("username");
    if (username != null) {
      onlineUserService.removeUser(username);
      broadcastOnlineUsers();
    }
  }

  private void broadcastOnlineUsers() {
    Set<String> onlineUsers = onlineUserService.getOnlineUsers();
    messagingTemplate.convertAndSend("/topic/presence", onlineUsers);
  }
}
