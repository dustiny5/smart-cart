package com.smartcart.api.model.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ProductDTO {

    @Schema(description = "The products's id.")
    private Long id;
    @Schema(description = "The products's name.")
    private String name;
    @Schema(description = "The products's description.")
    private String description;
    @Schema(description = "The products's price.")
    private Float price;
    @Schema(description = "The products's list of tags. This also describes the product grouping by genre.")
    private List<String> tags;
    @Schema(description = "The products's image url link.")
    private String imageUrl;
    @Schema(description = "When the user has an order this will contain an number.")
    private Integer quantity;
}
