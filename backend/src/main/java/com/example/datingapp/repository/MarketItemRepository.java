package com.example.datingapp.repository;

import com.example.datingapp.model.MarketItem;
import com.example.datingapp.model.MarketCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 마켓 상품 리포지토리
 */
@Repository
public interface MarketItemRepository extends JpaRepository<MarketItem, Long> {

  List<MarketItem> findByCategory(MarketCategory category);

  List<MarketItem> findByCategoryOrderByLikesDesc(MarketCategory category);

  List<MarketItem> findAllByOrderByLikesDesc();

  List<MarketItem> findByLikesGreaterThanEqualOrderByLikesDesc(int likes);

  List<MarketItem> findByLocationContaining(String location);
}
