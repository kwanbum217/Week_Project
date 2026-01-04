package com.example.datingapp.controller;

import com.example.datingapp.service.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/nearby")
    public ResponseEntity<?> getNearbyUsers(@AuthenticationPrincipal UserDetails userDetails,
            @RequestParam double lat,
            @RequestParam double lon) {
        // 로그인 사용자 정보 확인
        String username = userDetails.getUsername();
        return ResponseEntity.ok(locationService.findNearbyUsers(username, lat, lon));
    }
}
