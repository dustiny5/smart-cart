package com.smartcart.api.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CheckoutItem {
    @NotBlank
    @Schema(example="Item Name")
    private String name;

    @Min(value = 1, message="Minimum of 100 which equals to 1 usd")
    @Schema(example="100")
    private Long price;

    @Min(value = 1, message = "Minmum of 1 unit")
    @Schema(example="1")
    private Long quantity;
}
