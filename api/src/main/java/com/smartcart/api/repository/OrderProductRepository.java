package com.smartcart.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartcart.api.model.entity.OrderProduct;
import com.smartcart.api.model.entity.OrderProductId;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, OrderProductId> {

    // Finds order.id NOT orderId
    List<OrderProduct> findByOrder_Id(Long orderId);
}
