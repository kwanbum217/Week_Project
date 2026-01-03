package com.example.datingapp.controller;

import com.example.datingapp.model.Bmi;
import com.example.datingapp.model.Exercise;
import com.example.datingapp.model.Vital;
import com.example.datingapp.service.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "http://localhost:5174")
public class HealthController {

    @Autowired
    private HealthService healthService;

    // BMI Endpoints
    @PostMapping("/bmi")
    public ResponseEntity<Bmi> createBmi(@RequestBody Bmi bmi) {
        return ResponseEntity.ok(healthService.saveBmi(bmi));
    }

    @GetMapping("/bmi")
    public ResponseEntity<List<Bmi>> getBmiRecords() {
        return ResponseEntity.ok(healthService.getAllBmiRecords());
    }

    // Vital Endpoints
    @PostMapping("/vital")
    public ResponseEntity<Vital> createVital(@RequestBody Vital vital) {
        return ResponseEntity.ok(healthService.saveVital(vital));
    }

    @GetMapping("/vital")
    public ResponseEntity<List<Vital>> getVitalRecords() {
        return ResponseEntity.ok(healthService.getAllVitalRecords());
    }

    // Exercise Endpoints
    @PostMapping("/exercise")
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok(healthService.saveExercise(exercise));
    }

    @GetMapping("/exercise")
    public ResponseEntity<List<Exercise>> getExerciseRecords() {
        return ResponseEntity.ok(healthService.getAllExerciseRecords());
    }
}
