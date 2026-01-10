package com.example.datingapp.repository;

import com.example.datingapp.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
  void deleteByCreatedAtBefore(java.time.LocalDateTime expiryDate);
}
