package com.example.datingapp.repository;

import com.example.datingapp.model.Bmi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BmiRepository extends JpaRepository<Bmi, Long> {
}
