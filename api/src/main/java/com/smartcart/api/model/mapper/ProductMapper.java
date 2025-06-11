package com.smartcart.api.model.mapper;

import java.util.Set;

import org.mapstruct.Mapper;

import com.smartcart.api.model.dto.ProductDTO;
import com.smartcart.api.model.entity.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toDTO(Product product);
    Product toEntity(ProductDTO productDTO);

    Set<ProductDTO> toDTOs(Set<Product> products);
    Set<Product> toEntities(Set<ProductDTO> productDTOs);
}
