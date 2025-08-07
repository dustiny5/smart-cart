package com.smartcart.api.model.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.smartcart.api.model.dto.OrderDTO;
import com.smartcart.api.model.entity.Order;

@Mapper(componentModel = "spring", uses = {ProductMapper.class, OrderProductMapper.class})
public interface OrderMapper {

    @Mapping(target = "products", source = "orderProducts")
    OrderDTO toDTO(Order order);

    List<OrderDTO> toDTOs(List<Order> order);

    default Page<OrderDTO> toDTOPage(Page<Order> orderPage) {
        List<OrderDTO> dtos = toDTOs(orderPage.getContent());
        return new PageImpl<>(dtos, orderPage.getPageable(), orderPage.getTotalElements());
    }
}
