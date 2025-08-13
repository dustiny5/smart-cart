package com.smartcart.api.model.dto;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderRequest {

    @NotNull
    @Schema(description = "Id of the customer's order", example = "1")
    private Long orderId;

    @Email(regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$", message = "Invalid email format")
    @Schema(description = "Email of the customer placing the order", example = "user@example.com")
    private String email;

    @Min(value = 1, message = "Total amount must be greate than or equal to 1")
    @Schema(description = "Total cost of the order", example = "1.00")
    private Float totalAmount;

    @NotEmpty
    @Schema(description = "Ids and quantities of the products", example = "[{\"productId\": 1, \"quantity\": 2}, {\"productId\": 2, \"quantity\": 3}]")
    private Set<ProductIdQuantity> productIdQuantity;

}
