package com.smartcart.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.smartcart.api.exception.InternalServerException;
import com.smartcart.api.model.dto.CheckoutRequest;
import com.smartcart.api.model.dto.CheckoutResponse;
import com.smartcart.api.model.dto.CheckoutSessionResponse;
import com.smartcart.api.model.mapper.StripeMapper;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

// https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=stripe-hosted
// https://www.baeldung.com/spark-framework-rest-api
@Service
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.success-url}")
    private String successUrl;
    @Value("${stripe.cancel-url}")
    private String cancelUrl;

    @Autowired
    private StripeMapper stripeMapper;

    @Override
    public CheckoutResponse createCheckoutSession(CheckoutRequest checkoutRequest) {

        try {
            List<SessionCreateParams.LineItem> lineItems = checkoutRequest.getItems().stream().map(item
                    -> SessionCreateParams.LineItem.builder()
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("usd")
                                            .setUnitAmount(item.getPrice())
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(item.getName())
                                                            .build()
                                            )
                                            .build()
                            )
                            .setQuantity(item.getQuantity())
                            .build()
            ).toList();

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setShippingAddressCollection(
                            SessionCreateParams.ShippingAddressCollection.builder()
                                    .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.CA)
                                    .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.US)
                                    .build())
                    .setSuccessUrl(successUrl + "?success=true")
                    .setCancelUrl(cancelUrl + "?canceled=true")
                    .addAllLineItem(lineItems)
                    .build();

            Session session = Session.create(params);
            return new CheckoutResponse(session.getId(), session.getUrl(), "Checkout session created.");

        } catch (StripeException e) {
            throw new InternalServerException("Failed to create checkout session: " + e.getMessage());
        }
    }

    @Override
    public CheckoutSessionResponse retrieveSession(String sessionId) {
        try {
            return stripeMapper.toResponse(Session.retrieve(sessionId));

        } catch (StripeException e) {
            throw new InternalServerException("Failed to retrieve sessionId: " + e.getMessage());
        }
    }

}
