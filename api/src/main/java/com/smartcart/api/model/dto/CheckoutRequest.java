package com.smartcart.api.model.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CheckoutRequest {

    @NotEmpty(message = "Please add at least 1 item.")
    private List<CheckoutItem> items;
}
