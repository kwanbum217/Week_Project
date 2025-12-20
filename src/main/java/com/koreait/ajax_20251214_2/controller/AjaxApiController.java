package com.koreait.ajax_20251214_2.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.koreait.ajax_20251214_2.dto.MemberDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController // RestConroller 선언
@RequestMapping("/api") // 기본주소 설정 => /api로 시작.
public class AjaxApiController {

  // 임시 데이터 저장 장소 => DB 대신에 리스트 사용
  private List<MemberDto> memberList = new ArrayList<>();

  // 생성자를 이용해서 데이터 추가.
  public AjaxApiController() {
    memberList.add(new MemberDto("고길동", "gildong@test.com"));
    memberList.add(new MemberDto("둘리", "dooly@test.com"));

  }

  // 회원 목록 조회.
  @GetMapping("/members")
  public List<MemberDto> getMembers() {
    return memberList; // 리스트를 주면 자동으로 json으로 변환
  }

  // 회원 추가
  @PostMapping("/members")
  public MemberDto addMember(@RequestBody MemberDto member) {
    memberList.add(member);
    return member;
  }
}
