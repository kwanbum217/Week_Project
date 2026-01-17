package com.example.datingapp.controller;

import com.example.datingapp.model.ChatMessage;
import com.example.datingapp.model.ChatRoom;
import com.example.datingapp.repository.ChatMessageRepository;
import com.example.datingapp.repository.ChatRoomRepository;
import com.example.datingapp.security.CustomUserDetails;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ChatController {

  private final ChatRoomRepository roomRepo;
  private final ChatMessageRepository messageRepo;
  private final SimpMessagingTemplate messagingTemplate;
  private final com.example.datingapp.service.OnlineUserService onlineUserService;

  public ChatController(ChatRoomRepository roomRepo,
      ChatMessageRepository messageRepo,
      SimpMessagingTemplate messagingTemplate,
      com.example.datingapp.service.OnlineUserService onlineUserService) {
    this.roomRepo = roomRepo;
    this.messageRepo = messageRepo;
    this.messagingTemplate = messagingTemplate;
    this.onlineUserService = onlineUserService;
  }

  // --- REST API (User Requested) ---
  // Using explicit paths to avoid conflicting with potential global prefixes or
  // confusion,
  // although @RequestMapping("/chat") on class would be standard.
  // To match user request specifically:

  @PostMapping("/chat/request")
  public ChatRoom requestChat(@RequestParam Long toUserId,
      @AuthenticationPrincipal CustomUserDetails user) {

    ChatRoom room = new ChatRoom();
    room.setUser1Id(user.getId());
    room.setUser2Id(toUserId);
    room.setStatus(ChatRoom.Status.PENDING);

    return roomRepo.save(room);
  }

  @PatchMapping("/chat/{roomId}/accept")
  public ChatRoom accept(@PathVariable Long roomId) {
    ChatRoom room = roomRepo.findById(roomId).orElseThrow();
    room.setStatus(ChatRoom.Status.ACCEPTED);
    return roomRepo.save(room);
  }

  @PatchMapping("/chat/{roomId}/reject")
  public ChatRoom reject(@PathVariable Long roomId) {
    ChatRoom room = roomRepo.findById(roomId).orElseThrow();
    room.setStatus(ChatRoom.Status.REJECTED);
    return roomRepo.save(room);
  }

  // --- WebSocket Handlers (Existing) ---

  @MessageMapping("/chat.sendMessage")
  @SendTo("/topic/public")
  public ChatMessage sendMessage(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
    // Try to get userId from session if available
    Map<String, Object> attrs = headerAccessor.getSessionAttributes();
    if (attrs != null && attrs.containsKey("userId")) {
      chatMessage.setSenderId((Long) attrs.get("userId"));
    }
    // 공개 채널 메시지도 DB에 저장
    messageRepo.save(chatMessage);
    return chatMessage;
  }

  @MessageMapping("/chat.send/{roomId}")
  public void sendMessage(@DestinationVariable Long roomId,
      @Payload ChatMessage message,
      @Header("simpSessionAttributes") Map<String, Object> attributes) {

    Long senderId = (Long) attributes.get("userId");
    message.setSenderId(senderId);
    message.setRoomId(roomId);

    messageRepo.save(message);

    messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);
  }

  @MessageMapping("/chat.addUser")
  @SendTo("/topic/public")
  public ChatMessage addUser(@Payload ChatMessage chatMessage,
      SimpMessageHeaderAccessor headerAccessor) {
    // Add username in web socket session
    headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());

    // Set senderId from session (put by JwtHandshakeInterceptor)
    Map<String, Object> attrs = headerAccessor.getSessionAttributes();
    if (attrs != null && attrs.containsKey("userId")) {
      chatMessage.setSenderId((Long) attrs.get("userId"));
    }

    // Add to online users service
    onlineUserService.addUser(chatMessage.getSender());

    // Broadcast updated list
    messagingTemplate.convertAndSend("/topic/chat/participants", onlineUserService.getOnlineUsers());

    chatMessage.setContent(chatMessage.getSender() + " joined the chat");
    return chatMessage;
  }
}
