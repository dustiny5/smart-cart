package com.smartcart.api.service;

import java.util.List;
import java.util.Map;

import com.smartcart.api.model.dto.ItemDTO;

public interface StripeService {
    Map<String, String> createCheckoutSession(List<ItemDTO> items);
    void getSesstionStatus();
}
