package com.smartcart.api.model.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.smartcart.api.model.dto.ProductDTO;
import com.smartcart.api.model.entity.Product;

@Mapper(componentModel = "spring", uses = CategoryMapper.class)
public interface ProductMapper {
    ProductDTO toDTO(Product product);
    Product toEntity(ProductDTO productDTO);

    default Page<ProductDTO> toDTOPage(Page<Product> productPage) {
        List<ProductDTO> dtos = toDTOs(productPage.getContent());
        return new PageImpl<>(dtos, productPage.getPageable(), productPage.getTotalElements());
    }

    List<ProductDTO> toDTOs(List<Product> products);
    List<Product> toEntities(List<ProductDTO> productDTOs);
}
