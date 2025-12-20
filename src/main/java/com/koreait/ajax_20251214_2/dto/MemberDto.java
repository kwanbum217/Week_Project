package com.koreait.ajax_20251214_2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data // getter, setter, toString()
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자

public class MemberDto {
  private String name;
  private String email;
}
