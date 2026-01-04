package com.example.datingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 마켓 상품 엔티티
 */
@Entity
@Table(name = "market_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketItem {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "market_seq")
  @SequenceGenerator(name = "market_seq", sequenceName = "market_seq", allocationSize = 1)
  private Long id;

  @Column(nullable = false)
  private String title;

  private String price;

  private String location;

  private String image;

  private int likes;

  private int chats;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private MarketCategory category;

  @Column(length = 500)
  private String description;

  @Column(name = "usage_years")
  private String usageYears;
}
