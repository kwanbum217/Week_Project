package com.example.datingapp.service;

import com.example.datingapp.model.MarketItem;
import com.example.datingapp.model.MarketCategory;
import com.example.datingapp.repository.MarketItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 마켓 상품 서비스
 */
@Service
public class MarketItemService {

  private final MarketItemRepository marketItemRepository;

  public MarketItemService(MarketItemRepository marketItemRepository) {
    this.marketItemRepository = marketItemRepository;
  }

  /**
   * 전체 상품 조회 (좋아요 내림차순)
   */
  public List<MarketItem> getAllItems() {
    return marketItemRepository.findAllByOrderByLikesDesc();
  }

  /**
   * 상품 상세 조회
   */
  public MarketItem getItemById(Long id) {
    return marketItemRepository.findById(id).orElse(null);
  }

  /**
   * 카테고리별 상품 조회
   */
  public List<MarketItem> getItemsByCategory(String categoryStr) {
    if (categoryStr == null || categoryStr.isEmpty() || categoryStr.equalsIgnoreCase("ALL")) {
      return getAllItems();
    }

    // 인기매물: 좋아요 20개 이상
    if (categoryStr.equalsIgnoreCase("POPULAR")) {
      return marketItemRepository.findByLikesGreaterThanEqualOrderByLikesDesc(20);
    }

    try {
      MarketCategory category = MarketCategory.valueOf(categoryStr.toUpperCase());
      return marketItemRepository.findByCategoryOrderByLikesDesc(category);
    } catch (IllegalArgumentException e) {
      return getAllItems();
    }
  }

  /**
   * 지역으로 상품 검색
   */
  public List<MarketItem> searchByLocation(String location) {
    if (location == null || location.isEmpty()) {
      return getAllItems();
    }
    return marketItemRepository.findByLocationContaining(location);
  }

  /**
   * 상품 저장
   */
  public MarketItem saveItem(MarketItem item) {
    return marketItemRepository.save(item);
  }
}
