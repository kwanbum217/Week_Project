package com.example.datingapp.config;

import com.example.datingapp.model.ChatMessage;
import com.example.datingapp.service.OnlineUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Set;

@Component
public class WebSocketEventListener {

  private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

  @Autowired
  private SimpMessageSendingOperations messagingTemplate;

  @Autowired
  private OnlineUserService onlineUserService;

  @EventListener
  public void handleWebSocketConnectListener(SessionConnectedEvent event) {
    logger.info("Received a new web socket connection");
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

    if (headerAccessor.getSessionAttributes() != null) {
      String username = (String) headerAccessor.getSessionAttributes().get("username");
      if (username != null) {
        logger.info("User Disconnected : " + username);
        onlineUserService.removeUser(username);

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setType(ChatMessage.MessageType.LEAVE);
        chatMessage.setSender(username);

        messagingTemplate.convertAndSend("/topic/public", chatMessage);

        // Broadcast updated online users list
        broadcastOnlineUsers();
      }
    }
  }

  private void broadcastOnlineUsers() {
    Set<String> onlineUsers = onlineUserService.getOnlineUsers();
    messagingTemplate.convertAndSend("/topic/chat/participants", onlineUsers);
  }
}
