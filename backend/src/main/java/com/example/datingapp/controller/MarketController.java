package com.example.datingapp.controller;

import com.example.datingapp.model.MarketItem;
import com.example.datingapp.service.MarketItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 마켓 상품 REST 컨트롤러
 */
@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "*")
public class MarketController {

  private final MarketItemService marketItemService;

  public MarketController(MarketItemService marketItemService) {
    this.marketItemService = marketItemService;
  }

  /**
   * 상품 목록 조회
   * 
   * @param category 카테고리 (선택)
   * @param location 지역 검색어 (선택)
   */
  @GetMapping
  public ResponseEntity<List<MarketItem>> getItems(
      @RequestParam(required = false) String category,
      @RequestParam(required = false) String location) {

    List<MarketItem> items;

    if (location != null && !location.isEmpty()) {
      items = marketItemService.searchByLocation(location);
    } else {
      items = marketItemService.getItemsByCategory(category);
    }

    return ResponseEntity.ok(items);
  }
}
