package com.example.datingapp.repository;

import com.example.datingapp.model.ExerciseRecord;
import com.example.datingapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExerciseRecordRepository extends JpaRepository<ExerciseRecord, Long> {
  List<ExerciseRecord> findByUserOrderByRecordedAtDesc(User user);
}
