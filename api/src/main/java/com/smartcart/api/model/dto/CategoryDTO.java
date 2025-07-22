package com.smartcart.api.model.dto;

import java.util.Set;

import lombok.Data;

@Data
public class CategoryDTO {
    private Long id;
    private String name;
    private Set<ProductDTO> products;
}
