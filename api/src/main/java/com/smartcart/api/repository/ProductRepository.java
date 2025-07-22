package com.smartcart.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.smartcart.api.model.entity.Product;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long>{

    Page<Product> findByIsBestSellerTrue(Pageable pageable);
}
