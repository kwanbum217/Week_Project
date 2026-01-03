package com.example.datingapp.repository;

import com.example.datingapp.model.Vital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VitalRepository extends JpaRepository<Vital, Long> {
}
