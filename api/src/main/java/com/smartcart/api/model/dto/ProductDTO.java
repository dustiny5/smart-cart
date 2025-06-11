package com.smartcart.api.model.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Float price;
    private String imageUrl;
}
