package com.smartcart.api.model.mapper;

import java.util.List;
import java.util.Set;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.smartcart.api.model.dto.ProductDTO;
import com.smartcart.api.model.entity.Product;

@Mapper(componentModel = "spring", uses = CategoryMapper.class)
public interface ProductMapper {

    @Mapping(target = "quantity", ignore = true)
    ProductDTO toDTO(Product product);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "isBestSeller", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "orderProducts", ignore = true)
    Product toEntity(ProductDTO productDTO);

    Set<ProductDTO> toDTOs(Set<Product> products);

    List<ProductDTO> toDTOs(List<Product> products);

    List<Product> toEntities(List<ProductDTO> productDTOs);
}
