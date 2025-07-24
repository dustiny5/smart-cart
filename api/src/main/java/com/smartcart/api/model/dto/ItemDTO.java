package com.smartcart.api.model.dto;

import lombok.Data;

@Data
public class ItemDTO {
    private String name;
    private Long price;
    private Integer quantity;
}
