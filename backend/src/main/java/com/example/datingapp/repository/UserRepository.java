package com.example.datingapp.repository;

import com.example.datingapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);

  @Query(value = "SELECT * FROM users u WHERE (6371 * acos(cos(radians(:lat)) * cos(radians(u.latitude)) * cos(radians(u.longitude) - radians(:lon)) + sin(radians(:lat)) * sin(radians(u.latitude)))) < :distance", nativeQuery = true)
  List<User> findUsersNearby(@Param("lat") double lat, @Param("lon") double lon, @Param("distance") double distance);
}
