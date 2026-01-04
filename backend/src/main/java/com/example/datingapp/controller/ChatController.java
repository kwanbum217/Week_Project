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

  public ChatController(ChatRoomRepository roomRepo,
      ChatMessageRepository messageRepo,
      SimpMessagingTemplate messagingTemplate) {
    this.roomRepo = roomRepo;
    this.messageRepo = messageRepo;
    this.messagingTemplate = messagingTemplate;
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
  public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
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
    chatMessage.setContent("joined the chat");
    return chatMessage;
  }
}
