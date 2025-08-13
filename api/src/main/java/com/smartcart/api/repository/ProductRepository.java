package com.smartcart.api.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.smartcart.api.model.entity.Product;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    Page<Product> findByIsBestSellerTrue(Pageable pageable);

    @Query(value = "SELECT * FROM smart_cart.product WHERE name % ?1", nativeQuery = true)
    List<Product> findBySimilarName(String name);

    Set<Product> findByIdIn(Set<Long> productIds);
}
