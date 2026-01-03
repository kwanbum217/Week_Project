package com.example.datingapp.service;

import com.example.datingapp.model.Bmi;
import com.example.datingapp.model.Exercise;
import com.example.datingapp.model.Vital;
import com.example.datingapp.repository.BmiRepository;
import com.example.datingapp.repository.ExerciseRepository;
import com.example.datingapp.repository.VitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthService {
    @Autowired
    private BmiRepository bmiRepository;

    @Autowired
    private VitalRepository vitalRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    // BMI Methods
    public Bmi saveBmi(Bmi bmi) {
        return bmiRepository.save(bmi);
    }

    public List<Bmi> getAllBmiRecords() {
        return bmiRepository.findAll();
    }

    // Vital Methods
    public Vital saveVital(Vital vital) {
        return vitalRepository.save(vital);
    }

    public List<Vital> getAllVitalRecords() {
        return vitalRepository.findAll();
    }

    // Exercise Methods
    public Exercise saveExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    public List<Exercise> getAllExerciseRecords() {
        return exerciseRepository.findAll();
    }
}
