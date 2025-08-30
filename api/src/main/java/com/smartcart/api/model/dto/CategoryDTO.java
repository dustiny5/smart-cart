package com.smartcart.api.model.dto;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CategoryDTO {
    @Schema(description = "The category's id.")
    private Long id;
    @Schema(description = "The category's name.")
    private String name;
    @Schema(description = "The category's list of products.")
    private Set<ProductDTO> products;
}
