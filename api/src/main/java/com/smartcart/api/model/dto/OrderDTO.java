package com.smartcart.api.model.dto;

import java.util.Set;

import lombok.Data;

@Data
public class OrderDTO {

    private Long id;
    private String email;
    private Float totalAmount;
    private String status;
    private Set<ProductDTO> products;
}
