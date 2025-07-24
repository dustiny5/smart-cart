package com.smartcart.api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.smartcart.api.model.dto.ItemDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

// https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=stripe-hosted
// https://www.baeldung.com/spark-framework-rest-api
@Service
public class StripeServiceImpl implements StripeService {
    
    @Value("${stripe.api-key}")
    private String STRIPE_API_KEY;


    @Override
    public Map<String, String> createCheckoutSession(List<ItemDTO> items) {

        Stripe.apiKey = STRIPE_API_KEY;

        List<SessionCreateParams.LineItem> lineItems = items.stream().map(item -> 
            SessionCreateParams.LineItem.builder()
                .setPriceData(
                    SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("usd")
                        .setUnitAmount(item.getPrice()) // in cents
                        .setProductData(
                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName(item.getName())
                                .build()
                        )
                        .build()
                )
                .setQuantity((long) item.getQuantity())
                .build()
        ).toList();


            SessionCreateParams params = SessionCreateParams.builder()
                .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("https://yourdomain.com/success")
                .setCancelUrl("https://yourdomain.com/cancel")
                .addAllLineItem(lineItems)
                .build();

        try {
            Session session = Session.create(params);
            Map<String, String> responseData = new HashMap<>();
            responseData.put("id", session.getId());
            return responseData;
        } catch (StripeException e) {
            e.printStackTrace();
            // throw error
            return null;
        }
    }

    @Override
    public void getSesstionStatus() {
        throw new UnsupportedOperationException("Unimplemented method 'getSesstionStatus'");
    }
     
}
