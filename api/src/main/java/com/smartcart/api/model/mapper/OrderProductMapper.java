package com.smartcart.api.model.mapper;

import java.util.Set;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.smartcart.api.model.dto.ProductDTO;
import com.smartcart.api.model.entity.OrderProduct;
import com.smartcart.api.model.entity.Product;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface OrderProductMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "order", ignore = true)
    @Mapping(target = "quantity", ignore = true)
    OrderProduct toEntity(Product product);

    Set<OrderProduct> toEntities(Set<Product> products);

    @Mapping(target = "id", source = "product.id")
    @Mapping(target = "name", source = "product.name")
    @Mapping(target = "description", source = "product.description")
    @Mapping(target = "price", source = "product.price")
    @Mapping(target = "tags", source = "product.tags")
    @Mapping(target = "imageUrl", source = "product.imageUrl")
    ProductDTO toDTO(OrderProduct orderProduct);

    Set<ProductDTO> toDTOs(Set<OrderProduct> orderProducts);

}
