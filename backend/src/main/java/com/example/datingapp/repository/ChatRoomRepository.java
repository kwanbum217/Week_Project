package com.example.datingapp.repository;

import com.example.datingapp.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // Optional: add finding methods if needed, e.g. findByUser1IdAndUser2Id
}
