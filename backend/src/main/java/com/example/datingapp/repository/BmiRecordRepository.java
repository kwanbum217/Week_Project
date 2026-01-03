package com.example.datingapp.repository;

import com.example.datingapp.model.BmiRecord;
import com.example.datingapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BmiRecordRepository extends JpaRepository<BmiRecord, Long> {
  List<BmiRecord> findByUserOrderByRecordedAtDesc(User user);
}
