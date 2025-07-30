package com.smartcart.api.model.mapper;

import org.mapstruct.Mapper;

import com.smartcart.api.model.dto.CheckoutSessionResponse;
import com.stripe.model.checkout.Session;

@Mapper(componentModel = "spring")
public interface StripeMapper {

    CheckoutSessionResponse toResponse(Session session);
}
