package com.example.datingapp.scheduler;

import com.example.datingapp.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
public class ChatCleanupScheduler {

  @Autowired
  private ChatMessageRepository chatMessageRepository;

  // Run every day at 3 AM
  @Scheduled(cron = "0 0 3 * * *")
  @Transactional
  public void cleanupOldMessages() {
    // Delete messages older than 7 days
    LocalDateTime expiryDate = LocalDateTime.now().minusDays(7);
    chatMessageRepository.deleteByCreatedAtBefore(expiryDate);
    System.out.println("Old chat messages deleted before " + expiryDate);
  }
}
