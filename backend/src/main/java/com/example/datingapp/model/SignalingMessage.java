package com.example.datingapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignalingMessage {
  private String type; // "offer", "answer", "candidate", "join", "leave"
  private String sender;
  private String recipient;
  private Object data; // SDP or Candidate
}
