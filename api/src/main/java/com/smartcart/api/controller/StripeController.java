package com.smartcart.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcart.api.model.dto.CheckoutRequest;
import com.smartcart.api.model.dto.CheckoutResponse;
import com.smartcart.api.model.dto.CheckoutSessionResponse;
import com.smartcart.api.service.StripeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @Operation(summary = "Create a stripe checkout session from the items.", 
        description = "Create a stripe checkout session from the items.")
    @ApiResponses(value = { 
    @ApiResponse(responseCode = "200", description = "Stripe Checkout session successfully created.", 
        content = { @Content(mediaType = "application/json") }),
    @ApiResponse(responseCode = "400", description = "Please check your inputs.", 
        content = @Content), 
    @ApiResponse(responseCode = "500", description = "Server error", 
        content = @Content) })
    @PostMapping("/create/checkout-session")
    public CheckoutResponse createCheckoutSession(@RequestBody @Valid CheckoutRequest checkoutRequest) {
        return stripeService.createCheckoutSession(checkoutRequest);
    }

    @Operation(summary = "Retrieve stripe session by id.", 
        description = "Retrieve stripe session by id.")
    @ApiResponses(value = { 
    @ApiResponse(responseCode = "200", description = "Retrieved stripe session", 
        content = { @Content(mediaType = "application/json") }),
    @ApiResponse(responseCode = "404", description = "Session ID not found", 
        content = @Content), 
    @ApiResponse(responseCode = "500", description = "Server error", 
        content = @Content) })
    @GetMapping("/session/{sessionId}")
    public CheckoutSessionResponse retrieveSession(@PathVariable @NotBlank String sessionId) {
        return stripeService.retrieveSession(sessionId);
    }
    
}
