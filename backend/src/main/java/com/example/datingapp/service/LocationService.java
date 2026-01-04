package com.example.datingapp.service;

import com.example.datingapp.model.User;
import com.example.datingapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class LocationService {

    private final UserRepository userRepository;

    public LocationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findNearbyUsers(String username, double lat, double lon) {
        // DB에서 사용자 위치 기반 검색 로직 구현 (예: Haversine 공식)
        // Oracle DB에 사용자 위치(lat, lon) 저장 후 쿼리로 근접 사용자 조회
        // 참고: UserRepository에 findUsersNearby 메서드가 필요합니다/
        return userRepository.findUsersNearby(lat, lon, 10.0); // 10km 반경 예시
    }
}
