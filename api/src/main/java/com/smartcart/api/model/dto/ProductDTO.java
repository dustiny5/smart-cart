package com.smartcart.api.model.dto;

import java.util.List;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Float price;
    private List<String> tags;
    private String imageUrl;
}
