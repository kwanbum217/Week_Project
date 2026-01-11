package com.example.datingapp.repository;

import com.example.datingapp.model.MeetupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetupMemberRepository extends JpaRepository<MeetupMember, Long> {
    List<MeetupMember> findByMeetupId(Long meetupId);

    @Query("SELECT mm FROM MeetupMember mm JOIN FETCH mm.user WHERE mm.meetup.id = :meetupId")
    List<MeetupMember> findByMeetupIdWithUser(@Param("meetupId") Long meetupId);

    boolean existsByMeetupIdAndUserId(Long meetupId, Long userId);

    void deleteByMeetupId(Long meetupId);
}
