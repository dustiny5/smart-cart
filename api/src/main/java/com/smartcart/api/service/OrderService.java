package com.smartcart.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.smartcart.api.model.dto.OrderDTO;
import com.smartcart.api.model.dto.OrderRequest;

public interface OrderService {

    OrderDTO createOrder(OrderRequest orderProductRequest);

    OrderDTO updateOrder(OrderRequest orderProductRequest);

    Page<OrderDTO> getOrderById(Pageable pageable, Long orderId);

    Boolean deleteOrder(Long orderId);
}
