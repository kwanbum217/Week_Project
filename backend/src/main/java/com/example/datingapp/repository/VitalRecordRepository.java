package com.example.datingapp.repository;

import com.example.datingapp.model.VitalRecord;
import com.example.datingapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VitalRecordRepository extends JpaRepository<VitalRecord, Long> {
  List<VitalRecord> findByUserOrderByRecordedAtDesc(User user);
}
