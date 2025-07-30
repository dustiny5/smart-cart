package com.smartcart.api.model.dto;

import lombok.Data;

@Data
public class CheckoutSessionResponse {
    private String id;
    private String customerEmail;
    private Long created;
    private Long expiresAt;
    private String mode;
    private String status;
    private String paymentStatus;
    private Long amountSubtotal;
    private Long amountTotal;
    private String url;
    private String cancelUrl;
    private String successUrl;
    private String currency;
}
