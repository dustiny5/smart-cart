package com.smartcart.api.model.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class OrderProductId implements Serializable {

    private Long orderId;
    private Long productId;
}
