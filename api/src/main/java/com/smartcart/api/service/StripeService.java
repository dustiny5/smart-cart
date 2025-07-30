package com.smartcart.api.service;

import com.smartcart.api.model.dto.CheckoutRequest;
import com.smartcart.api.model.dto.CheckoutResponse;
import com.smartcart.api.model.dto.CheckoutSessionResponse;

public interface StripeService {

    CheckoutResponse createCheckoutSession(CheckoutRequest checkoutRequest);

    CheckoutSessionResponse retrieveSession(String sessionId);
}
