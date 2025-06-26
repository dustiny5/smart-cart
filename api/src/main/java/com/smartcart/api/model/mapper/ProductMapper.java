package com.smartcart.api.model.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.smartcart.api.model.dto.ProductDTO;
import com.smartcart.api.model.entity.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toDTO(Product product);
    Product toEntity(ProductDTO productDTO);

    List<ProductDTO> toDTOs(List<Product> products);
    List<Product> toEntities(List<ProductDTO> productDTOs);
}
