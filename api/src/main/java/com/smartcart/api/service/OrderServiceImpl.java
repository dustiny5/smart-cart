package com.smartcart.api.service;

import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.smartcart.api.constant.StatusEnum;
import com.smartcart.api.exception.NotFoundException;
import com.smartcart.api.model.dto.OrderDTO;
import com.smartcart.api.model.dto.OrderRequest;
import com.smartcart.api.model.dto.ProductIdQuantity;
import com.smartcart.api.model.entity.Order;
import com.smartcart.api.model.entity.OrderProduct;
import com.smartcart.api.model.entity.Product;
import com.smartcart.api.model.mapper.OrderMapper;
import com.smartcart.api.repository.OrderRepository;
import com.smartcart.api.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Transactional
    @Override
    public OrderDTO createOrder(OrderRequest orderRequest) {
        Long orderId = orderRequest.getOrderId();
        Map<Long, Integer> productIdQuantitys = orderRequest.getProductIdQuantity()
                .stream().collect(Collectors.toMap(
                        ProductIdQuantity::getProductId,
                        ProductIdQuantity::getQuantity));
        Optional<Order> existingOrder = orderRepository.findById(orderId);
        Set<Product> products = productRepository.findByIdIn(productIdQuantitys.keySet());

        if (productIdQuantitys.size() != products.size()) {
            throw new NotFoundException("Some product IDs do not exist.");
        }

        Order order;

        if (existingOrder.isPresent()) {
            order = existingOrder.get();
        } else {
            order = new Order();
            order.setStatus(StatusEnum.OPEN);
            order.setEmail(orderRequest.getEmail());
            order.setTotalAmount(orderRequest.getTotalAmount());
            order = orderRepository.save(order);
        }

        Set<OrderProduct> orderProducts = new HashSet<>();

        for (Product product : products) {
            OrderProduct orderProduct = new OrderProduct();

            Integer quantity = productIdQuantitys.get(product.getId());
            orderProduct.setOrder(order);
            orderProduct.setProduct(product);
            orderProduct.setQuantity(quantity);
            orderProducts.add(orderProduct);
        }
        order.setOrderProducts(orderProducts);
        return orderMapper.toDTO(orderRepository.save(order));
    }

    @Override
    public OrderDTO updateOrder(OrderRequest orderRequest) {
        Long orderId = orderRequest.getOrderId();
        Map<Long, Integer> productIdQuantitys = orderRequest.getProductIdQuantity()
                .stream().collect(Collectors.toMap(
                        ProductIdQuantity::getProductId,
                        ProductIdQuantity::getQuantity));
        Optional<Order> existingOrder = orderRepository.findById(orderId);
        Set<Product> products = productRepository.findByIdIn(productIdQuantitys.keySet());

        if (productIdQuantitys.size() != products.size()) {
            throw new NotFoundException("Some product IDs do not exist.");
        }

        Order updateOrder;

        // Update the existing order's products if it exists
        if (existingOrder.isPresent()) {
            updateOrder = existingOrder.get();
            updateOrder.setTotalAmount(orderRequest.getTotalAmount());
            updateOrder.getOrderProducts().removeIf(op -> !productIdQuantitys.containsKey(op.getProduct().getId()));

            for (Product product : products) {
                Optional<OrderProduct> updateOrderProduct = updateOrder.getOrderProducts().stream()
                        .filter(op -> product.getId().equals(op.getProduct().getId()))
                        .findFirst();

                Integer updateQuantity = productIdQuantitys.get(product.getId());
                OrderProduct orderProduct;

                // If the product already exists in the order, update its quantity
                if (updateOrderProduct.isPresent()) {
                    orderProduct = updateOrderProduct.get();
                    orderProduct.setQuantity(updateQuantity);
                } else {
                    orderProduct = new OrderProduct();
                    orderProduct.setOrder(updateOrder);
                    orderProduct.setProduct(product);
                    orderProduct.setQuantity(updateQuantity);
                    updateOrder.getOrderProducts().add(orderProduct);
                }
            }

            return orderMapper.toDTO(orderRepository.save(updateOrder));
        }
        throw new NotFoundException("Order with ID " + orderId + " does not exist.");
    }

    @Override
    public Page<OrderDTO> getOrderById(Pageable pageable, Long orderId) {
        Page<Order> orderPage = orderRepository.findById(orderId, pageable);
        if (orderPage.getContent().isEmpty()) {
            throw new NotFoundException("No order found");
        }
        return orderPage.map(orderMapper::toDTO);
    }

    @Override
    public Boolean deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
        return true;
    }

}
