package com.example.datingapp.controller;

import com.example.datingapp.model.*;
import com.example.datingapp.repository.*;
import com.example.datingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class HealthController {

    @Autowired
    private BmiRecordRepository bmiRecordRepository;

    @Autowired
    private VitalRecordRepository vitalRecordRepository;

    @Autowired
    private ExerciseRecordRepository exerciseRecordRepository;

    @Autowired
    private UserService userService;

    // 현재 로그인한 사용자 가져오기
    private Optional<User> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            return userService.findByUsername(auth.getName());
        }
        return Optional.empty();
    }

    // BMI 기록 저장
    @PostMapping("/bmi")
    public ResponseEntity<?> saveBmiRecord(@RequestBody Map<String, Object> request) {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        BmiRecord record = new BmiRecord();
        record.setUser(userOpt.get());
        record.setHeight(((Number) request.get("height")).doubleValue());
        record.setWeight(((Number) request.get("weight")).doubleValue());
        record.setBmiIndex(((Number) request.get("bmiIndex")).doubleValue());
        record.setResult((String) request.get("result"));
        record.setRecordedAt(LocalDateTime.now());

        BmiRecord saved = bmiRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }

    // 건강수치(혈압/혈당) 기록 저장
    @PostMapping("/vital")
    public ResponseEntity<?> saveVitalRecord(@RequestBody Map<String, Object> request) {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        VitalRecord record = new VitalRecord();
        record.setUser(userOpt.get());
        if (request.get("systolic") != null) {
            record.setSystolic(((Number) request.get("systolic")).intValue());
        }
        if (request.get("diastolic") != null) {
            record.setDiastolic(((Number) request.get("diastolic")).intValue());
        }
        if (request.get("bloodSugar") != null) {
            record.setBloodSugar(((Number) request.get("bloodSugar")).intValue());
        }
        record.setRecordedAt(LocalDateTime.now());

        VitalRecord saved = vitalRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }

    // 운동 기록 저장
    @PostMapping("/exercise")
    public ResponseEntity<?> saveExerciseRecord(@RequestBody Map<String, Object> request) {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        ExerciseRecord record = new ExerciseRecord();
        record.setUser(userOpt.get());
        record.setExerciseType((String) request.get("exerciseType"));
        record.setDurationMinutes(((Number) request.get("durationMinutes")).intValue());
        record.setRecordedAt(LocalDateTime.now());

        ExerciseRecord saved = exerciseRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }

    // 내 BMI 기록 조회
    @GetMapping("/bmi/my")
    public ResponseEntity<?> getMyBmiRecords() {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        List<BmiRecord> records = bmiRecordRepository.findByUserOrderByRecordedAtDesc(userOpt.get());
        return ResponseEntity.ok(records);
    }

    // 내 건강수치 기록 조회
    @GetMapping("/vital/my")
    public ResponseEntity<?> getMyVitalRecords() {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        List<VitalRecord> records = vitalRecordRepository.findByUserOrderByRecordedAtDesc(userOpt.get());
        return ResponseEntity.ok(records);
    }

    // 내 운동 기록 조회
    @GetMapping("/exercise/my")
    public ResponseEntity<?> getMyExerciseRecords() {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        List<ExerciseRecord> records = exerciseRecordRepository.findByUserOrderByRecordedAtDesc(userOpt.get());
        return ResponseEntity.ok(records);
    }
}
