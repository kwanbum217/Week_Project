package com.example.datingapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@jakarta.persistence.Entity
@jakarta.persistence.Table(name = "CHAT_MESSAGES")
public class ChatMessage {
  @jakarta.persistence.Id
  @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  private Long id;

  private String content;
  private String sender;
  private Long senderId;
  private Long roomId;
  private MessageType type;

  public enum MessageType {
    CHAT,
    JOIN,
    LEAVE
  }
}
