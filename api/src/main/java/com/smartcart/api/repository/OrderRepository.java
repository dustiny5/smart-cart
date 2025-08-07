package com.smartcart.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.smartcart.api.model.entity.Order;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<Order, Long> {

    Optional<Order> findById(Long orderId);

    Order save(Order order);

    void deleteById(Long orderId);

    Page<Order> findById(Long orderId, Pageable pageable);
}
