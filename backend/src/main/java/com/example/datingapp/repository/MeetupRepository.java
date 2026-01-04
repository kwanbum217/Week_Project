package com.example.datingapp.repository;

import com.example.datingapp.model.Meetup;
import com.example.datingapp.model.MeetupCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 모임 리포지토리
 */
@Repository
public interface MeetupRepository extends JpaRepository<Meetup, Long> {

  List<Meetup> findByCategory(MeetupCategory category);

  List<Meetup> findByCategoryOrderByMembersDesc(MeetupCategory category);

  List<Meetup> findAllByOrderByMembersDesc();
}
